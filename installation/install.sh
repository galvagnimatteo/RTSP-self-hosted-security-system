while getopts m:p:r:f: flag
do
    case "${flag}" in
        m) backendMainPort=${OPTARG};;
        p) backendPythonPort=${OPTARG};;
        r) backendRtspPort=${OPTARG};;
        f) frontendPort=${OPTARG};;
    esac
done

if [ -z "$backendMainPort" ]; then 
    echo "Error: main backend port (-m) is not set."
    exit 1
fi

if [ -z "$backendPythonPort" ]; then 
    echo "Error: Python backend port (-p) is not set."
    exit 1
fi

if [ -z "$backendRtspPort" ]; then 
    echo "Error: RTSPtoWeb backend port (-r) is not set."
    exit 1
fi

if [ -z "$frontendPort" ]; then 
    echo "Error: frontend port (-f) is not set."
    exit 1
fi

sudo apt update

# PORTS SETTINGS

sudo apt install -y jq
echo '{
    "rtsptoweb": '"$backendRtspPort"',
    "backendMain": '"$backendMainPort"',
    "backendPython": '"$backendPythonPort"',
    "frontend": '"$frontendPort"'
}' > backend-python/ports.json

ports=$(echo '{"rtsptoweb": '"$backendRtspPort"',"backendMain": '"$backendMainPort"',"backendPython": '"$backendPythonPort"',"frontend": '"$frontendPort"'}')

ports="'$ports'"

# BACKEND PYTHON

sudo apt-get install python3
sudo apt install python3-pip
sudo pip3 install uvicorn==0.18.3
sudo pip3 install fastapi==0.85.2
sudo apt install python3-opencv -y
sudo apt-get install libcblas-dev -y
sudo apt-get install libhdf5-dev -y
sudo apt-get install libhdf5-serial-dev -y
sudo apt-get install libatlas-base-dev -y
sudo apt-get install libjasper-dev -y
sudo apt-get install libqtgui4 -y
sudo apt-get install libqt4-test -y
sudo apt-get install libatlas3 -y
sudo python3 -m pip install numpy -I
sudo apt-get install ffmpeg libsm6 libxext6  -y
sudo pip3 install requests
sudo pip3 install mailjet-rest
sudo pip3 install python-multipart

# BACKEND MAIN

sudo apt install openjdk-17-jdk

# BACKEND RTSP
wget https://go.dev/dl/go1.19.3.linux-armv6l.tar.gz
sudo tar -C /usr/local -xzf go1.19.3.linux-armv6l.tar.gz
rm go1.19.3.linux-armv6l.tar.gz
echo PATH=$PATH:/usr/local/go/bin GOPATH=$HOME/golang > ~/.profile
source ~/.profile
sed -i 's/8083/'$backendRtspPort'/' ./RTSPtoWeb/config.json

# FRONTEND

curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
sudo apt install nodejs
sudo npm install --global http-server
find ./frontend -type f -not -path '*/\.*' -exec sed -i 's/localhost/'$(ip -o route get to 8.8.8.8 | sed -n 's/.*src \([0-9.]\+\).*/\1/p')'/g' {} +
find ./frontend -type f -not -path '*/\.*' -exec sed -i 's/127.0.0.1/'$(ip -o route get to 8.8.8.8 | sed -n 's/.*src \([0-9.]\+\).*/\1/p')'/g' {} +

wd=$(pwd)
user=$(whoami)
cd /

sudo systemctl stop shss-frontend.service
sudo rm /etc/systemd/system/shss-frontend.service

echo '[Unit]
Description=Self hosted security system frontend
After=network.target
StartLimitIntervalSec=0
[Service]
Type=simple
Restart=always
RestartSec=1
WorkingDirectory='"$wd"'/frontend/
User='"$user"'
ExecStart=http-server -p '"$frontendPort"'

[Install]
WantedBy=multi-user.target' | sudo tee /etc/systemd/system/shss-frontend.service

sudo systemctl enable shss-frontend.service
sudo systemctl start shss-frontend.service

sudo systemctl stop shss-backend-main.service
sudo rm /etc/systemd/system/shss-backend-main.service

echo '[Unit]
Description=Self hosted security system backend main
After=network.target
StartLimitIntervalSec=0
[Service]
Type=simple
Restart=always
RestartSec=1
WorkingDirectory='"$wd"'/backend-main/
User='"$user"'
ExecStart=/usr/lib/jvm/java-17-openjdk-armhf/bin/java -Dserver.port='"$backendMainPort"' -Dspring.application.json='"$ports"' -jar ./backend-main-0.0.1-SNAPSHOT.jar

[Install]
WantedBy=multi-user.target' | sudo tee /etc/systemd/system/shss-backend-main.service

sudo systemctl enable shss-backend-main.service
sudo systemctl start shss-backend-main.service

sudo systemctl stop shss-backend-python.service
sudo rm /etc/systemd/system/shss-backend-python.service

echo '[Unit]
Description=Self hosted security system backend python
After=network.target
StartLimitIntervalSec=0
[Service]
Type=simple
Restart=always
RestartSec=1
WorkingDirectory='"$wd"'/backend-python/
User='"$user"'
ExecStart=uvicorn main:app --port '"$backendPythonPort"' --host 0.0.0.0 --reload

[Install]
WantedBy=multi-user.target' | sudo tee /etc/systemd/system/shss-backend-python.service

sudo systemctl enable shss-backend-python.service
sudo systemctl start shss-backend-python.service

sudo systemctl stop shss-backend-rtsp.service
sudo rm /etc/systemd/system/shss-backend-rtsp.service

echo '[Unit]
Description=Self hosted security system backend rtsptoweb
After=network.target
StartLimitIntervalSec=0
[Service]
Type=simple
Restart=always
RestartSec=1
WorkingDirectory='"$wd"'/RTSPtoWeb/
User='"$user"'
ExecStart='"$wd"'/RTSPtoWeb/RTSPtoWeb

[Install]
WantedBy=multi-user.target' | sudo tee /etc/systemd/system/shss-backend-rtsp.service

sudo systemctl enable shss-backend-rtsp.service
sudo systemctl start shss-backend-rtsp.service

sudo systemctl daemon-reload

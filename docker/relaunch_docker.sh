sudo docker build -t docker-backend-python -f docker-backend-python/Dockerfile .
sudo docker run -td -p 8000:8000 --name docker-backend-python docker-backend-python

sudo docker build -t docker-backend-main -f docker-backend-main/Dockerfile .
sudo docker run -td -p 8080:8080 --name docker-backend-main docker-backend-main

sudo docker buildx build -t docker-backend-rtsp -f docker-RTSPtoWeb/Dockerfile .
sudo docker run -td -p 8083:8083 --name docker-backend-rtsp docker-backend-rtsp

sudo docker build -t docker-frontend -f docker-frontend/Dockerfile .
sudo docker run -td -p 80:80 --name docker-frontend docker-frontend


#add -td to run on background

#sudo docker buildx build -t docker-rtsp -f Dockerfile .       for rtsp


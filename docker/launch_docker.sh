frontend_port=$(jq .frontend ./assets/ports.json)
backend_main=$(jq .backendMain ./assets/ports.json)
backend_python=$(jq .backendPython ./assets/ports.json)
backend_rtsp=$(jq .rtsptoweb ./assets/ports.json)

sudo docker build -t docker-backend-python --build-arg port=$backend_python -f docker-backend-python/Dockerfile .
sudo docker run --device /dev/snd:/dev/snd --net=host -td --name docker-backend-python docker-backend-python

sudo docker build -t docker-backend-main --build-arg port=$backend_main -f docker-backend-main/Dockerfile .
sudo docker run --net=host -td --name docker-backend-main docker-backend-main

sudo docker buildx build -t docker-backend-rtsp --build-arg port=$backend_rtsp -f docker-RTSPtoWeb/Dockerfile .
sudo docker run --net=host -td --name docker-backend-rtsp docker-backend-rtsp

sudo docker build -t docker-frontend --build-arg port=$frontend_port -f docker-frontend/Dockerfile .
sudo docker run --net=host -td --name docker-frontend docker-frontend


sudo docker build -t docker-test -f docker-frontend/Dockerfile .
sudo docker run -td --name docker-test -p 6969:80 docker-test
#add -td to run on background


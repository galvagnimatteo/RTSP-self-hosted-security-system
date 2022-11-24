sudo docker build -t docker-test -f docker-backend-main/Dockerfile .
sudo docker run -p 8080:8080 --name docker-test docker-test
#add -td to run on background


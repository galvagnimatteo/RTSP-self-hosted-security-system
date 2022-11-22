sudo docker build -t docker-test .
sudo docker run --name docker-test -p 6969:80 docker-test
sudo docker rm docker-test

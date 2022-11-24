FROM openjdk:17
COPY ./docker-backend-main/target/ /tmp
COPY ./assets/ /tmp
WORKDIR /tmp
RUN chmod +x ./start.sh
EXPOSE 8080
ENTRYPOINT ./start.sh


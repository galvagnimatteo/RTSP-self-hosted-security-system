FROM openjdk:17
ARG port
ENV port=${port}
COPY ./docker-backend-main/target/ /tmp
COPY ./assets/ /tmp
WORKDIR /tmp
RUN chmod +x ./start.sh
ENTRYPOINT ./start.sh $port


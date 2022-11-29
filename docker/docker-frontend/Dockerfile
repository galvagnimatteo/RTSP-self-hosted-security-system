FROM httpd:2.4
ARG port
ENV port=${port}
COPY ./docker-frontend/dist/ /usr/local/apache2/htdocs/
COPY ./assets/ /usr/local/apache2/htdocs/assets/
RUN echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf

RUN echo sed -i 's/80/'$port'/' /usr/local/apache2/conf/httpd.conf >> start.sh
RUN chmod +x start.sh
RUN ./start.sh

FROM httpd:2.4
COPY ./docker-frontend/dist/ /usr/local/apache2/htdocs/
COPY ./assets/ /usr/local/apache2/htdocs/assets/
RUN echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf
EXPOSE 80

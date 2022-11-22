FROM httpd:2.4
COPY ./compiled_frontend/ /usr/local/apache2/htdocs/
EXPOSE 80
RUN echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf

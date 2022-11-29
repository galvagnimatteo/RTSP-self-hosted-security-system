FROM python:3.8.10
ARG port
ENV port=${port}
WORKDIR /app
COPY ./docker-backend-python/requirements.txt /requirements.txt
COPY ./assets/ ./
RUN pip install --no-cache-dir --upgrade -r /requirements.txt
COPY ./docker-backend-python/app /app
RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y
RUN pip3 install requests
RUN pip3 install mailjet-rest
RUN pip3 install python-multipart
ENTRYPOINT uvicorn main:app --port $port --host 0.0.0.0 --reload


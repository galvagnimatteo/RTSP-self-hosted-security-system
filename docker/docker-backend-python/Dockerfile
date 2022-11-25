FROM python:3.8.10
WORKDIR /app
COPY ./docker-backend-python/requirements.txt /requirements.txt
RUN pip install --no-cache-dir --upgrade -r /requirements.txt
COPY ./docker-backend-python/app /app
RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y
RUN pip3 install requests
RUN pip3 install mailjet-rest
EXPOSE 8000
#ENTRYPOINT uvicorn main:app --port 8000 --host 0.0.0.0
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

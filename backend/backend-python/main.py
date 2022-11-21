from fastapi import FastAPI
from multiprocessing import Process
from motion_detector import *
from pydantic import BaseModel
from send_mail import *
from record_stream import *
from typing import Union

class Camera(BaseModel):
    id: int
    name: str
    zone: Union[str, None]
    rtspUrl: str
    alarmStatus: str

class EmailData(BaseModel):
    mailFrom: str
    mailTo: list = []
    apiKey: str
    apiSecret: str

app = FastAPI()

motion_detection_cameras = dict() #camera.id - motion detection process
recording_cameras = dict()

@app.post("/startMotionDetection", status_code=200)
async def start_motion_detection(camera: Camera):

    print("Starting motion detection")

    process = Process(target=motion_detection,args=(camera,))
    process.start()

    motion_detection_cameras[camera.id] = process


@app.post("/stopMotionDetection", status_code=200)
async def stop_motion_detection(camera: Camera):

    print("Stopping motion detection")

    motion_detection_cameras.get(camera.id).terminate()


@app.post("/sendMail", status_code=200)
async def stop_motion_detection(email_data: EmailData):

    print("Sending mail")

    for mail_to in email_data.mailTo:

        send_mail(email_data.mailFrom, mail_to, email_data.apiKey, email_data.apiSecret)


@app.post("/startRecording", status_code=200)
async def start_recording(camera: Camera):

    print("Starting recording")

    process = Process(target=record,args=(camera,))
    process.start()

    recording_cameras[camera.id] = process


@app.post("/stopRecording", status_code=200)
async def stop_recording(camera: Camera):

    print("Stopping recording")

    recording_cameras.get(camera.id).terminate()

     
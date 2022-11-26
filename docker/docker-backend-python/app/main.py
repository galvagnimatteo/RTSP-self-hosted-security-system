from fastapi import FastAPI
from multiprocessing import Process
from motion_detector import *
from pydantic import BaseModel
from send_mail import *
from record_stream import *
from typing import Union
from fastapi.middleware.cors import CORSMiddleware
import os
from pydantic import BaseModel
from pathlib import Path
from fastapi.responses import StreamingResponse
import json
import subprocess
from fastapi import UploadFile


alarmPlayerProcess = None

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

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

ports_json = open('ports.json')
ports = json.load(ports_json)

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


@app.get("/getRecordingsNumber", status_code=200)
async def get_recordings_number():

    dir_path = './recordings'
    count = 0
    for path in os.listdir(dir_path):
        if os.path.isfile(os.path.join(dir_path, path)):
            count += 1

    return count


@app.get("/getAllRecordings", status_code=200)
async def get_all_recordings():

    dir_path = './recordings'
    paths = sorted(Path(dir_path).iterdir(), key=os.path.getmtime)
    names = {str(x).replace('recordings/', '') for x in paths}

    return names


@app.delete("/deleteRecording", status_code=200)
async def delete_recording(name: str):
    os.remove("./recordings/" + name)
    requests.get(url = "http://localhost:" + str(ports['backendMain']) + "/updateFrontend")


@app.get("/getRecording", status_code=200)
async def get_recording(name: str):

    def iterfile():
        with open("./recordings/" + name, mode="rb") as file_like:
            yield from file_like

    return StreamingResponse(iterfile())


@app.post("/startAlarm", status_code=200) #starts alarm if not already started
async def start_alarm():

    bashCommand = "ffplay -nodisp -autoexit -loop 9999 alarmSound.mp3"
    global alarmPlayerProcess
    if alarmPlayerProcess is not None:
        poll = alarmPlayerProcess.poll()
        if poll is not None:
            # p.subprocess is deaad
            alarmPlayerProcess = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    else:
        alarmPlayerProcess = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)


@app.post("/stopAlarm", status_code=200) #stops alarm if not already stopped
async def start_alarm():
    global alarmPlayerProcess

    if alarmPlayerProcess is not None:
        poll = alarmPlayerProcess.poll()
        if poll is None:
            alarmPlayerProcess.kill()


@app.post("/uploadAlarmFile", status_code=200)
async def upload_alarm_file(file: UploadFile):
    file_location = "./alarmSound.mp3"
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())
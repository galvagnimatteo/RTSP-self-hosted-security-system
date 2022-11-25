import cv2
from threading import *
from datetime import datetime
import sys

def record(camera):

    now = datetime.now()
    dt_string = now.strftime("%Y_%m_%d-%H:%M:%S")

    cap = cv2.VideoCapture(camera.rtspUrl)

    if not cap.isOpened():
        print('Cannot open RTSP stream')
        exit(-1)

    
    # Default resolutions of the frame are obtained (system dependent)
    frame_width = int(cap.get(3))
    frame_height = int(cap.get(4))

    resized_width = int(frame_width/2)
    resided_height = int(frame_height/2)
    
    # Set up codec and output video settings
    codec = cv2.VideoWriter_fourcc(*'vp80')
    writer = cv2.VideoWriter("../recordings/" + str(camera.name) + "-" + str(dt_string) + ".webm", codec, 30, (resized_width, resided_height))

    while True:

        _, frame = cap.read()
        frame = cv2.resize(frame, (resized_width, resided_height))

        try:

            writer.write(frame)

        except Exception:

            sys.exit(0) #out of memory
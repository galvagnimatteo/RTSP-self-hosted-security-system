import os
import cv2
import numpy as np
import requests
import calendar
import time
import json

#god forgive me for what I am about to code

def motion_detection(camera):

    ports_json = open('ports.json')
    ports = json.load(ports_json)

    last_zero_movement_timestamp = 0

    os.environ['OPENCV_FFMPEG_CAPTURE_OPTIONS'] = 'rtsp_transport;udp'

    cap = cv2.VideoCapture(camera.rtspUrl, cv2.CAP_FFMPEG)

    if not cap.isOpened():
        print('Cannot open RTSP stream')
        exit(-1)

    previous_frame = None
    movement_frames_counter = 0
    is_alarm_triggered = False

    while True:

        _, frame = cap.read()

        img_brg = np.array(frame)
        img_rgb = cv2.cvtColor(src=img_brg, code=cv2.COLOR_BGR2RGB)

        prepared_frame = cv2.cvtColor(img_rgb, cv2.COLOR_BGR2GRAY)
        prepared_frame = cv2.GaussianBlur(src=prepared_frame, ksize=(5, 5), sigmaX=0)

        if (previous_frame is None):
            previous_frame = prepared_frame
            continue

        if (previous_frame is None):
            previous_frame = prepared_frame
            continue

        diff_frame = cv2.absdiff(src1=previous_frame, src2=prepared_frame)
        previous_frame = prepared_frame

        kernel = np.ones((5, 5))
        diff_frame = cv2.dilate(diff_frame, kernel, 1)

        thresh_frame = cv2.threshold(src=diff_frame, thresh=20, maxval=255, type=cv2.THRESH_BINARY)[1]

        contours, _ = cv2.findContours(image=thresh_frame, mode=cv2.RETR_EXTERNAL, method=cv2.CHAIN_APPROX_SIMPLE)

        if len(contours) == 0:

            movement_frames_counter = 0

            if is_alarm_triggered:

                current_GMT = time.gmtime()
                ts = calendar.timegm(current_GMT)

                if last_zero_movement_timestamp == 0:
                    last_zero_movement_timestamp = ts
                else:
                    if ts - last_zero_movement_timestamp > 120: #two minutes of no big movement found
                        last_zero_movement_timestamp = 0
                        is_alarm_triggered = False
                        requests.post(url = "http://localhost:"+ str(ports['backendMain']) +"/onMovementStopped", json = camera.__dict__)

        else:

            for contour in contours:

                if cv2.contourArea(contour) > 3000:

                    if movement_frames_counter == 4: #at least 4 frames with movement

                        if is_alarm_triggered:

                            last_zero_movement_timestamp = 0

                        else:

                            (x, y, w, h) = cv2.boundingRect(contour)
                            cv2.rectangle(img=img_brg, pt1=(x, y), pt2=(x + w, y + h), color=(0, 255, 0), thickness=2)
                            cv2.imwrite("alarm.jpeg", img_brg)
                            
                            requests.post(url = "http://localhost:"+ str(ports['backendMain']) +"/onMovementDetected", json = camera.__dict__)
                            is_alarm_triggered = True

                    else:

                        movement_frames_counter = movement_frames_counter + 1

                    break #at least one big movement found, no need to check the others

        
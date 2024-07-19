import cv2
import dlib
import imutils
from scipy.spatial import distance
from imutils import face_utils
from pygame import mixer
from gtts import gTTS
import os
from twilio.rest import Client
import time
import pygame
import tempfile
import logging

# Initialize logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Initialize Pygame mixer for playing alert sound
mixer.init()
mixer.music.load("music.wav")

# Initialize Twilio client for SMS alerts
account_sid = 'Enter Your SID KEY'
auth_token = 'Enter Your Token Key'
client = Client(account_sid, auth_token)

def eye_aspect_ratio(eye):
    try:
        A = distance.euclidean(eye[1], eye[5])
        B = distance.euclidean(eye[2], eye[4])
        C = distance.euclidean(eye[0], eye[3])
        ear = (A + B) / (2.0 * C)
        return ear
    except Exception as e:
        logging.error(f"Error calculating EAR: {e}")
        return 0

def play_voice_alert(message):
    try:
        tts = gTTS(message, lang='en')
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_file:
            temp_file_path = temp_file.name
            tts.save(temp_file_path)
            mixer.music.load(temp_file_path)
            mixer.music.play()
            while mixer.music.get_busy():
                pygame.time.Clock().tick(10)
    except Exception as e:
        logging.error(f"Error playing voice alert: {e}")

def send_sms_alert():
    try:
        client.messages.create(
            body="Drowsiness detected! Please take a break.",
            from_='+12345678',  # Enter your Twilio number
            to='+12345678'      # Enter Your phone number
        )
    except Exception as e:
        logging.error(f"Error sending SMS alert: {e}")

# Constants
thresh = 0.25
frame_check = 20

# Initialize dlib's face detector and facial landmark predictor
detect = dlib.get_frontal_face_detector()
predict = dlib.shape_predictor("models/shape_predictor_68_face_landmarks.dat")

(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_68_IDXS["left_eye"]
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_68_IDXS["right_eye"]

# Start video capture from webcam
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    logging.error("Error: Could not open video capture.")
    exit()

flag = 0
alert_count = 0
alert_active = False
start_time = time.time()
break_interval = 3600  # Recommend break every hour

while True:
    ret, frame = cap.read()
    if not ret:
        logging.error("Error: Could not read frame from video capture.")
        break

    frame = imutils.resize(frame, width=450)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    subjects = detect(gray, 0)
    for subject in subjects:
        shape = predict(gray, subject)
        shape = face_utils.shape_to_np(shape)
        leftEye = shape[lStart:lEnd]
        rightEye = shape[rStart:rEnd]
        leftEAR = eye_aspect_ratio(leftEye)
        rightEAR = eye_aspect_ratio(rightEye)
        ear = (leftEAR + rightEAR) / 2.0
        leftEyeHull = cv2.convexHull(leftEye)
        rightEyeHull = cv2.convexHull(rightEye)
        cv2.drawContours(frame, [leftEyeHull], -1, (0, 255, 0), 1)
        cv2.drawContours(frame, [rightEyeHull], -1, (0, 255, 0), 1)
        cv2.putText(frame, f"EAR: {ear:.2f}", (300, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)

        if ear < thresh:
            flag += 1
            if flag >= frame_check and not alert_active:
                alert_active = True
                alert_count += 1
                start_time = time.time()
                cv2.putText(frame, "****************ALERT!****************", (10, 30),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
                cv2.putText(frame, "****************ALERT!****************", (10, 325),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
                mixer.music.play()
                play_voice_alert("Please wake up! You are drowsy.")
                send_sms_alert()
        else:
            if alert_active:
                alert_active = False
                end_time = time.time()
                with open("alert_log.txt", "a") as log_file:
                    log_file.write(f"Alert {alert_count} started at {start_time} and ended at {end_time}\n")
            flag = 0

    elapsed_time = time.time() - start_time
    if elapsed_time > break_interval:
        play_voice_alert("You have been driving for an hour. Please take a break.")
        send_sms_alert()
        start_time = time.time()  # Reset the break timer

    cv2.putText(frame, f"Alerts: {alert_count}", (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)

    cv2.imshow("Frame", frame)
    key = cv2.waitKey(1) & 0xFF
    if key == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
logging.info("Program terminated successfully.")

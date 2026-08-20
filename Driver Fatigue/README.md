# Driver Fatigue Detection System

A Python-based system to detect driver drowsiness using computer vision and alert mechanisms.

## Features
- Real-time drowsiness detection using facial landmarks
- Audio alert system when drowsiness is detected
- Alert logging for monitoring driver behavior
- Uses OpenCV and dlib for face detection and eye tracking

## Technologies Used
- **Python** - Core implementation
- **OpenCV** - Computer vision processing
- **dlib** - Face detection and facial landmarks
- **Audio** - Alert notification system

## Files
- `Drowsiness_Detection - Copy.py` - Main detection algorithm
- `ReadMe.txt` - Quick reference guide
- `alert_log.txt` - Log file for detected alerts
- `music.wav` - Alert sound file
- `voice_alert.mp3` - Voice notification files
- `models/` - Pre-trained models for face detection
- `assets/` - Supporting assets

## Requirements
- Python 3.x
- OpenCV
- dlib
- NumPy

## How to Use
1. Install required dependencies: `pip install opencv-python dlib numpy`
2. Run the script: `python Drowsiness_Detection.py`
3. The system will access your webcam and monitor for drowsiness
4. Alerts will sound when fatigue is detected

## Safety Notice
This tool is designed to assist drivers in preventing fatigue-related accidents. It should be used as a supplementary safety measure and not as a replacement for proper rest.

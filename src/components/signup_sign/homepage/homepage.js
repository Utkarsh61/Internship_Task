import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./homepage.css";
import backgroundImage from "./back.jpg";
import RecordRTC from "recordrtc";

const Homepage = () => {
  const [recording, setRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [recorder, setRecorder] = useState(null);

  const startRecording = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      // Request audio permission only if recording starts
      const audioStream = recording
        ? await navigator.mediaDevices.getUserMedia({ audio: true })
        : null;

      const combinedStream = new MediaStream([
        ...screenStream.getTracks(),
        ...(audioStream ? audioStream.getTracks() : []), // Include audio only if recording
      ]);

      const rtcRecorder = new RecordRTC(combinedStream, {
        type: "video",
      });

      rtcRecorder.startRecording();
      setRecording(true);
      setStream(combinedStream);
      setRecorder(rtcRecorder);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    console.log("Stop button clicked");
    if (recorder) {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();

        // Save the recorded video to local storage
        const videoURL = URL.createObjectURL(blob);
        localStorage.setItem("recordedVideo", videoURL);

        // Render the recorded video on the home page
        const videoElement = document.createElement("video");
        videoElement.src = videoURL;
        videoElement.controls = true;
        document.body.appendChild(videoElement);

        setRecording(false);
        setStream(null);
        setRecorder(null);
      });
    }
  };

  return (
    <div className="homepage">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="button-container">
          <div className="button-group">
            {recording ? (
              <button className="stop-button" onClick={stopRecording}>
                Stop
              </button>
            ) : (
              <button className="start-button" onClick={startRecording}>
                Start Screen Recorder
              </button>
            )}
          </div>
          <div className="auth-buttons">
            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>
            <Link to="/register">
              <button className="register-button">Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

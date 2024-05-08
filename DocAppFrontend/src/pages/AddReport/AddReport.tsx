import React, { useState, useCallback, useRef } from 'react';
import AddReSty from './AddReport.module.css';
import Webcam from 'react-webcam';
import { FileInput, Button } from '@mantine/core';

const videoConstraints = {
  width: 200,
  height: 200,
  facingMode: 'user',
};

const uploadFile = () => {
  // Implement the logic to upload the file
  // For now, you can log a message indicating that the file is being uploaded
  console.log('Uploading file...');
};

export default function AddReport() {
  const [picture, setPicture] = useState('');
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
  }, [webcamRef]);

  return (
    <div className={AddReSty.Addre_main_container}>
      <h4>Add report</h4>
      <div className={AddReSty.Addre_Textcontainer}>
        <h2>Upload a report.</h2>
        <p>
          Snap or upload a photo of your report. Make sure the text is clear and
          all corners are visible.
        </p>
        <a href="#how-to-capture">How to capture.</a>
        <a href="#what-can-add">What can I add?.</a>
      </div>

      <div className={AddReSty.Addre_Downcontainer}>
        <div className={AddReSty.Addre_Imgcontainer}>
          {picture === '' ? (
            <Webcam
              audio={false}
              height={270}
              ref={webcamRef}
              width={470}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              screenshotQuality={0.8}
              mirrored  // Add mirrored prop for proper mirroring
            />
          ) : (
            <img src={picture} alt="Captured report" />
          )}
        </div>

        <div className={AddReSty.Addre_Btncontainer}>
          {picture !== '' ? (
            <Button
              onClick={(e) => {
                e.preventDefault();
                setPicture('');
              }}
              className={AddReSty.btn_btn_primary}
            >
              Retake
            </Button>
          ) : (
            <Button
              className={AddReSty.Use_Cam}
              onClick={(e) => {
                e.preventDefault();
                capture();
              }}
            >
              Capture
            </Button>
          )}
           <FileInput
            label="Select File"
            placeholder="select file from your device"
          />

          <Button onClick={uploadFile}>Upload File</Button>


        </div>
      </div>
    </div>
  );
}

import React, { useState, useCallback, useRef } from 'react';
import AddReSty from './AddReport.module.css';
import Webcam from 'react-webcam';
import { FileInput, Button } from '@mantine/core';
import { saveReportAction } from '@/container/action';

const videoConstraints = {
  width: 200,
  height: 200,
  facingMode: 'user',
};

export default function AddReport() {
    const [image, setImage] = useState("");
  const [picture, setPicture] = useState('');
  const [name, setName] = useState('');
  let newDate = new Date()
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const pictureSrc: any = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
  }, [webcamRef]);


  const submitImage = async () => {
    const data = new FormData()
    if(image == ''){
      data.append("file", picture)
    }else {
      data.append("file", image)
    }
    data.append("upload_preset", "demoApp")
    data.append("cloud_name", "dugv0emid")

    await fetch("https://api.cloudinary.com/v1_1/dugv0emid/image/upload", {
      method: "POST",
      body: data
    })
      .then((res) => res.json())
      .then(async (data) => {
        setName(localStorage.getItem('user')??'');
        const upd = saveReportAction({
          hospitalName: "hospitalName",
          date: `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`,
          image: data.url,
          description: "Medical Report",
          username: localStorage.getItem('user')
        })
        console.log(upd, {
          hospitalName: "hospitalName",
          date: `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`,
          image: data.url,
          description: "Medical Report",
          username: localStorage.getItem('user')
        })
        alert('file Uploded');

      }).catch((err) => {
        console.log(err)
        alert(err)
      })

  }

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
            onChange={(e: any)=> setPicture(e.target.value)}
          />

          <Button onClick={submitImage}>Upload File</Button>


        </div>
      </div>
    </div>
  );
}

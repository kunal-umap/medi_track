import React from 'react'
import imageToAdd from './../../Assets/Images/download.jpg'
import imagePres from './../../Assets/Images/Prescription.png'
import imageDoc from './../../Assets/Images/doctor.jpg'
import StyleDisp from './DisplayReport.module.css'

export default function DisplayReport() {
  return (
    <div className={StyleDisp.DisplayRepPage}>
      <div className={StyleDisp.Box}>
        <div className={StyleDisp.RepLeft}>
          <div className={StyleDisp.Report}>
            <h3>Report</h3>
            <div className={StyleDisp.Image}>
              <img src={imageToAdd} alt="Image"></img>
            </div>  
          </div>

          <div className={StyleDisp.RepPrescrip}>
            <h3>Prescription</h3>
            <div className={StyleDisp.Images}>
              <img src={imagePres} alt="PrescriptionImage"></img>
            </div>
          </div>
        </div>

        <div className={StyleDisp.RepRight}>
          <img src={imageDoc}></img>
          <div className={StyleDisp.HospName}>
            <h3>Hospital Name : ABC</h3>
          </div>

          <div className={StyleDisp.DoctName}>
            <h3>Doctor Name : Dr. XYZ  (MBBS)</h3>
          </div>

          <div className={StyleDisp.Date}>
            <h3>Date : 02/05/2024</h3>
          </div>

          <div className={StyleDisp.Remarks}>
            <h3>Remarks</h3>
          </div>
        </div>
      </div>
    </div>


    
  )
}

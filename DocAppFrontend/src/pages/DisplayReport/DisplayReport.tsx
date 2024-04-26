import React from 'react'
import imageToAdd from './../../Assets/Images/download.jpg'
import imagePres from './../../Assets/Images/Prescription.png'
import StyleDisp from './DisplayReport.module.css'

export default function DisplayReport() {
  return (
    <div className={StyleDisp.DisplayRepPage}>
      <h2 className="repHeading">Report</h2>
      <div className="Images">
         <img src={imageToAdd} alt="Image" ></img>
      </div>
      <div className="presp">
        <h2>Prescription</h2>
        <img src={imagePres} alt="Prescription"></img>
      </div>
    </div>
  )
}

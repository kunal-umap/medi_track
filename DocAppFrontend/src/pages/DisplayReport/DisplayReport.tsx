import {useState, useEffect} from 'react'
import imageToAdd from './../../Assets/Images/download.jpg'
import imagePres from './../../Assets/Images/Prescription.png'
import imageDoc from './../../Assets/Images/doctor.jpg'
import StyleDisp from './DisplayReport.module.css'
import { getRecordAction } from '@/container/action'

export default function DisplayReport() {

  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [extractedDates, setExtractedDates] = useState('');

  const [any,setAny] = useState({});
  const [text,setText] = useState('');
  useEffect(()=>{
    const idx: any = localStorage.getItem('id');
    getRecordAction({username: localStorage.getItem('user')}).then(data=> {
      setAny(data[idx])
      setImage(data[idx].image)
    })


  },[])

  return (
    <div className={StyleDisp.DisplayRepPage}>
      <div className={StyleDisp.Box}>
        <div className={StyleDisp.RepLeft}>
          <div className={StyleDisp.Report}>
            <h3>Report</h3>
            <div className={StyleDisp.Image}>
              <img src={any.image} alt="Image"></img>
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
            <h3>Hospital Name : {any.hospitalName}</h3>
          </div>

          <div className={StyleDisp.DoctName}>
            <h3>Doctor Name : Dr. XYZ  (MBBS)</h3>
          </div>

          <div className={StyleDisp.Date}>
            <h3>Date : {any.date}</h3>
          </div>

          <div className={StyleDisp.Remarks}>
            <h3>Remarks: {text||'No remark for now'}</h3>
          </div>
        </div>
      </div>
    </div>


    
  )
}

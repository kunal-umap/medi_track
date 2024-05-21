import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
//import './MedicalRecords.css'
import './MedicalReport.css'
import Report from '@/components/Report/Report';
import { getRecordAction } from '@/container/action';


export default function MedicalReport() {
  const [name,setName] = useState('');
  const [repa,setReps] = useState([]);

  const nav = useNavigate();
  useEffect(() => {

    localStorage.getItem('isDoc')?nav('/Doc'):"";
    setName(localStorage.getItem('user')?? '');
    const reportData = getRecordAction({
      username: localStorage.getItem('user')
    }).then(data => {
      console.log(data)
      setReps(data)
      localStorage.setItem('reps',JSON.stringify(repa));
    }).catch(err => {
      console.log(err)
    })
  
  }, []);
  const steps: any = [];
  return (
    <div className="MedicalRecord">
      <h1 className="mrHeading">Medical Record</h1>
      <div className="RecordsCont">
      {repa.forEach((ele: any,idx) =>{
            console.log(idx)
             steps.push(<Report key={idx} idx={idx} title={ele.description} src={ele.image} hospital={ele.hospitalName} date={ele.date} />)
          })}
        {
          steps
        }
      </div>
    </div>
  )
}

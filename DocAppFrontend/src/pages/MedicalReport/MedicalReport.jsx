import React, { useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
//import './MedicalRecords.css'
import './MedicalReport.css'

import Report from '../../Components/Report/Report'
xport default function MedicalRecords() {
  //const navigate = useNavigate();
  // const [name,setName] = useState('');
  //const route = () => {
    // setName(localStorage.getItem('user'));
   // const key = localStorage.getItem('user-authentication-token');
    //return key ? true : false;
  //}

  // useEffect(() => {
  //   if (!route()) {
  //     navigate('/login');
  //   }
  // }, [route, navigate]);



  return (
    
    <div className="MedicalRecord">
      <h1 className="mrHeading">Medical Record</h1>
      <div className="RecordsCont">
        <Report title="Report1"></Report>
        <Report title="Report2"></Report>
        <Report title="Report3"></Report>
        <Report title="Report4"></Report>
        <Report title="Report5"></Report>

      </div>
    </div>

  )
}
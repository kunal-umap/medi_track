import React from 'react'
import './Report.css'
import { useNavigate } from 'react-router-dom'

//import temp from '../../Assets/Image/documentsave.jpg'
export default function Report(props: any) {
  const navigate = useNavigate();
  const redirect = () => {
    localStorage.setItem('id',props.idx);
    navigate('/display-report')
  }
  return (
    <div className="report" id={props.idx} onClick={redirect}>
    <img className="RImg" src={`${props.src}`} alt="" />
    <div className="RMid">
        <h3>{props.title}</h3>
        <h4>{props.hospital}</h4>
    </div>
    <h5 className='Rdate'>{props.date}</h5>
    </div>
  )
}


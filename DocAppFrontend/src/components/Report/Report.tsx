import React from 'react'
import './Report.css'

//import temp from '../../Assets/Image/documentsave.jpg'
export default function Report(props: any) {
  return (
    <div className="report">
    <img className="RImg" src={`${props.src}`} alt="" />
    <div className="RMid">
        <h3>{props.title}</h3>
        <h4>{props.hospital}</h4>
    </div>
    <h5 className='Rdate'>{props.date}</h5>
    </div>
  )
}


import React, { useState } from 'react'
import StyleDoc from './Doc.module.css'
import { getRecordAction } from '@/container/action'
import Report from '@/components/Report/Report';

export default function Doc() {
    const [user,setUser] = useState("")
    const [patData,setPatData] = useState([]);
    const handleSearch = () => {
        const reportData = getRecordAction({
            username: user
          }).then(data => {
            console.log(data)
            setPatData(data)
          }).catch(err => {
            console.log(err)
          })
    }

    const steps: any = [];
  return (
    <div className={StyleDoc.docPage}>
        <div className={StyleDoc.inp}>
            <label style={{
                marginRight: "16px"
            }} htmlFor="PatId">Patient Username:</label>
            <input style={{
                padding: '4px',
                borderRadius: '8px',
                border: "none",
                textAlign: "center",
                background: "#ADD8E6"
            }} type="text" name="PatientId" id="PatId" onChange={e => setUser(e.target.value)} />
        </div>
        <input style={{
            padding: "8px",
            width: "100px",
            color: "white",
            background: "blue",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            margin: "12px"
        }}   type="submit" value="Find" onClick={handleSearch} />
        <div style={{
            display: "flex"
        }}>
        {patData.forEach((ele: any,idx) =>{
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

import React from 'react'

import './HomeReport.css'

import Report from '../Report/Report'
// import { getRecordAction } from '../../container/action';

export default function HomeReport(props) {
//   const [name,setName] = useState('');
//   const [data,setData] = useState([]);
  // const getData = async () => {
  //   const reportData = await getRecordAction({
  //     username: "jggabar"
  //   })
  //   console.log(reportData)
  // }
  // useEffect(()=> {
    // const reportData = getRecordAction({
    //   username: "jggabar"
    // }).then(data => {
    //   console.log(data)
    // }).catch(err => {
    //   console.log(err)
    // })
    // console.log(reportData)
  // })
  console.log(props.data)
  const steps = [];
  return (
    <div className='HomeReport'>
        <button className='Floatingtn'>+</button>
        <h2 className="hrHeading">Reports</h2>
        <div className="container">
          {props.data.forEach(ele =>{
            console.log(ele,"print")
             steps.push(<Report title={ele.description} src={ele.image} hospital={ele.hospitalName} date={ele.date} />)
          })}
        {
          steps
        }
            {/* <Report title="Diabetes Report"/>
            <Report title="MRI Report"/>
            <Report title="Blood Test Report"/> */}
        </div>
    </div>
  )
}

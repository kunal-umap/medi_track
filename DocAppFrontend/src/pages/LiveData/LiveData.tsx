import React, { useState } from 'react'

export default function LiveData() {
const [data,setData] = useState(1);
//     setInterval(()=>{
// setData(1+data)
//     }, 30000)

  return (
    <div>
        {data}
      <iframe style={{
        height: "80vh",
        width: "100%"
      }} src="http://192.168.137.39/" ></iframe>
    </div>
  )
}

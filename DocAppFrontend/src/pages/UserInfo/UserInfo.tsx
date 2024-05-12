import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './UserInfo.css';

export default function UserInfo() {

    // const navigate = useNavigate();
    // // const [name,setName] = useState('');
    
    // const route = () => {
    // //   setName(localStorage.getItem('user'));
    //   const key = localStorage.getItem('user-authentication-token');
    //   return key ? true : false;
    // }
    // useEffect(() => {
    //   if (!route()) {
    //     navigate('/login');
    //   }
    // }, [route, navigate]);
  

    return (
        <div className="UserInfocontainer">
            <h3 className='userName'>DOE</h3>
            <div className="innerContainer">
                <div className='card'>
                    <h3>Patient Medical Records</h3>
                    <div>
                        <h5 >Age :</h5>
                        <p>67</p>
                    </div>
                    <div>
                        <h5>Gender:</h5>
                        <p>Female</p>
                    </div>
                    <div>
                        <h5 >Last Updated :</h5>
                        <p>12/9/2023</p>
                    </div>
                    <div>
                        <h5 >Waight :</h5>
                        <p>67kg</p>
                    </div>
                    <div>
                        <h5 >Height :</h5>
                        <p>5.5feet</p>
                    </div>
                    <div>
                        <h5 >Blood Pressure :</h5>
                        <p>120/80</p>
                    </div>
                </div>

                <div className='card'>
                    <h3>Attachments</h3>
                    <div>
                        <h5 >Blood test results</h5>
                        <p>test result</p>
                    </div>
                </div>
                <div className='card'>
                    <h3>Annotations</h3>
                    <div>
                        <h5>Dr.Smith</h5>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima suscipit aperiam rem quibusdam laborum illum quae dolorem quis animi sunt soluta modi ab assumenda earum incidunt
                        </p>
                    </div>
                </div>
            </div>
            <div className="buttonEdit">
                <button>Edit</button>
            </div>
        </div>
    )
}

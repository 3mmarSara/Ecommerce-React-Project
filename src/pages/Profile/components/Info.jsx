import React, {useState, useEffect } from "react";
import './Info.css'
import { useContext } from "react";
import { UserContext } from "../../../contexts/User";
import axios from 'axios';
import Loader from '../../../components/Loader';



export default function Info() {

    const { userToken } = useContext(UserContext);
    const [user, setUser] = useState([]);
    const [loader,setLoader] = useState(true);
    const [error, setError] = useState(false);

    const getUser =async()=>{

        try{
          const {data} = await axios.get(`${import.meta.env.VITE_API}/user/profile`, {
            headers: {
              Authorization: 'Tariq__' + userToken
            }
          });
           setUser(data.user);
          setLoader(false);
          setError(false);
        }catch(error){
          setLoader(false);
          setError(true);
        }
    
    
      };
    
      useEffect(()=>{
        getUser();
      },[]);


  return (
    <>

    {!loader && !error && 
        <div className='info'>

                <div className="container">
                    <span>User Name:</span>
                    <span>{user.userName}</span>
                </div>

                <div className="container">
                    <span>Email Address:</span>
                    <span>{user.email}</span>
                </div>

                <div className="container">
                    <span>Role:</span>
                    <span>{user.role}</span>
                </div>

                
                <div className="container">
                    <span>Account Status:</span>
                    <span>{user.status}</span>
                </div>

                <div className="container">
                    <span>Member Since:</span>
                    <span>{user.createdAt.substring(0, 10)}</span>
                </div>           

        </div>
    }

                        <div className="errors-div">
                            {loader && <div className='loader'><Loader/></div>}
                            {error && <p>Failed to load personal information!</p>}
                        </div>

    </>
  )
}

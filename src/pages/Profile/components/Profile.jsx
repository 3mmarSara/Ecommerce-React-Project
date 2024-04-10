import React, {useState, useEffect } from "react";
import { Link, Outlet, useLocation } from 'react-router-dom';
import './Profile.css'
import { useContext } from "react";
import { UserContext } from "../../../contexts/User";
import axios from 'axios';
import Loader from '../../../components/Loader';



export default function Profile() {

  const location = useLocation();
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
    <div className="profile-container">
      <div className="sidebar">
            {!loader && !error && 
                    <div className="image-name">
                        <div className="img-container">
                             <img src={user.image.secure_url} alt="" />
                        </div>
                        <div className="name">{user.userName}</div>
                    </div>
            }
            {(loader || error ) &&
                <div className="errors-div">
                     {loader && <div className='loader loader-color'><Loader/></div>}
                     {error && <p>Failed to load ppersonal image!</p>}
                 </div> 
            }

             <div className="sidebar-container">
                    <Link  to="/profile/info" className={location.pathname === '/profile/info' ? 'active profile-link' : 'profile-link'}>Personal Info</Link>
                    <Link to="/profile/orders" className={location.pathname === '/profile/orders' ? 'active profile-link' : 'profile-link'}>Orders History</Link>
             </div>

      </div>
      <div className="profile-content">
        <Outlet />
      </div>
    </div>
  );
}

import axios from "axios";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Link } from "react-router-dom";
import {UserContext} from "../../../contexts/User";
import './SigninStyle.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebookF, faLinkedin, faGoogle} from "@fortawesome/free-brands-svg-icons";

const initialValues = {
      email: "",
      password: "",
};

export default function Signin() {

  const navigate = useNavigate();
  const {setUserToken} = useContext(UserContext);

  const [submit,setSubmit] = useState(false);

  const onSubmit = async (values, actions) => {
    setSubmit(true);

    try{
     const {data} = await axios.post(`${import.meta.env.VITE_API}/auth/signin`, values);
     if(data.message === 'success'){
      toast.success('You\'re in! Welcome back', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });
      
      localStorage.setItem('userToken', data.token);
      setUserToken(data.token);
      actions.resetForm();
      navigate('/');
     }
     
    }catch(e){

        if(e.response.data.message === 'plz confirm your email'){
        toast.error('Please confirm your email.', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }

      if(e.response.data.message === 'data invalid'){
        toast.error(' there\'s an issue with the provided information', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
      

    }finally{
      setSubmit(false);
    }



  };


  return (
    <div className="signinForm">

      <Formik initialValues={initialValues} onSubmit={onSubmit} >
        {() => (
          <Form action="signin_form" className="formContainer">
          <div className="field-container">
          <Field type="email" name="email" placeholder="Email" className="field"/>
          <FontAwesomeIcon icon={faEnvelope} className="icon"/>
          </div>

          <div className="field-container">
          <Field type="password" name="password" autoComplete='' placeholder="Password" className="field" />
          <FontAwesomeIcon icon={faLock} className="icon"/>
          </div>


         <Link className="forgetPassLink" to="/sendcode">Forget Your Passowrd?</Link>
          <button type="submit" className="signinBtn" disabled={submit}>{submit ? 'SIGNINGIN...' : 'SIGNIN'}</button>
          <div className="socialContainer">
              <p>Or Sign in with social platform</p>
              <div className="iconsContainer">
                <FontAwesomeIcon icon={faFacebookF} className="icon"/>
                <FontAwesomeIcon icon={faGoogle} className="icon"/>
                <FontAwesomeIcon icon={faTwitter} className="icon"/>
                <FontAwesomeIcon icon={faLinkedin} className="icon"/>
              </div>
          </div>
        </Form>
        )}
        
      </Formik>
    </div>
  );

}

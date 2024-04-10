import './SendCode.css'
import axios from "axios";
import React, { useState } from "react";
import { object, string } from "yup";
import { Formik, Form, Field } from "formik";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

const initialValues = {
    email: "",
  };

  const sendCodeSchema = object({
    email: string()
      .email("Please enter valid email.")
      .required("Please enter your email."),  
  });

export default function SendCode() {

  const navigate = useNavigate();
  const [submit,setSubmit] = useState(false);

  const onSubmit = async (values, actions) => {
    setSubmit(true);
    localStorage.setItem('email', values.email);

    try{
     const {data} = await axios.patch(`${import.meta.env.VITE_API}/auth/sendcode`, values);
     if(data.message === 'success'){

      toast.success('Verification code sent to your email successfully. Please check your inbox.', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });

      actions.resetForm();
      navigate('/resetpassword');
     }
     
    }catch(e){

      if(e.response.status === 409){
        toast.error('Failed to send verification code to your email. Please try again later.', {
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
    <div className="send-code-form"> 
      <Formik initialValues={initialValues} validationSchema={sendCodeSchema} onSubmit={onSubmit}>
        {({errors, touched}) => (

          <Form action="send-code-form" className="formContainer">

          <div className="field-container">
          <Field type="email" name="email" placeholder="Email" className="field"/>
          <FontAwesomeIcon icon={faEnvelope} className="icon"/>
          </div>

          <div className="error_container">
            {errors.email && touched.email && (
               <>
               <FontAwesomeIcon icon={faTriangleExclamation} className="icon"/>
               <p className="form_error">{errors.email}</p>
             </>
              
            )}
          </div>
      
          
          <button type="submit" className="send-code-btn" disabled={submit}>{submit ? 'Sending...' : 'Send Code'}</button>

        </Form>
        )}
        
      </Formik>
    </div>
  );
}

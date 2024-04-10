import './ResetPassword.css'
import axios from "axios";
import React, { useState } from "react";
import { object, string, ref } from "yup";
import { Formik, Form, Field } from "formik";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faShield, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

const initialValues = {
    email: localStorage.getItem('email'),
    password: "",
    cpassword: "",
    code: "",
  };

  const passwordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  const resetPasswordSchema = object({
    email: string()
      .email("Please enter valid email.")
      .required("Please enter your email."), 
    password: string()
    .min(8)
    .max(20)
    .required("Please enter password.")
    .matches(passwordRegex, "Please enter valid password."),
    cpassword: string()
    .oneOf([ref("password")], "Password do NOT match!")
    .required("Please confirm password."), 
    code: string()
    .required("Please enter verification code"),
  });

export default function ResetPassword() {
    
  const navigate = useNavigate();
  const [submit,setSubmit] = useState(false);

  const onSubmit = async (values, actions) => {
    setSubmit(true);

    try{
     const {data} = await axios.patch(`${import.meta.env.VITE_API}/auth/forgotPassword`, {
        email: values.email,
        password: values.password,
        code: values.code
     });
     if(data.message === 'success'){
      toast.success('Password reset successful.', {
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
      navigate('/signin');
     }
     
    }catch(e){

      if(e.response.status === 409){
        toast.error('Failed to reset password. Please ensure you\'ve entered correct information and try again.', {
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
    <div className="reset-password-form"> 
      <Formik initialValues={initialValues} validationSchema={resetPasswordSchema} onSubmit={onSubmit}>
        {({errors, touched}) => (

          <Form action="reset-password-form" className="formContainer">

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

          <div className="field-container">
          <Field type="text" name="code" placeholder="Code" className="field"/>
          <FontAwesomeIcon icon={faShield} className="icon"/>
          </div>

          <div className="error_container">
            {errors.code && touched.code && (
               <>
               <FontAwesomeIcon icon={faTriangleExclamation} className="icon"/>
               <p className="form_error">{errors.code}</p>
             </>
              
            )}
          </div>

          <div className="field-container">
          <Field type="password" name="password" autoComplete='' placeholder="Passowrd" className="field"/>

          <FontAwesomeIcon icon={faLock} className="icon"/>
          </div>
          <div className="error_container">
            {errors.password && touched.password && (
               <>
               <FontAwesomeIcon icon={faTriangleExclamation} className="icon"/>
               <p className="form_error">{errors.password}</p>
             </>
              
            )}
          </div>

          <div className="field-container">
          <Field type="password" name="cpassword" autoComplete='' placeholder="Confirm Password" className="field"/>

          <FontAwesomeIcon icon={faLock} className="icon"/>
          </div>

          <div className="error_container">
            {errors.cpassword && touched.cpassword && (
              <>
              <FontAwesomeIcon icon={faTriangleExclamation} className="icon"/>
              <p className="form_error">{errors.cpassword}</p>
            </>
            )}
          </div>
      
          
          <button type="submit" className="reset-password-btn" disabled={submit}>{submit ? 'Resetting...' : 'Reset Password'}</button>

        </Form>
        )}
        
      </Formik>
    </div>
  );

}

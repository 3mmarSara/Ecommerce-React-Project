import axios from "axios";
import React, { useState } from "react";
import { object, string, ref, mixed } from "yup";
import { Formik, Form, Field } from "formik";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import './SignupStyle.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebookF, faLinkedin, faGoogle} from "@fortawesome/free-brands-svg-icons";


const initialValues = {
  userName: "",
  email: "",
  image:"",
  password: "",
  cpassword: "",
};

const passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

const validateImage = (value) => {
    return ["image/jpeg", "image/png", "image/gif"].includes(value.type)
};

const signupSchema = object({
  userName: string().min(4).max(20).required("Please enter userName."),
  email: string()
    .email("Please enter valid email.")
    .required("Please enter your email."),  
  image: mixed().required("Please select an image.").test("fileType", "Invalid image format.",validateImage),
  password: string()
    .min(8)
    .max(20)
    .required("Please enter password.")
    .matches(passwordRegex, "Please enter valid password.")
    ,
  cpassword: string()
    .oneOf([ref("password")], "Password do NOT match!")
    .required("Please confirm password."),
});


export default function Signup() {

  const navigate = useNavigate();
  const [submit,setSubmit] = useState(false);

  const onSubmit = async (values, actions) => {
    setSubmit(true);

    const formData = new FormData();

    formData.append('userName', values.userName);
    formData.append('email',values.email);
    formData.append('password',values.password);
    formData.append('image',values.image);

    try{
     const {data} = await axios.post(`${import.meta.env.VITE_API}/auth/signup`, formData);
     if(data.message === 'success'){
      toast.success('Welcome aboard! Let the journey begin!', {
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
      document.getElementById("image").value = "";
      navigate('signin');
     }
     
    }catch(e){

      if(e.response.status === 409){
        toast.error('Email already in use. Please try another.', {
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
    <div className="signupForm"> 
      <Formik initialValues={initialValues} validationSchema={signupSchema} onSubmit={onSubmit}>
        {({errors, touched,setFieldValue}) => (
          <Form action="signup_form" className="formContainer">
           <div className="field-container">
           <Field type="text" name="userName" placeholder="UserName" className="field"/>
          <FontAwesomeIcon icon={faUser} className="icon"/>
          </div>
          <div className="error_container">
            {errors.userName && touched.userName && (
              
              <>
              <FontAwesomeIcon icon={faTriangleExclamation} className="icon"/>
              <p className="form_error">{errors.userName}</p>
            </>
            )}
          </div>

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

          <div className="file-field">
          <input 
            type="file" 
            name="image" 
            id="image"
            // className="field"
            onChange={(event) => { 
              setFieldValue("image", event.currentTarget.files[0]); 
            }}
            placeholder="Select Image"
          />
          </div>

          <div className="error_container">
            {errors.image && touched.image && (<>
              <FontAwesomeIcon icon={faTriangleExclamation} className="icon"/>
              <p className="form_error">{errors.image}</p>
            </>
            )}
          </div>

          <button type="submit" className="signupBtn" disabled={submit}>{submit ? 'SIGNINGUP...' : 'SIGNUP'}</button>
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

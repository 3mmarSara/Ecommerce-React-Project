import React, {useState, useEffect } from "react";
import './Billing.css';
import { useContext } from "react";
import { UserContext } from "../../../contexts/User";
import axios from 'axios';
import Loader from '../../../components/Loader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { object, string, ref, mixed } from "yup";
import { Formik, Form, Field } from "formik";
import { toast } from 'react-toastify';


export default function Billing() {

    const { userToken } = useContext(UserContext);
    const [cartProducts, setCartProducts] = useState([]);
    const [loader,setLoader] = useState(true);
    const [error, setError] = useState(false);
    const [submit,setSubmit] = useState(false);


    const initialValues = {
        address: "",
        phone: "",
        coupon:"",
      };

      const placeOrderSchema = object({
        address: string().required("Please enter your address."),
        phone: string()
        .matches(/^\+?\d{12}$/, "Phone number must be 10 digits")
          .required("Please enter your phone."), 
      });

    const totalSubtotal = cartProducts.reduce((accumulator, product) => {
        const subtotal = product.quantity * product.details.finalPrice;
        return accumulator + subtotal;
      }, 0);


      const getCartProducts =async()=>{

        try{
          const {data} = await axios.get(`${import.meta.env.VITE_API}/cart`, {
            headers: {
              Authorization: 'Tariq__' + userToken
            }
          });

          setCartProducts(data.products);
          setLoader(false);
          setError(false);
        }catch(error){
          setLoader(false);
          setError(true);

        }
    
    
      };


      const onSubmit = async (values, actions) => {

    
        if(cartProducts.length != 0){
            setSubmit(true);

            try{
            const {data} = await axios.post(`${import.meta.env.VITE_API}/order`,
            {
                couponName: values.coupon,
                address: values.address,
                phone: values.phone
            },
            {
                headers: {
                    Authorization: 'Tariq__' + userToken
                }
            }
            );

         if(data.message === 'success'){
          toast.success('Order successfully placed.', {
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
            getCartProducts();

         }
         
        }catch(e){
    
          if(e.response.status === 409){
            toast.error('An error occurred while processing your order!', {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          }else if(e.response.status === 404){
            
            toast.error('Coupon not found!', {
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
    
    
    }
      };


      useEffect(()=>{
        getCartProducts();
      },[]);


  return (
    <Formik initialValues={initialValues} validationSchema={placeOrderSchema} onSubmit={onSubmit}>
    {({errors, touched}) => (
        <Form action="signup_form">
          <div className='category-header'>
            <h2>Checkout</h2>
          </div>

          <div className="bill">

                    <div className="billing-details">

                        <div className="title">Billing Details</div>

                        <div className="fields">
                            <div className="field-container">
                                <label htmlFor="address">Address</label>
                                <Field type="text" name="address" id="address" className="field"/>
                                <div className="error_container">
                                    {errors.address && touched.address && (
                                    
                                    <>
                                    <FontAwesomeIcon icon={faTriangleExclamation} className="icon"/>
                                    <p className="form_error">{errors.address}</p>
                                    </>
                                    )}
                                </div>
                           </div>
                           
                       
                        
                        <div className="field-container">
                            <label htmlFor="phone">Phone</label>
                            <Field type="text" name="phone" id="phone"  className="field"/>
                            <div className="error_container">
                                {errors.phone && touched.phone && (
                                
                                <>
                                <FontAwesomeIcon icon={faTriangleExclamation} className="icon"/>
                                <p className="form_error">{errors.phone}</p>
                                </>
                                )}
                            </div>
                        </div>

                        </div>
                        

                    </div>


                    <div className="checkoutBox">
                    
                                {  !loader && !error && 
                                        <>
                                                 {cartProducts.map( product=>
                        
                                                        <div className="container" key={product.details._id}>
                                                            <div className="img-name">
                                                                <img src={product.details.mainImage.secure_url} alt="" />
                                                                <div className="name">{product.details.name}</div>
                                                            </div>
                                                            <div className="product-price">${(product.quantity*product.details.finalPrice).toFixed(2)}</div>
                                                        
                                                        </div>
                    
                                                )}

                                        </>
                                }

                                <div className="container line">
                                    <span>Subtotal:</span>
                                    <span>${(totalSubtotal).toFixed(2)}</span>
                                </div>

                                <div className="container line">
                                    <span>Shipping:</span>
                                    <span>Free</span>
                                </div>

                                <div className="container">
                                    <span>Total:</span>
                                    <span>${(totalSubtotal).toFixed(2)}</span>
                                </div>

                                <div className="radios-container">
                                    <div className="bank-radio">
                                    <label>
                                            <input
                                            type="radio"
                                            name="option"
                                            value="Bank"
                                            className="radio"
                                            />
                                            Bank

                                        </label>
                                        <img src="../../public/bank-pay.png" alt="" />

                                    </div>


                                        <label>
                                            <input
                                            type="radio"
                                            name="option"
                                            value="Cash on delivery"
                                            className="radio"
                                            />
                                            Cash on delivery
                                        </label>
                                </div>

                                <Field type="text" name="coupon" placeholder="Coupon Code" className="field-coupon"/>

                                
                                <button type="submit" className="palceOrderBtn" disabled={submit}>{submit ? 'Placing Order...' : 'Place Order'}</button>

                                


                    </div>
              

             

          </div>
          </Form>
        )}
      
          </Formik>

  )
}

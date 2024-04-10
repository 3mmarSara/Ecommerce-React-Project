import React, {useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../../contexts/User";
import axios from 'axios';
import './Orders.css'
import Loader from '../../../components/Loader';

export default function Orders() {

    const { userToken } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [loader,setLoader] = useState(true);
    const [error, setError] = useState(false);
  
    const getOrders =async()=>{
  
      try{
        const {data} = await axios.get(`${import.meta.env.VITE_API}/order`, {
          headers: {
            Authorization: 'Tariq__' + userToken
          }
        });
        setOrders(data.orders);
        setLoader(false);
        setError(false);
      }catch(error){
        setLoader(false);
        setError(true);
      }
  
  
    };
  
    useEffect(()=>{
        getOrders();
    },[]);
  



  return (
    <div className="orders">

        {!loader && !error && 

                    orders.map( order=>
                        order.products.length > 0 && <div key={order._id}>
                        <div className="order-header">Order</div>

                        <div className="order">
                            <div className="order-details">

                                <div className="title">Order Details</div>
                               
                                <div className="detail">
                                     <span>Order Date: </span>
                                     <div>{order.createdAt.substring(0, 10)}</div>
                                </div>
                                <div className="detail">
                                     <span>Delivery Address: </span>
                                     <div>{order.address}</div>
                                </div>
                                <div className="detail">
                                     <span>Contact Number: </span>
                                     <div>{order.phoneNumber}</div>
                                </div>
                                <div className="detail">
                                    <span>Coupon Name: </span>
                                    <div>{order.couponName}</div>
                                </div>
                                <div className="detail">
                                     <span>Payment Method: </span>
                                     <div>{order.paymentType}</div>
                                </div>
                                <div className="detail">
                                     <span>Order Total: </span>
                                     <div>${order.finalPrice}</div>
                                </div>


                                
                                
                            </div>

                           <div className="produts-container">
                                <div className="title">Order Products</div>

                                <div className="order-products">
                                        {
                                            
                                            order.products.map(product=>
                                                <div key={product._id} className="product">
                                                        <div className="image-container">
                                                                <img src={product.productId.mainImage.secure_url} alt="" />
                                                        </div>
                                                        <div className="name">{product.productId.name}</div>
                                                        <div className="regular-price">${product.unitPrice}</div>
                                                        <div className="psc-total">
                                                            <div>{product.quantity} pcs</div>
                                                            <div>Total: ${product.finalPrice}</div>
                                                        </div>
                                                       
                                                </div>

                                            )
                    
                                        
                                        }
                                    

                                    </div>


                           </div>


                             
                        </div>
                    </div>
                       
                    )
        }
        {(loader || error) && 
                <div className="errors-div">
                    {loader && <div className='loader'><Loader/></div>}
                    {error && <p>Failed to load orders</p>}
                </div>
        }

    </div>
  )
}

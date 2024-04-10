import React, {useState, useEffect } from "react";
import './Cart.css';
import { useContext } from "react";
import { UserContext } from "../../../contexts/User";
import axios from 'axios';
import Loader from '../../../components/Loader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown, faXmark} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


export default function Cart() {

  const navigate = useNavigate();
  const { userToken } = useContext(UserContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [loader,setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [cartUpdate, setCartUpdate] =useState(false);

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

  const incQuantity = async(productId) =>{
    setCartUpdate(true);

    try {
      const response = await axios.patch(`${import.meta.env.VITE_API}/cart/incraseQuantity`, {
        productId: productId
      }, {
        headers: {
          Authorization: 'Tariq__' + userToken
        }
      });
      
    }catch(error){
    }
    
    setCartUpdate(false);
    getCartProducts();
  };

  const decQuantity = async(productId) =>{
    setCartUpdate(true);

    try {
      const response = await axios.patch(`${import.meta.env.VITE_API}/cart/decraseQuantity`, {
        productId: productId
      }, {
        headers: {
          Authorization: 'Tariq__' + userToken
        }
      });
      
    }catch(error){
    }
    
    setCartUpdate(false);
    getCartProducts();
  };

  const removeProduct = async (productId) =>{
    setCartUpdate(true);

    try {
      const response = await axios.patch(`${import.meta.env.VITE_API}/cart/removeItem`, {
        productId: productId
      }, {
        headers: {
          Authorization: 'Tariq__' + userToken
        }
      });
      
    }catch(error){
    }
    
    setCartUpdate(false);
    getCartProducts();

  };


  const clearCart = async() =>{
    setCartUpdate(true);

    try {
      const response = await axios.patch(`${import.meta.env.VITE_API}/cart/clear`, null,{
        headers: {
          Authorization: 'Tariq__' + userToken
        }
      });
      
    }catch(error){
    }
    
    setCartUpdate(false);
    getCartProducts();
  };


  const handleChekoutBtn = ()=>{
      navigate('/bill');
  };


  useEffect(()=>{
    getCartProducts();
  },[]);


  return (
     <>

          <div className='category-header'>
            <h2>Cart</h2>
          </div>

        <div className="cart">

          <div className="cart-table">

                  <div className="cart-row">
                        <div>Product</div>
                        <div>Price</div>
                        <div>Quantity</div>
                        <div>Subtotal</div>
                        <div className="remove">Remove</div>
                  </div>
                

                  {  !loader && !error && 
                  
                      <div className="cart-products">

                        {cartProducts.map( product=>
                        
                            <div className="cart-row" key={product.details._id}>
                                <div className="img-name">
                                    <img src={product.details.mainImage.secure_url} alt="" />
                                    <div className="name">{product.details.name}</div>
                                </div>
                                <div className="product-price">${product.details.price}</div>
                                <div className="quantity">
                                       <span className="quantity-container">
                                              <span className="number">{product.quantity}</span> 
                                              <span className="inc-dec">
                                                    <button onClick={() => incQuantity(product.details._id)} disabled={cartUpdate} ><FontAwesomeIcon  className="inc-dec-icon" icon={faCaretUp}></FontAwesomeIcon></button>
                                                    <button onClick={() => decQuantity(product.details._id)} disabled={cartUpdate || (product.quantity === 1)} ><FontAwesomeIcon  className="inc-dec-icon" icon={faCaretDown}></FontAwesomeIcon></button>
                                                    
                                              </span>
                                       </span>
                                </div>
                                <div className="subtotal">${(product.quantity*product.details.finalPrice).toFixed(2)}</div>
                                <button disabled={cartUpdate} onClick={()=>removeProduct(product.details._id)}><FontAwesomeIcon className="icon" icon={faXmark}></FontAwesomeIcon></button>
                            </div>
                        
                        )}

                      </div>
                  
                  }
                          <div className="errors-div">
                            {loader && <div className='loader'><Loader/></div>}
                            {error && <p>Failed to load cart products</p>}
                        </div>
          </div>        

          <div className="checkoutBox-container">
              <button disabled={cartUpdate} onClick={clearCart} className="clear-cart"> <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon> Clear cart </button>

              <div className="checkoutBox">
                <div className="cart-total">Cart Total</div>
                <div className="total-info">

                  <div className="container">
                    <span>Subtotal:</span>
                    <span>${(totalSubtotal).toFixed(2)}</span>
                  </div>

                  <div className="container">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>

                  <div className="container">
                    <span>Total:</span>
                    <span>${(totalSubtotal).toFixed(2)}</span>
                  </div>


                </div>
                <div className="checkout-btn-container">
                      <button onClick={handleChekoutBtn} className="checkout-btn">Process to checkout</button>
                </div>

              </div>
              
          </div>

        </div>


  

     </> 
  );
}

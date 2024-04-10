import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Product.css';
import Loader from '../../../components/Loader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEye} from "@fortawesome/free-regular-svg-icons";
import { faStar, faCartShopping} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../contexts/User";
import { toast } from 'react-toastify';


export default function CategoryProduct() {

    const navigate = useNavigate();
    const { userToken } = useContext(UserContext);

    const [products,setProducts] = useState([]);
    const [loader,setLoader] = useState(true);
    const [emptyProducts,setEmptyProducts] = useState(false);
    const [error, setError] = useState(false);
    const {id} = useParams('id');
    const [addingtoCart, setAddingToCart] = useState(false);

  
    const getProducts = async ()=>{
      try{
        const {data} = await axios.get(`${import.meta.env.VITE_API}/products/category/${id}`);
        setProducts(data.products);
        setLoader(false);
        setError(false);
        if(data.products.length === 0){
            setEmptyProducts(true);
        }else{
            setEmptyProducts(false);
        }
      }catch(error){
        setLoader(false);
        setError(true);
      }
  
    };
  
    useEffect(()=>{
        getProducts();
    },[]);

    const addToCart= async(productId)=>{
      setAddingToCart(true);
  
      if(userToken){
  
        try {
          const response = await axios.post(`${import.meta.env.VITE_API}/cart`, {
            productId: productId
          }, {
            headers: {
              Authorization: 'Tariq__' + userToken
            }
          });
          
          toast.success('Added to cart successfully.', {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        } catch (error) {
          if(error.response.data.message === 'product already exists'){
  
            toast.warn('This product is already in the cart.', {
              position: "bottom-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
  
          }else{
  
            toast.error('Failed to add product to the cart!', {
              position: "bottom-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
  
          }
        }
        
  
  
      }else{
        navigate("/signin");
      }
  
      setAddingToCart(false);
    };
  

  return (
    <>

          <div className='category-header'>
            <h2>Category<span> Products</span></h2>
          </div>

    {   !loader && !error &&
            <div className='productsContainer'>
            {products.map( product=>
              <div key={product._id} className='product'>
                  <div className='image-container'>
                      <img src={product.mainImage.secure_url} alt="product" className='image'/>
                      <button onClick={() => addToCart(product._id)} disabled={addingtoCart} className='add-cart-btn'><FontAwesomeIcon className="icon" icon={faCartShopping}></FontAwesomeIcon>{addingtoCart ? 'Adding...' : 'Add to cart'} </button>

                  </div>
                  <h3 className='product-name'>{product.name}</h3>
                  <div className="price">
                  {product.discount === 0 ? (
                      <span className="regular-price">${product.price}</span>
                    ) : (
                      <div>
                        <span className="regular-price">${product.finalPrice}</span>
                        <span className="final-price">${product.price}</span>
                      </div>
                    )}
                  </div>

                  <div className="star-rating">
                  {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon icon={faStar}
                      key={index}
                      className={index < product.avgRating ? "star-filled" : "star-empty"}                  
                      />
                    
                  ))}
                </div>

                <div className='love-show-box'>
                  <FontAwesomeIcon icon={faHeart} className='icon'></FontAwesomeIcon>
                  <Link to={`/product/${product._id}`} className='eye-link'>
                       <FontAwesomeIcon icon={faEye} className='icon'></FontAwesomeIcon>
                  </Link>
                </div>

              </div>
                )}


          </div>

    }

    <div className="errors-div">
        {loader && <div className='loader'><Loader/></div>}
        {error && <p>Failed to load products</p>}
        {emptyProducts && <p>No products</p>}
    </div>


  
    </>

  )
}

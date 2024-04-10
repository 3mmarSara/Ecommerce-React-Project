import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductStyle.css';
import Loader from '../../../components/Loader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faStar, faMinus , faPlus, faCartShopping, faUser} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../contexts/User";
import { toast } from 'react-toastify';

export default function Product() {

  const navigate = useNavigate();
  const { userToken } = useContext(UserContext);

  const [product,setProduct] = useState([]);
  const [rating,setRating] = useState(0);
  const [count, setCount] = useState(1);
  const [loader,setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const {id} = useParams('id');
  const [addingtoCart, setAddingToCart] = useState(false);
  const [reviewTxt, setReviewTxt]= useState('');
  const [userRating, setUserRating]= useState(0);
  const [addingReview,setaddingReview] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  let hasBoughtProduct = false;

  const getProduct = async ()=>{
    try{
      const {data} = await axios.get(`${import.meta.env.VITE_API}/products/${id}`);
      setProduct(data.product);
      setRating(data.avgRating);
      setSelectedImage(data.product.mainImage.secure_url)
      setLoader(false);
      setError(false);
    }catch(error){
      setLoader(false);
      setError(true);
    }

  };

  useEffect(()=>{
      getProduct();
  },[]);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };


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

  const handleReviewTxtchange = (e) =>{
    const { value} = e.target;
    setReviewTxt(value);
  };

  const handleRatingchange = (rating) =>{
    setUserRating(rating);
  };

  const getUserOrders = async ()=>{
       if (userToken) {
        try{
          const {data} = await axios.get(`${import.meta.env.VITE_API}/order`, {
            headers: {
              Authorization: 'Tariq__' + userToken
            }
          });
          setUserOrders(data.orders);

          hasBoughtProduct = userOrders.some(order =>
            order.products.some(product => product.productId === product._id)
          );

        }catch(error){
        }
    }

  };

  useEffect(() => {
      getUserOrders();
  }, [userToken]);


  const handelAddReview = async() =>{

   if(reviewTxt != ''){
     try{
      const {data} = await axios.post(`${import.meta.env.VITE_API}/products/${product._id}/review`,{
        comment: reviewTxt,
        rating: userRating,
      } ,{
        headers: {
          Authorization: 'Tariq__' + userToken
        }
      });

    }catch(error){
    }
  }
   
  };


  return (
    <>

    <div className='product-section'>
      
     {!loader && !error && 

              <div className='product-container'>
              
              <div className="images-container">
                  <div className='sub-images-container'>

                    {product.subImages.map((image, index) => (
                      <img
                        key={index}
                        src={image.secure_url}
                        alt={`Product ${index}`}
                        className='sub-image'
                        onClick={() => handleClick(image.secure_url)}
                      />
                    ))}

                      <img
                        src={product.mainImage.secure_url}
                        className='sub-image'
                        onClick={() => handleClick(product.mainImage.secure_url)}
                      />
                    
                  </div>

                <img src={selectedImage} alt="Main Product" className='selected-image' />

              </div>
              <div className='product-details'>
                <div className="name">{product.name}</div>

                <div className="star-rating">
                  {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon icon={faStar}
                      key={index}
                      className={index < rating ? "star-filled" : "star-empty"}                  
                      />
                    
                  ))}
                </div>

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

                <div className="description">
                  {product.description}
                </div>

                <div className="line"></div>

                <div className='buy-div'>
                  <div className="counter">
                      <button className='dec' onClick={decreaseCount}><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></button>
                      <span className='count'>{count}</span>
                      <button className='inc' onClick={increaseCount}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button>
                  </div>
                  <button onClick={() => addToCart(product._id)} disabled={addingtoCart} className='buy-btn'><FontAwesomeIcon className="icon" icon={faCartShopping}></FontAwesomeIcon>{addingtoCart ? 'Adding...' : 'Add to cart'} </button>

                  <div className="heart-icon">
                  <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                  </div>
                  
                </div>


              </div>

              </div>
                        
     }



    {loader && <div className='loader'><Loader/></div>}
    {error && <p>Failed to load product details</p>}

    </div>

          <div className="reviews-section">



          {!loader && !error && 
<>
              <div className="reviews">
              <div className="reviews-header">
                Reviews
              </div>
              {product.reviews.map((review, index) => (
                      <div className="review" key={index}>
                          <div className="review-header">
                                <div className="image-name">
                                    <FontAwesomeIcon icon={faUser} className='icon'></FontAwesomeIcon>
                                    <div className="name-date">
                                      <div className="name">
                                      {review.createdBy.userName}
                                      </div>
                                      <span>{review.createdAt.substring(0, 10)}</span>
                                    </div>
                                </div>

                      

                                <div className="star-rating">
                                      {[...Array(5)].map((_, index) => (
                                        <FontAwesomeIcon icon={faStar}
                                          key={index}
                                          className={index < review.rating ? "star-filled" : "star-empty"}                  
                                          />
                                        
                                      ))}
                                </div>


                          </div>
                          <div className="line"></div>
                          <p className='comment'>{review.comment}</p>
                      </div>
              ))}


     
              </div>
              { userToken &&
                   <div className="add-review">
                   <div className='reviews-header'>Write Review</div>
                   <textarea id="message" name="reviewTxt" rows="4" cols="20" className="review-txt" value={reviewTxt} onChange={handleReviewTxtchange} ></textarea>
   
                   <div className="add-rating">
                         {[...Array(5)].map((_, index) => (
                             <FontAwesomeIcon icon={faStar}
                               key={index}
                               className= {index < userRating ? "star-filled" : "star-empty"} 
                               onClick={()=>handleRatingchange(index+1)}              
                               />
                                                 
                         ))}
                   </div>
   
                   <button disabled={!hasBoughtProduct} onClick={handelAddReview}>Add review</button>
   
                 </div>

              }
           
          </>
          }
       
     </div>
   
      
      
     </>
  )
}


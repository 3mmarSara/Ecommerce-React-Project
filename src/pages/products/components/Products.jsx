import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './allProducts.css';
import Loader from '../../../components/Loader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart ,faEye} from "@fortawesome/free-regular-svg-icons";
import { faStar, faCartShopping} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../contexts/User";
import { toast } from 'react-toastify';

export default function Products() {

  const navigate = useNavigate();
  const { userToken } = useContext(UserContext);


  const [products, setProducts] = useState([]);
  const [page, setPageNumber] =useState(1);
  const limit = 5;
  const [loader,setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [totalProducts, setTotal] =useState(0);
  const [classificationParameters, setclassificationParameters] = useState({
    sortBy: "",
    minPrice: 0,   
    maxPrice: Infinity,
    searchText: "",
  });
  const [addingtoCart, setAddingToCart] = useState(false);


  useEffect(() => {
    fetchProducts();
  }, [page, classificationParameters]); 

  const fetchProducts = async () => {

      try{
        const {data} = await axios.get(`${import.meta.env.VITE_API}/products?page=${page}&limit=${limit}&search=${classificationParameters.searchText}&sort=${classificationParameters.sortBy}&price[gte]=${classificationParameters.minPrice}&price[lte]=${classificationParameters.maxPrice}`);
        setProducts(data.products);
        setTotal(data.total);
        setLoader(false);
        setError(false);
      }catch(error){
        setLoader(false);
        setError(true);
      }
  };


  const goToPreviousPage = () => {
    const prevPage = Math.max(Number(page) - 1, 1);
    setPageNumber(prevPage);
  };

  const goToNextPage = () => {
    const nextPage = Number(page) + 1;
    setPageNumber(nextPage);
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(Number(totalProducts) / limit);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => setPageNumber(i)} className={page === i ? "page-btn selected-page" : "page-btn"}>
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

    const handelClassParaChanges = (e) =>{
            const {name, value} = e.target;
            if(name === "maxPrice" && value===""){
              setclassificationParameters({...classificationParameters, [name]:Infinity});
             
            }
            else if(name === "minPrice" && value===""){
              setclassificationParameters({...classificationParameters, [name]:0});
             
            }else{
              setclassificationParameters({...classificationParameters, [name]:value});
            }
            
             
  };

  const resetClassParams= ()=>{
    setclassificationParameters({sortBy: "",
    minPrice: 0,   
    maxPrice: Infinity,
    searchText: "",
  });
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


  return (

    <>

          <div className='category-header'>
            <h2>Discover Our <span>Latest Products</span></h2>
          </div>

          <div className="filters">
            <div className="filters-container">
              <div className="sort-by">
                  
                  <label >Sort by:</label>

                  <select name="sortBy" id="sortBy" className='sortBy' value={classificationParameters.sortBy} onChange={handelClassParaChanges}>
                      <option value=" ">Default</option>
                      <option value="name">Name</option>
                      <option value="-name">-Name</option>
                      <option value="price">Price</option>
                      <option value="-price">-Price</option>
                  </select>

                      
                  </div>
                  <div className="sort-price">
                      <input type="number" placeholder='Min Price' name='minPrice' value={classificationParameters.minPrice > 0? classificationParameters.minPrice: ""} onChange={handelClassParaChanges} min="0"/>
                      <input type="number" placeholder='Max Price' name="maxPrice" value={classificationParameters.maxPrice == Infinity? "" : classificationParameters.maxPrice} onChange={handelClassParaChanges} min="0"/>
                  </div>
                  <input className='search-input' type="search" name='searchText' placeholder='Search for product...' value={classificationParameters.searchText} onChange={handelClassParaChanges}/>
                  <button className='reset-btn' onClick={resetClassParams}>Reset Filters</button>
                  </div>
          </div>

      {  !loader && !error &&
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
    </div>

      <div className='page-control-btns'>
          <button className='next-btn' onClick={goToPreviousPage} disabled={page <= 1}>
            Previous
          </button>
          {renderPageNumbers()}
          <button className='prev-btn' onClick={goToNextPage} disabled={products.length < limit}>
            Next
          </button>
      </div>


      
    </>
  )
}

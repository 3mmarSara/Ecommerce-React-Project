import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './SwiperStyle.css'
import Loader from '../../../components/Loader';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';


import 'swiper/css/navigation';
import 'swiper/css/pagination';


export default function Categories() {

  const [categories,setCategories] = useState([]);
  const [loader,setLoader] = useState(true);
  const [error, setError] = useState(false);

  const getCategories = async ()=>{
    try{
      const {data} = await axios.get(`${import.meta.env.VITE_API}/categories/active?limit=10`);
      console.log(data.categories);
      setCategories(data.categories);
      setLoader(false);
      setError(false);
    }catch(error){
      setLoader(false);
      setError(true);
    }

  };

  useEffect(()=>{
    getCategories();
  },[]);

  return (
    
    <section className='categories-section'>

          <div className='categories-header'>
            <h2>Shop From <span>Categories</span></h2>
          </div>

          <Swiper
            modules={[Navigation, Pagination, A11y]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={5}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {error && <p>Failed to load categories</p>}
            {loader && <div className='loader'><Loader/></div>}
            {categories.map( category=>
            <SwiperSlide key={category._id} className="swiperSlide">
              <img src={category.image.secure_url} alt="category" />
            </SwiperSlide>
          )}
          </Swiper>

    </section>

  )
}

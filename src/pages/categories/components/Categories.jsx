import React, { useEffect, useState} from 'react'
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './SwiperStyle.css'
import Loader from '../../../components/Loader';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link, NavLink } from 'react-router-dom';

export default function Categories() {

  const [categories,setCategories] = useState([]);
  const [loader,setLoader] = useState(true);
  const [error, setError] = useState(false);

  const getCategories = async ()=>{
    try{
      const {data} = await axios.get(`${import.meta.env.VITE_API}/categories/active?limit=10`);
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


    const [swiperConfig, setSwiperConfig] = useState({
      spaceBetween: 20,
      slidesPerView: 5
  });

  useEffect(() => {
      const handleResize = () => {
          if (window.innerWidth >= 1100 && window.innerWidth <= 1440) {
              setSwiperConfig({
                  spaceBetween: 10,
                  slidesPerView: 4
              });
          }
           else if (window.innerWidth >= 800 && window.innerWidth <= 1100) {
              setSwiperConfig({
                  spaceBetween: 20,
                  slidesPerView: 3
              });
          }
          else if (window.innerWidth >= 600 && window.innerWidth < 800) {
            setSwiperConfig({
                spaceBetween: 20,
                slidesPerView: 2
            });
        }
        else if (window.innerWidth < 600) {
          setSwiperConfig({
              spaceBetween: 20,
              slidesPerView: 1
          });
      } 
         else {
              setSwiperConfig({
                  spaceBetween: 30,
                  slidesPerView: 5
              });
          }
      };

      handleResize();

      window.addEventListener('resize', handleResize);

      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []);

  const { spaceBetween, slidesPerView } = swiperConfig;



  return (
    
    <section className='categories-section'>

          <div className='categories-header'>
            <h2>Shop From <span>Top Categories</span></h2>
          </div>

          <Swiper
            modules={[Navigation, Pagination, A11y]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
          >
            {error && <p>Failed to load categories</p>}
            {loader && <div className='loader'><Loader/></div>}
            {categories.map( category=>
            <SwiperSlide key={category._id} className="swiperSlide">
              <Link to={`/categories/${category._id}`}>
                  <img src={category.image.secure_url} alt="category" />
              </Link>
            </SwiperSlide>
          )}
          </Swiper>

    </section>

  )
}

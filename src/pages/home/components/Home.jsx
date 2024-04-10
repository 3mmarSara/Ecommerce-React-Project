import React from 'react'
import Categories from '../../categories/components/Categories'
import './Home.css'

export default function Home() {
  return (<>
  <header className='header'> 
     <img className='header-img' src="../../header.PNG" alt="" />
</header>
    <Categories/>
  </>
    
  )
}

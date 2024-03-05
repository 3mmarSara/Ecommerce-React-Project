import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

export default function Loader() {
  return (

    <ThreeDots
        visible={true}
        height="100"
        width="100"
        color="#008ECC"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
    />
   
  )
}

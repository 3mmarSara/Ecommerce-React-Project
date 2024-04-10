import React from 'react'
import { Navigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from './contexts/User';

export default function ProtectedRoutes({children}) {

    const { userToken } = useContext(UserContext);

    if(!userToken){
        return <Navigate to='/signin' replace/>
    }
  
  return children;
}

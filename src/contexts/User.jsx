import { createContext, useEffect, useState} from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

const UserContextProvider = ({children}) =>{

    const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
    const [auth, setAuth] =useState([]);

    const getUserData =()=>{
        if(userToken != null){
            const decodedToken = jwtDecode(userToken);
            setAuth(decodedToken);
        }
    };

    useEffect(() =>{
        getUserData();
    },[userToken])

    return <UserContext.Provider value={{auth, setAuth, userToken, setUserToken}}>
            {children}
    </UserContext.Provider>
     
};

export default UserContextProvider;
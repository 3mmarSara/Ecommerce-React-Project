import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Home from "./pages/home/components/Home";
import Products from "./pages/products/components/Products";
import Categories from "./pages/categories/components/Categories";
import Signin from "./pages/signin/components/Signin";
import Signup from "./pages/signup/components/Signup";
import Cart from "./pages/cart/components/Cart";
import Product from "./pages/product/components/Product";
import NotFound from "./components/NotFound";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContextProvider from "./contexts/User";
import CategoryProduct from "./pages/categoryproduct/components/CategoryProduct";
import Billing from "./pages/Billing/components/Billing";
import Profile from "./pages/Profile/components/Profile";
import Info from "./pages/Profile/components/Info";
import Orders from "./pages/Profile/components/Orders";
import SendCode from "./pages/SendCode/components/SendCode";
import ResetPassword from "./pages/ResetPassword/components/ResetPassword";
import ProtectedRoutes from "./ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element:<ProtectedRoutes> <Cart /></ProtectedRoutes> ,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "categories/:id",
        element: <CategoryProduct />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element:<Product/>,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/sendcode",
        element: <SendCode />,
      },
      {
        path: "/resetpassword",
        element: <ResetPassword />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profile",
        element: <ProtectedRoutes><Profile /></ProtectedRoutes> ,
        children: [
          { path: "info", element:<ProtectedRoutes><Info /> </ProtectedRoutes> },
          { path: "orders", element:<ProtectedRoutes><Orders /></ProtectedRoutes> },
        ],
      },
      {
        path: "/bill",
        element:<ProtectedRoutes><Billing /></ProtectedRoutes>,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);


export default function App() {
  return (
    <>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
    
    <ToastContainer />
    </>
  
  );
}

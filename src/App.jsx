import React, { useEffect, useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'

import UserContext from './contexts/UserContext.js'
import HomePage from './components/Home/HomePage.jsx'
import './App.css'
import Routing from './components/Routing/Routing.jsx'
import Navbar from "./components/Navbar/Navbar.jsx"
import Footer from './components/Home/Footer.jsx';
 import {getJwt, getUser} from "./Service/userService.js"
import setAuthToken from './utils/setAuthToken.js'
import { addToCartAPI, getCartAPI , removeFromCartAPI} from './Service/cartServices.js';
import 'react-toastify/dist/ReactToastify.css';
import CartContext from './contexts/CartContext.js'
setAuthToken(getJwt());
function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([])
  useEffect(() => {
    try{
      const jwtUser=getUser();
  if(Date.now()>= jwtUser.exp*1000){
    localStorage.removeItem("token");
    location.reload()
  }
  else{
    setUser(jwtUser)
  }
 
    }
    catch(err){

    }
   
  }, [])
  const addToCart= (product, quantity)=>{
const updatedCart= [...cart]
const productIndex=updatedCart.findIndex(item => item.product._id==product._id);
if(productIndex ===-1){
  updatedCart.push({product:product, quantity:quantity});
}
else{
  updatedCart[productIndex].quantity+=quantity;
}
setCart(updatedCart);
addToCartAPI(product._id, quantity).then(res =>{
  toast.success("Product Added Successfully");
}).catch(err =>{
  toast.error("Failed to add product");
  setCart(cart)
})
  }
  const removeFromCart= id =>{
    const oldCart=[...cart]
   const newCart= oldCart.filter(item => item.product._id!==id);
   setCart(newCart);
   removeFromCartAPI(id).catch(err=>{
    toast.error("Something went wrong");
    setCart(oldCart);
   })
  };
  const updateCart =(type, id) =>{
    const updatedCart=[...cart]
   const productIndex= updatedCart.findIndex(item => item.product._id===id);
   if(type==="increase")
   {
    updatedCart[productIndex].quantity+=1;
    setCart(updatedCart)
   }
   if(type==="decrease")
    {
     updatedCart[productIndex].quantity-=1;
     setCart(updatedCart)
    }
   
 
  }
  const getCart=()=>{
    getCartAPI().then(res =>{
      setCart(res.data);
    }).catch(err =>{
      toast.error("SOmething went wrong!")
    })
  
  };
  useEffect(() => {
   if(user){
    getCart()
   }
  }, [user])
  
  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider  value={{cart, addToCart, removeFromCart, updateCart,setCart}}>
    <div className='app'>
   <Navbar />
     <main>
     <ToastContainer/>
      {/* <ProductsPage/> */}
      {/* <SingleProductPage/> */}
      {/* <CartPage/> */}
      {/* <MyOrder/> */}
      {/* <LoginForm/> */}
    <Routing />
     </main>
    </div>
    </CartContext.Provider>
    </UserContext.Provider>
  )
}

export default App

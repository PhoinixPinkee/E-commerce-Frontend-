import React from 'react'
import { useContext } from 'react';
import {Routes, Route} from "react-router-dom"
import ProductsPage from '../Products/ProductsPage.jsx'
import SingleProductPage from '../SingleProduct/SingleProductPage.jsx'
import CartPage from '../Cart/CartPage.jsx'
import MyOrder from '../MyOrder/MyOrder.jsx'
import UserContext from '../../contexts/UserContext.js'
import LoginForm from '../Authentication/LoginForm.jsx'
import SignUpfrom from '../Authentication/SignupPage.jsx'
import HomePage from '../Home/HomePage'
import SignupPage from '../Authentication/SignupPage'
import Logout from '../Authentication/Logout.js'
import ProtectedRoute from './ProtectedRoute.jsx';
const Routing = () => {

  return (
    <Routes>
<Route path='/' element={<HomePage/>}/>
<Route path='/products' element={<ProductsPage/>}/>
<Route path='/product/:id' element={<SingleProductPage />}/>
<Route path='/signup' element={<SignUpfrom/>}/>
<Route path='/login' element={<LoginForm/>}/>
<Route element={<ProtectedRoute/>}>
<Route path='/cart' element={<CartPage />}/>
<Route path='/myorders' element={<MyOrder/>}/>
<Route path='/logout' element={<Logout/>}/>
</Route>

    </Routes>
  )
}

export default Routing

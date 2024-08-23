import React, { useEffect, useState , useContext} from 'react';
import  UserContext  from "../../contexts/UserContext"
import './CartPage.css'
import user from "../../assets/user.webp"
import Table from '../Common/Table'
import QuantityInput from '../SingleProduct/QuantityInput'
import remove from '../../assets/remove.png'
import CartContext from '../../contexts/CartContext';
import { checkoutAPI } from '../../Service/OrderServices';
import { toast } from 'react-toastify';

const CartPage = () => {
 const [Subtotal, setSubtotal] = useState(0);
 const user=useContext(UserContext);
 const {cart, removeFromCart, updateCart,setCart}=useContext(CartContext)
 useEffect(() => {
   let total=0;
   cart.forEach(item =>{
    total+= item.product.price* item.quantity
   })
   setSubtotal(total)
 }, [cart])
 
  const checkout =()=>{
    const oldCart=[...cart];
    setCart([])
    checkoutAPI().then(()=>{
      toast.success("Order Placed Successfully!");
     
    }).catch(()=>{
      toast.error("Something went wrong");
      setCart(oldCart);
    })
  }
  return (
    <section className="align_center cart_page">
        <div className="align_center user_info">
            <img src={`http://localhost:5000/profile/${user?.profilePic}`} alt="user profile" />
      <div> 
  <p className="user_name">Name:{user?.name}</p>
   <p className="user_email">Email:{user?.email}</p></div></div>
   <Table headings={["Item", "price","Quantity", "Total", "Remove"]}>
    <tbody>
      {cart.map(({product, quantity}) =><tr key={product._id}>
        <td>{product.title}</td>
        <td>${product.price}</td>
        <td className=' align_center table_quantity_input'><QuantityInput quantity={quantity}  stock={product.stock} setQuantity={updateCart}
        CartPage={true} productId={product._id}/></td>
        <td>${quantity*product.price}</td>
        <td><img src={remove} alt='remove_icon' className='cart_remove_icon'
        onClick={()=>removeFromCart(product._id)}/>
        </td>
      </tr>)}
      
    </tbody>
   </Table>
<table className="cart_bill">
  <tbody>
    <tr>
      <td>Subtotal</td>
      <td>${Subtotal}</td>
    </tr>
    <tr>
      <td>Shipping Charge</td>
      <td>$5</td>
    </tr>
    <tr>
      <td>Total</td>
      <td>${Subtotal+5}</td>
    </tr>
  </tbody>
</table>
   <button className="search_button checkout_button" onClick={checkout}> Checkout</button>
    </section>
  )
}

export default CartPage

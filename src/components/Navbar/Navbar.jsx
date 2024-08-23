import React, { useEffect, useState } from 'react'
import './Navbar.css'
import home from '../../assets/home.png';
import star from '../../assets/products.png';
import idButton from '../../assets/id-button.png';
import memo from '../../assets/memo.png';
import order from '../../assets/package.png';
import lock from '../../assets/locked.png';

import './LinkWithicon.jsx'
import LinkWithicon from './LinkWithicon.jsx'
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext.js';
import CartContext from '../../contexts/CartContext.js';
import { getSuggestionsAPI } from '../../Service/productServices.js';
function Navbar() {
    const [search,setSearch]=useState("");
    const [suggestions, setSuggestions] = useState([])
  const [selectedItem, setSelectedItem] = useState(-1)
    const navigate=useNavigate();
   const user= useContext(UserContext);
   const {cart}=useContext(CartContext);
   const handleSubmit=(e)=>{
    e.preventDefault();
    if(search.trim()!==""){
                 navigate(`/products?search=${search.trim()}`);
    }
    setSuggestions([])
   };
   const handleKeyDown=(e)=>{
    if(selectedItem<suggestions.length)
    {
        if(e.key==="ArrowDown"){
            setSelectedItem(current=>current=== suggestions.length-1?0:current+1)
          }
          else if(e.key==="ArrowUp")
          {
            setSelectedItem(current=>current=== 0?suggestions.length-1:current-1)
          }
          else if(e.key==="Enter" && selectedItem>-1){
            const suggestion=suggestions[selectedItem]
            navigate(`/products?search=${suggestion.title}`);
            setSearch("");
            setSuggestions([])
          }
    }else{
        selectedItem(-1);
    }
                 
   }
   useEffect(() => {
    const delaySuggestions=setTimeout(()=>{
        if(search.trim()!==""){
            getSuggestionsAPI(search).then(res=>setSuggestions(res.data)).catch(error => console.log(error));
      }
      else{
          setSuggestions([])
      }
    },300)
    return (()=>clearTimeout(delaySuggestions))
   
   }, [search])
   
  return (
  
        <nav className=' align_center navbar'>
            <div className='align_center'>
                <h1 className='navbar_heading'>favCart</h1>
                <form action="" className=' align_center navbar_form' onSubmit={handleSubmit}>
                    <input type="text"  className='navbar_search' placeholder='Search Products' value={search} onChange={(e)=>setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}/>
                    <button type='submit' className='search_button'>Search</button>
                    {suggestions.length>0 &&<ul className="search_result">
                        {suggestions.map((suggestion,index)=> 
                             <li className={ selectedItem===index ?"search_suggestion_link active":'search_suggestion_link'} key={suggestion._id}>
                        <Link to={`/products?search=${suggestion.title}`} onClick={()=>{
                            setSearch("")
                            setSuggestions([])
                        }}>{suggestion.title}</Link></li>
                        )}
                       </ul>}
                </form>
            </div>
            <div className=' align_center navbar_links'>
               <LinkWithicon title="Home" emogi={home} link="/"/>
               <LinkWithicon title="Products" emogi={star} link="/products"/>
              { !user && <><LinkWithicon title="LogIn" emogi={idButton} link="/login"/>
               <LinkWithicon title="SignUp" emogi={memo} link="/signup"/></>}
              { user && <><LinkWithicon title="MyOrders" emogi={order} link="/myorders"/>
               <LinkWithicon title="Logout" emogi={lock} link="/logout"/>
               <NavLink to="/cart" className='align_center '>
               Cart <p className='align_center cart_counts'>{cart.length}</p></NavLink></>}
            </div>
        </nav> 
  
  )
}

export default Navbar

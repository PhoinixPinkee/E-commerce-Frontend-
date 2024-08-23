import React, { useEffect, useState } from 'react'
import './ProductsSidebar.css'


import LinkWithicon from '../Navbar/LinkWithicon'
import Usedata from '../../Hooks/Usedata'

const ProductsSidebar = () => {
 const {data:categories, error}= Usedata("/category")

  return (
    <aside className="products_sidebar">
      <h2>Category</h2>
      <div className="category_links">
         {error && <em className='form_error'>{error}</em>}
        { categories && categories.map(category => 
           <LinkWithicon  
           key={category._id}
           id={category._id}
           title={category.name} link={`/products?category=${category.name}`}  emogi={`http://localhost:5000/category/${category.image}`} sidebar={true} />
        )}
       
      </div>
    </aside>
  )
}

export default ProductsSidebar

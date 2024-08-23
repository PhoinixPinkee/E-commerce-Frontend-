import React from 'react'
import './ProductsPage.css'
import ProductsSidebar from './ProductsSidebar'
import ProductsList from './ProductsList'
const ProductPage = () => {
  return (
    <section className="products_page">
      <ProductsSidebar/>
     <ProductsList/>
     
    </section>
  )
}

export default ProductPage

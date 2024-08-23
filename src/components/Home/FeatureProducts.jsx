import React from 'react'
import './FeatureProducts.css'
import ProductCard from '../Products/ProductCard'
import Usedata from '../../Hooks/Usedata'
import ProductCardScalaton from '../Products/ProductCardScalaton'
const FeatureProducts = () => {
  const {data,error,isLoading}= Usedata("/products/featured")
  const  skeleton=[1,2,3]
  return (
    <section className="feature_products">
        <h2>Featured Products</h2>
        <div className=" align_center featured_products_list">
        {error && <em className='form_error'>{error}</em>}
        { data && data.map(product =><ProductCard key={product._id}  product={product}/>)}
        {isLoading && skeleton.map(n=><ProductCardScalaton key={n}/>)}
     
        </div>

    </section>
  )
}

export default FeatureProducts

import React from 'react'
import HeroSection from './HeroSection'
import './HeroSection.css'
import iphone from "../../assets/iphone-14-pro.webp";
import mac from '../../assets/mac-system-cut.jfif'
import FeatureProducts from './FeatureProducts';
const HomePage = () => {
  return (
    <div>
      {/* hero section */}
      <HeroSection  title='Iphone 14 pro' subtitle='Experience the power of the latest iPhone 14 with our most Pro camera ever' link='/product/66ac8735aeb8177e08ab6327' image={iphone}/>
      {/* add products feature section */}
      <FeatureProducts/>
      <HeroSection  title='Build the ultimate setup' subtitle='You can add Studio Display and colour-matched Magic accessories to your bag after configure your Mac mini' link='/product/66ac8735aeb8177e08ab632f' image={mac}/>
      </div>
  )
}

export default HomePage

import React from 'react'
import "./HomePage.css"

import LayoutProduct from './container/layout-service-dog/LayoutProduct';
import LayoutServices from './container/layout-service-cat/LayoutServices';
import ImgSlider from '../../custom/img-slider/ImgSlider';

export default function HomePage() {
  return (
    <div className='home-page'>
      <div className='container-home'>
        <ImgSlider />
        <LayoutProduct />
        <LayoutServices />
      </div>
    </div>
  )
}

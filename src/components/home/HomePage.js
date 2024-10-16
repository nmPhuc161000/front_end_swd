import React from 'react'
import "./HomePage.css"

import LayoutProduct from './container/layout-product/LayoutProduct';
import LayoutServices from './container/layout-services/LayoutServices';

export default function HomePage() {
  return (
    <div className='home-page'>
      <div className='container-home'>
        <LayoutProduct />
        <LayoutServices />
      </div>
    </div>
  )
}

import React from 'react'
import "./HomePage.css"

import LayoutProduct from './container/layout-product/LayoutProduct';

export default function HomePage() {
  return (
    <div className='home-page'>
      <div className='container-home'>
        <LayoutProduct />
      </div>
    </div>
  )
}

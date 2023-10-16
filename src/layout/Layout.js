import React from 'react'
import './Layout.css'
import { Link } from "react-router-dom"
const Layout = () => {
  return (
    <div className="layout-container">
      <Link to="/emicalculator" className='link' ><div className='emi-page'>EMI calculator</div></Link>
      <Link to="/videogallery" className='link' ><div className='gallery-page'>Video gallery</div></Link>
      <Link to="/shoppingCart" className='link' ><div className='gallery-page'>Shopping Cart</div></Link>
    </div>
  )
}

export default Layout

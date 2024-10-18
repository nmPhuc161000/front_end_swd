import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav className='NavbarItems'>
        <div className='search-bar'>
          <input type='text' placeholder='Search for pets, services...' />
          <button className='search-button'>
            <i className='material-icons'>search</i>
          </button>
        </div>
        <h1 className='navbar-logo'>
          <i className='material-icons'>pets</i> Animal Haven
        </h1>
        <ul className='nav-menu'>
          <li>
            <Link to='/' className='nav-links'>
              <i className='material-icons'>home</i> Home
            </Link>
          </li>
          <li>
            <Link to='/services' className='nav-links'>
              <i className='material-icons'>nature_people</i> Services
            </Link>
          </li>
          <li>
            <Link to='/products' className='nav-links'>
              <i className='material-icons'>storefront</i> Products
            </Link>
          </li>
          <li>
            <Link to='/auth-page' className='nav-links'>
              <i className='material-icons'>person_add</i> Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;

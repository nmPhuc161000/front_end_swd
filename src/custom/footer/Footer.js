import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='FooterItems'>
      <div className='footer-content'>
        <div className='footer-logo'>
          <i className='material-icons'>pets</i> Animal Haven
        </div>
        <div className='social-media'>
          <a href='#' className='social-link'>
            <i className='material-icons'>facebook</i>
          </a>
          <a href='#' className='social-link'>
            <i className='material-icons'>instagram</i>
          </a>
          <a href='#' className='social-link'>
            <i className='material-icons'>twitter</i>
          </a>
        </div>
        <div className='footer-text'>
          <p>Contact us: team4@animalhaven.com</p>
          <p>&copy; 2024 Animal Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

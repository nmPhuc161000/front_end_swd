import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4 className="footer-heading">About Us</h4>
          <p className="footer-text">
            We are committed to providing the best services and solutions to our customers. Our team is dedicated to innovation and excellence.
          </p>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-list">
            <li><a href="/" className="footer-link">Home</a></li>
            <li><a href="/about" className="footer-link">About</a></li>
            <li><a href="/services" className="footer-link">Services</a></li>
            <li><a href="/contact" className="footer-link">Contact</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Contact Us</h4>
          <p className="footer-text">Email: info@example.com</p>
          <p className="footer-text">Phone: (123) 456-7890</p>
        </div>
      </div>
      
      <div className="footer-bottom-bar">
        <p className="footer-copy-text">&copy; {new Date().getFullYear()} MyCompany. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

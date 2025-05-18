import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/logo.css';
import logo from '../assets/logo.png';

const Logo = ({ size }) => {
  // Maintain a perfect 1:1 aspect ratio for the circular logo
  const containerStyle = size ? {
    width: `${size}px`,
    height:`${size}px`
  } : {};

  return (
    <Link to="/" className="no-underline">
      <div className="logo-container" style={containerStyle}>
       
        <img 
          src={logo} 
          alt="Argan logo icon" 
          className="max-w-fill max-h-fill" 
        />
      </div>
    </Link>
  );
};

export default Logo;
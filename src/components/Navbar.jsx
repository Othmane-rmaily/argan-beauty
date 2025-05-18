import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  // Handle scroll event
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 dark:bg-darkCard/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Logo size={40} />
            <span className="ml-2 text-xl font-serif font-medium text-dark dark:text-darkText hover:text-primary transition-colors duration-300">Argan Beauty</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${isScrolled ? 'text-dark dark:text-darkText' : 'text-dark/90 dark:text-light'} hover:text-primary transition-colors duration-300`}>Home</Link>
            <Link to="/products" className={`${isScrolled ? 'text-dark dark:text-darkText' : 'text-dark/90 dark:text-light'} hover:text-primary transition-colors duration-300`}>Products</Link>
            <Link to="/about" className={`${isScrolled ? 'text-dark dark:text-darkText' : 'text-dark/90 dark:text-light'} hover:text-primary transition-colors duration-300`}>About</Link>
            <Link to="/contact" className={`${isScrolled ? 'text-dark dark:text-darkText' : 'text-dark/90 dark:text-light'} hover:text-primary transition-colors duration-300`}>Contact</Link>
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-dark dark:text-darkText" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            
            {/* User Authentication */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center text-dark dark:text-darkText hover:text-primary transition-colors">
                  <span className="mr-1">{user.name}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-darkCard rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-darkText hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-dark dark:text-darkText hover:text-primary transition-colors">Login</Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            
            <Link to="/cart" className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-dark dark:text-darkText" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            
            <button onClick={toggleMenu} className="text-dark dark:text-darkText">
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-dark dark:text-darkText hover:text-primary transition-colors" onClick={toggleMenu}>Home</Link>
              <Link to="/products" className="text-dark dark:text-darkText hover:text-primary transition-colors" onClick={toggleMenu}>Products</Link>
              <Link to="/about" className="text-dark dark:text-darkText hover:text-primary transition-colors" onClick={toggleMenu}>About</Link>
              <Link to="/contact" className="text-dark dark:text-darkText hover:text-primary transition-colors" onClick={toggleMenu}>Contact</Link>
              
              {user ? (
                <button 
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="text-left text-dark dark:text-darkText hover:text-primary transition-colors"
                >
                  Logout ({user.name})
                </button>
              ) : (
                <Link to="/login" className="text-dark dark:text-darkText hover:text-primary transition-colors" onClick={toggleMenu}>Login</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
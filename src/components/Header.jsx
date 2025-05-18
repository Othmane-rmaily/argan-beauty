import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X, ShoppingCart, Search, Sun, Moon } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { scrollY } = useScroll();
  const [headerBg, setHeaderBg] = useState(false);

  // Smooth scroll-based header background
  const scrollYProgress = useSpring(scrollY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setHeaderBg(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Navigation links
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        headerBg
          ? 'bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl shadow-xl'
          : 'bg-transparent'
      } border-b border-white/10`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <motion.span
            className="text-2xl font-extrabold tracking-tight text-primary dark:text-primary-light"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Argan Beauty
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? 'text-primary dark:text-primary-light'
                    : 'text-dark dark:text-white hover:text-primary dark:hover:text-primary-light'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Section: Search, Cart, Dark Mode, Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <motion.div
            className="relative"
            initial={{ width: 0 }}
            animate={{ width: isSearchOpen ? 200 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="text"
              placeholder="Search products..."
              className={`w-full bg-white/20 dark:bg-gray-800/20 text-dark dark:text-white rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary ${
                isSearchOpen ? 'block' : 'hidden'
              }`}
            />
          </motion.div>
          <button
            onClick={toggleSearch}
            className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-gray-800/10 transition-colors duration-300"
            aria-label="Toggle search"
          >
            <Search className="w-5 h-5 text-dark dark:text-white" />
          </button>

          {/* Cart */}
          <Link to="/cart" className="relative group">
            <ShoppingCart className="w-6 h-6 text-dark dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300" />
            <span className="absolute -top-2 -right-2 bg-primary dark:bg-primary-light text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-gray-800/10 transition-colors duration-300"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-white" />
            ) : (
              <Moon className="w-5 h-5 text-dark" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-white/10 dark:hover:bg-gray-800/10 transition-colors duration-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-dark dark:text-white" />
            ) : (
              <Menu className="w-6 h-6 text-dark dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.nav
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border-t border-white/10`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <ul className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-300 ${
                  isActive
                    ? 'text-primary dark:text-primary-light'
                    : 'text-dark dark:text-white hover:text-primary dark:hover:text-primary-light'
                }`
              }
              onClick={toggleMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </ul>
      </motion.nav>
    </motion.header>
  );
};

export default Header;
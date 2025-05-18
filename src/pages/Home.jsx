import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Parallax } from 'react-parallax';
import ProductCard from '../components/ProductCard';
import heroImage from '../assets/hero-background.jpg';
import zellijPattern from '../assets/zellij-pattern.png';
import ProductService from '../services/product';

// Import custom fonts
import '@fontsource/montserrat';
import '@fontsource/poppins';


const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // References for scroll animations
  const featuredRef = useRef(null);
  const aboutRef = useRef(null);
  const testimonialsRef = useRef(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getAllProducts();
        // Ensure data is an array
        const productsArray = Array.isArray(data) ? data : [];
        
        // Get 3 random products for the featured section
        const randomProducts = getRandomProducts(productsArray, 3);
        setFeaturedProducts(randomProducts);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
        // Initialize with empty arrays to prevent map errors
        setFeaturedProducts([]);
      }
    };
  
    fetchProducts();
  }, []);

  // Function to get random products from the array
  const getRandomProducts = (products, count) => {
    // Make a copy of the array to avoid modifying the original
    const productsCopy = [...products];
    
    // If we have fewer products than requested, return all of them
    if (productsCopy.length <= count) {
      return productsCopy;
    }
    
    // Shuffle the array using Fisher-Yates algorithm
    for (let i = productsCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [productsCopy[i], productsCopy[j]] = [productsCopy[j], productsCopy[i]];
    }
    
    // Return the first 'count' products
    return productsCopy.slice(0, count);
  };

  return (
    <div className="font-sans">

      
      {/* Hero Section with Parallax */}
      <Parallax
        bgImage={heroImage}
        strength={500}
        className="h-screen"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dark/70 to-dark/50"></div>
        <div className="h-screen flex items-center justify-center">
          <motion.div 
            className="relative z-10 text-center px-4 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Discover Moroccan <span className="text-primary">Beauty</span> Secrets
            </h1>
            <p className="text-xl text-white mb-10 max-w-2xl mx-auto">
              Premium argan oil products handcrafted with traditional techniques
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/products" 
                  className="bg-primary hover:bg-secondary text-dark hover:text-white px-8 py-4 rounded-full font-medium transition duration-300 inline-block"
                >
                  Shop Now
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/about" 
                  className="bg-transparent hover:bg-white text-white hover:text-dark border-2 border-white px-8 py-4 rounded-full font-medium transition duration-300 inline-block"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Parallax>

      {/* Featured Products Section */}
      <section 
        ref={featuredRef} 
        className="py-24 px-4 bg-gradient-to-b from-cream to-light dark:from-darkBg dark:to-darkBg relative transition-colors duration-300"
      >
        {/* Background pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${zellijPattern})` }}
        ></div>
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl font-bold text-dark dark:text-darkText mb-4 transition-colors duration-300">
              <span className="text-primary">Featured</span> Products
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300 text-lg">
              Experience the magic of argan oil with our bestselling products
            </p>
          </motion.div>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <motion.div 
                className="rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              ></motion.div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {featuredProducts.map((product, index) => (
                <motion.div 
                  key={product.id_produit} 
                  className="bg-white dark:bg-darkCard rounded-2xl shadow-lg overflow-hidden transition-colors duration-300 hover:shadow-xl"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -10 }}
                >
                  <Link to={`/products/${product.id_produit}`}>
                    <div className="overflow-hidden">
                      <motion.img 
                        src={product.image_principale || 'https://via.placeholder.com/300'} 
                        alt={product.nom_produit || 'Product image'} 
                        className="w-full h-64 object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </Link>
                  <div className="p-8">
                    <Link to={`/products/${product.id_produit}`}>
                      <h3 className="text-xl font-medium text-dark dark:text-darkText mb-3 transition-colors duration-300 hover:text-primary">
                        {product.nom_produit || 'Product Name'}
                      </h3>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 transition-colors duration-300">
                      {product.description_courte || 'No description available'}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-primary font-bold text-lg">
                        {product.prix !== undefined && product.prix !== null 
                          ? `$${Number(product.prix).toFixed(2)}` 
                          : 'Price not available'}
                      </p>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link 
                          to={`/products/${product.id_produit}`}
                          className="bg-secondary hover:bg-primary text-white px-5 py-2 rounded-full transition-colors duration-300"
                        >
                          View Details
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section 
        ref={aboutRef}
        className="py-24 px-4 bg-olive/10 dark:bg-darkBg relative overflow-hidden transition-colors duration-300"
      >
        <div 
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${zellijPattern})` }}
        ></div>
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-4xl font-bold text-dark dark:text-darkText mb-6 transition-colors duration-300">
                The <span className="text-primary">Argan Beauty</span> Story
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-8 transition-colors duration-300 text-lg leading-relaxed">
                For centuries, Moroccan women have used argan oil as a beauty secret. Extracted from the nuts of the argan tree, this "liquid gold" is rich in essential fatty acids and antioxidants that nourish and protect skin and hair.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/about" 
                  className="inline-block bg-secondary hover:bg-primary text-white px-6 py-3 rounded-full transition-colors duration-300"
                >
                  Our Story
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              className="rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <img 
                src="https://images.unsplash.com/photo-1605193420309-24a1e4c10f3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                alt="Argan oil production" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section 
        ref={testimonialsRef}
        className="py-24 bg-gradient-to-b from-light to-cream dark:from-darkBg dark:to-darkBg transition-colors duration-300"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark dark:text-darkText transition-colors duration-300">
              What Our <span className="text-primary">Customers</span> Say
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                name: "Sarah M.",
                text: "I've been using the argan oil hair serum for a month now, and my hair has never felt so soft and looked so shiny!",
                rating: 5
              },
              {
                name: "Michael T.",
                text: "The face cream is amazing! It absorbs quickly and leaves my skin feeling hydrated all day long.",
                rating: 5
              },
              {
                name: "Jessica K.",
                text: "I love that these products are ethically sourced. The quality is exceptional and my skin has never looked better!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-darkCard p-8 rounded-2xl shadow-lg transition-colors duration-300 border-t-4 border-primary"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -10 }}
              >
                <div className="flex items-center mb-6">
                  <div className="text-secondary flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.span 
                        key={i} 
                        className="text-xl"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 + index * 0.1 }}
                      >
                        ★
                      </motion.span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 transition-colors duration-300 text-lg italic">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-dark dark:text-darkText transition-colors duration-300">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${zellijPattern})` }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl font-bold text-dark mb-6">
              Ready to Experience the Magic of Argan Oil?
            </h2>
            <p className="text-dark/80 mb-10 max-w-2xl mx-auto text-lg">
              Join thousands of satisfied customers who have transformed their beauty routine with our premium products
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/products" 
                className="inline-block bg-dark hover:bg-secondary text-white px-8 py-4 rounded-full font-medium transition duration-300 text-lg"
              >
                Shop Our Collection
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import zellijPattern from '../assets/zellij-pattern.png';
import aboutImage from '../assets/about-image.jpg';
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.png';
import slide3 from '../assets/slide3.jpg';
import slide4 from '../assets/slide4.png';

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: slide1,
      title: "Empowering Women",
      description: "Behind every drop of Argan Beauty lies the strength and grace of Moroccan women, working together to craft a legacy.",
      points: [
        "Supporting women-led cooperatives",
        "Preserving artisanal heritage",
        "Promoting economic independence"
      ]
    },
    {
      image: slide2,
      title: "Sustainable Harvesting",
      description: "Rooted in respect for the land, our methods honor nature's rhythm—sustainably sourced, naturally preserved.",
      points: [
        "Eco-friendly practices",
        "Respect for biodiversity",
        "Zero deforestation"
      ]
    },
    {
      image: slide3,
      title: "Fair Trade, Fair Price",
      description: "We believe in value with integrity—ensuring every hand that crafts beauty is equally rewarded.",
      points: [
        "Fair compensation",
        "Transparent supply chain",
        "Ethical business values"
      ]
    },
    {
      image: slide4,
      title: "From Morocco, With Love",
      description: "Our roots run deep in the heart of Morocco, where tradition meets passion and every bottle tells a story.",
      points: [
        "Authentic Moroccan origin",
        "Locally sourced ingredients",
        "Cultural pride in every product"
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.2
      }
    }
  };

  // Animation variants for section children
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Animation variants for slider
  const slideVariants = {
    enter: { opacity: 0, x: 200, scale: 0.8 },
    center: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -200, scale: 0.8 }
  };

  return (
    <motion.div
      className="bg-light dark:bg-darkBg min-h-screen pt-24 pb-12 relative transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div
        className="absolute inset-0 opacity-10 z-0"
        style={{ backgroundImage: `url(${zellijPattern})` }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h1
          className="text-3xl font-serif font-bold text-dark dark:text-darkText text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Argan Beauty
        </motion.h1>

        {/* Section 1: Our Story */}
        <motion.div
          className="mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="bg-white dark:bg-darkCard rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6 p-6 transition-colors duration-300">
            <motion.div
              className="order-1 md:order-1"
              variants={childVariants}
            >
              <motion.img
                src={aboutImage}
                alt="Argan oil production"
                className="w-full h-full object-cover rounded-lg aspect-[4/3]"
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
              />
            </motion.div>
            <motion.div
              className="order-2 md:order-2 flex flex-col justify-center p-4"
              variants={childVariants}
            >
              <motion.h2
                className="text-2xl font-serif font-medium text-dark dark:text-darkText mb-4"
                variants={childVariants}
              >
                Our Story
              </motion.h2>
              <motion.p
                className="text-gray-700 dark:text-gray-300 mb-4"
                variants={childVariants}
              >
                Argan Beauty was founded in 2015 with a simple mission: to bring the incredible benefits of pure Moroccan argan oil to people around the world while supporting the communities that produce it.
              </motion.p>
              <motion.p
                className="text-gray-700 dark:text-gray-300 mb-4"
                variants={childVariants}
              >
                Our journey began when our founder visited Morocco and discovered the traditional methods used by Berber women to extract this precious oil. Impressed by both the quality of the oil and the cultural significance of its production, she was inspired to create a company that would honor these traditions while bringing their benefits to a global audience.
              </motion.p>
              <motion.p
                className="text-gray-700 dark:text-gray-300"
                variants={childVariants}
              >
                Today, we work directly with women's cooperatives in Morocco to source the highest quality argan oil, ensuring fair compensation and sustainable practices. Every product we create is a testament to our commitment to quality, tradition, and positive social impact.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* Section 2: Our Values */}
        <motion.div
          className="mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="bg-white dark:bg-darkCard rounded-lg shadow-md p-6 transition-colors duration-300"
            variants={childVariants}
          >
            <h2 className="text-2xl font-serif font-medium text-dark dark:text-darkText mb-4">Our Values</h2>
            <div className="space-y-4">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Quality",
                  description: "We use only the finest, cold-pressed argan oil in all our products, ensuring maximum potency and effectiveness."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  ),
                  title: "Sustainability",
                  description: "We're committed to environmentally responsible practices, from sustainable harvesting to eco-friendly packaging."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ),
                  title: "Community",
                  description: "We support the women's cooperatives that produce our argan oil, helping to provide economic independence and better living conditions."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex"
                  variants={childVariants}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3, duration: 0.6 }}
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-dark">
                      {item.icon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-dark dark:text-darkText">{item.title}</h3>
                    <p className="mt-1 text-gray-700 dark:text-gray-300">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Section 3: Sliders */}
        <motion.div
          className="mb-12 relative"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  className="min-w-full"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-darkCard">
                    <motion.div
                      className="p-8 flex flex-col justify-center"
                      variants={childVariants}
                    >
                      <motion.div
                        className="mb-2"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
                      >
                        {currentSlide === 0 && (
                          <svg className="w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                            <path d="M2 17l10 5 10-5"></path>
                            <path d="M2 12l10 5 10-5"></path>
                          </svg>
                        )}
                        {currentSlide === 1 && (
                          <svg className="w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                          </svg>
                        )}
                        {currentSlide === 2 && (
                          <svg className="w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M2 12h20"></path>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                          </svg>
                        )}
                        {currentSlide === 3 && (
                          <svg className="w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                          </svg>
                        )}
                      </motion.div>
                      <motion.h2
                        className="text-2xl font-serif font-bold text-dark dark:text-darkText mb-4"
                        variants={childVariants}
                      >
                        {slides[currentSlide].title}
                      </motion.h2>
                      <motion.p
                        className="text-gray-700 dark:text-gray-300 mb-6"
                        variants={childVariants}
                      >
                        {slides[currentSlide].description}
                      </motion.p>
                      <ul className="space-y-2">
                        {slides[currentSlide].points.map((point, i) => (
                          <motion.li
                            key={i}
                            className="flex items-center text-gray-700 dark:text-gray-300"
                            variants={childVariants}
                            transition={{ delay: 0.4 + i * 0.2 }}
                          >
                            <svg className="w-5 h-5 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {point}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                    <motion.div
                      className="bg-cover bg-center"
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1 }}
                    >
                      <img src={slides[currentSlide].image} alt={slides[currentSlide].title} className="w-full h-full object-cover" />
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <motion.button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md z-10 ml-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.2, rotate: -10 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-dark dark:text-darkText" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md z-10 mr-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-dark dark:text-darkText" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`mx-1 w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                whileHover={{ scale: 1.5, backgroundColor: '#ff6b6b' }}
                whileTap={{ scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Section 4: Our Commitment */}
        <motion.div
          className="mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="bg-white dark:bg-darkCard rounded-lg shadow-md p-6 transition-colors duration-300"
            variants={childVariants}
          >
            <h2 className="text-2xl font-serif font-medium text-dark dark:text-darkText mb-4">Our Commitment</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              At Argan Beauty, we're committed to creating products that are:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              {[
                "100% natural and organic",
                "Free from synthetic fragrances and preservatives",
                "Never tested on animals",
                "Produced using fair trade practices",
                "Packaged in recyclable materials"
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={childVariants}
                  transition={{ delay: index * 0.2 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
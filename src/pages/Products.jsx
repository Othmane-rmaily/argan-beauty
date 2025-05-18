import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductService from '../services/product';
import CategoryService from '../services/category';
import ProductCard from '../components/ProductCard';
import CategoryNav from '../components/CategoryNav';
import zellijPattern from '../assets/zellij-pattern.png';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          ProductService.getAllProducts(),
          CategoryService.getAllCategories()
        ]);
        const productsArray = Array.isArray(productsData) ? productsData : [];
        setProducts(productsArray);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setTotalPages(Math.ceil(productsArray.length / itemsPerPage));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => {
      const name = product?.nom_produit?.toLowerCase() || '';
      const desc = (product?.description_courte || product?.description_complete || '').toLowerCase();
      const matchesSearch = name.includes(searchTerm.toLowerCase()) || desc.includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || parseInt(product.id_categorie) === parseInt(categoryFilter);
      return matchesSearch && matchesCategory;
    });

    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
    setFilteredProducts(filtered.slice(0, itemsPerPage));
  }, [products, searchTerm, categoryFilter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const filtered = products.filter(product => {
      const name = product?.nom_produit?.toLowerCase() || '';
      const desc = (product?.description_courte || product?.description_complete || '').toLowerCase();
      const matchesSearch = name.includes(searchTerm.toLowerCase()) || desc.includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || parseInt(product.id_categorie) === parseInt(categoryFilter);
      return matchesSearch && matchesCategory;
    });

    setFilteredProducts(filtered.slice(start, end));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-darkBg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center dark:bg-darkBg">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-light dark:bg-darkBg min-h-screen pt-24 pb-12 relative transition-colors duration-300">
      <div 
        className="absolute inset-0 opacity-10 z-0"
        style={{ backgroundImage: `url(${zellijPattern})` }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-3xl font-serif font-bold text-dark dark:text-darkText text-center mb-8">
          Our Products
        </h1>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-darkCard rounded-lg shadow-md p-6 mb-8 transition-colors duration-300"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              />
            </div>

            <CategoryNav activeCategory={categoryFilter} setActiveCategory={setCategoryFilter} />
          </div>
        </motion.div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No products found matching your criteria.
            </p>
          </div>
        ) : (
          <div>
            <AnimatePresence mode="wait">
              <motion.div 
                key={categoryFilter + searchTerm + currentPage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-md bg-primary text-dark hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                >
                  Previous
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-md flex items-center justify-center transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                        currentPage === page
                          ? 'bg-secondary text-dark'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-md bg-primary text-dark hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

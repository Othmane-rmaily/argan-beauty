import React, { useState, useEffect } from 'react';
import CategoryService from '../services/category';

const CategoryNav = ({ activeCategory, setActiveCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await CategoryService.getAllCategories();
        // Add the "All" category manually
        const allCategory = { id_categorie: 'all', nom_categorie: 'All' };
        setCategories([allCategory, ...data]);
        setLoading(false);
      } catch (error) {
        console.error('Error loading categories:', error);
        setError('Failed to load categories');
        setLoading(false);
        // Initialize with just the "All" category to prevent errors
        setCategories([{ id_categorie: 'all', nom_categorie: 'All' }]);
      }
    };
    
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <button
          key={category.id_categorie}
          onClick={() => setActiveCategory(category.id_categorie)}
          className={`px-4 py-2 rounded-md transition-colors duration-300 ${
            activeCategory === category.id_categorie
              ? 'bg-primary text-dark font-medium'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {category.nom_categorie}
        </button>
      ))}
    </div>
  );
};

export default CategoryNav;

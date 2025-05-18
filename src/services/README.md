# API Services Documentation

This directory contains service modules that handle API communication between the frontend and backend of the Argan Beauty application.

## Available Services

### API Base Configuration (`api.js`)

Provides the base Axios configuration for all API requests, including:
- Base URL configuration
- Default headers
- Error handling interceptors

### Authentication Service (`auth.js`)

Handles user authentication operations:
- Login
- Logout
- Registration
- User data management

### Cart Service (`cart.js`)

Manages shopping cart operations:
- Fetching cart contents
- Adding items to cart
- Updating cart items
- Removing items from cart
- Clearing the cart

### Category Service (`category.js`)

Handles product category operations:
- Fetching all categories
- Getting a specific category
- Getting products by category
- Searching categories
- CRUD operations for categories

### Product Service (`products.js`)

Manages product-related operations:
- Fetching all products
- Getting featured products
- Getting a specific product
- Searching products

### Producteur Service (`producteur.js`)

Handles producer/cooperative operations:
- Fetching all producers
- Getting a specific producer
- Getting products by producer
- CRUD operations for producers

## Usage Example

```jsx
import React, { useState, useEffect } from 'react';
import { CategoryService, ProductService } from '../services';

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both products and categories in parallel
        const [productsData, categoriesData] = await Promise.all([
          ProductService.getAllProducts(),
          CategoryService.getAllCategories()
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Rest of component...
};
```

## Error Handling

All service methods include try/catch blocks for proper error handling. When using these services in components, you should:

1. Implement loading states while requests are in progress
2. Handle potential errors from API calls
3. Provide appropriate feedback to users

## Authentication

The API service is configured to handle authentication automatically:

- Requests include credentials for cookie-based authentication
- 401 Unauthorized responses trigger automatic logout
- Authentication state should be managed through the AuthContext
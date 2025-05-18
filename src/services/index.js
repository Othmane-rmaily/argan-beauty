// Export all services from a single file for easier imports

import api from './api';
import AuthService from './auth';
import CartService from './cart';
import CategoryService from './category';
import ProductService from './products';
import ProducteurService from './producteur';

export {
  api,
  AuthService,
  CartService,
  CategoryService,
  ProductService,
  ProducteurService
};
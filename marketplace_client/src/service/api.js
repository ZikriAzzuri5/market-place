const API_BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_API_BASE_URL_LOCAL
  : import.meta.env.VITE_API_BASE_URL;

export const LOGIN_URL = `${API_BASE_URL}/auth/login`;
export const REGISTER_URL = `${API_BASE_URL}/auth/register`;

export const CREATE_CATEGORY_URL = `${API_BASE_URL}/api/categories`;
export const GET_CATEGORIES_URL = `${API_BASE_URL}/api/categories`;
export const UPDATE_CATEGORY_URL = (id) =>
  `${API_BASE_URL}/api/categories/${id}`;
export const DELETE_CATEGORY_URL = (id) =>
  `${API_BASE_URL}/api/categories/${id}`;

export const CREATE_PRODUCT_URL = `${API_BASE_URL}/api/products`;
export const GET_PRODUCTS_URL = `${API_BASE_URL}/api/products`;
export const UPDATE_PRODUCT_URL = (id) => `${API_BASE_URL}/api/products/${id}`;
export const DELETE_PRODUCT_URL = (id) => `${API_BASE_URL}/api/products/${id}`;

export const CREATE_ORDER_URL = `${API_BASE_URL}/api/orders`;
export const GET_ORDERS_URL = `${API_BASE_URL}/api/orders`;
export const UPDATE_ORDER_URL = (id) => `${API_BASE_URL}/api/orders/${id}`;
export const DELETE_ORDER_URL = (id) => `${API_BASE_URL}/api/orders/${id}`;

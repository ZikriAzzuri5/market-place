import React, { useState, useEffect } from "react";
import {
  GET_ORDERS_URL,
  GET_CATEGORIES_URL,
  GET_PRODUCTS_URL,
} from "../service/api";

import axios from "axios";
export const DashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(GET_ORDERS_URL);
        setOrders(res.data.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await axios.get(GET_PRODUCTS_URL);
        setProducts(res.data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get(GET_CATEGORIES_URL);
        setCategories(res.data.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchOrders();
    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="mb-6">
        <h1 className=" font-bold mb-4 text-2xl text-gray-900">
          Welcome to the Dashboard
        </h1>
        <p className="text-gray-700">This is a Admin Dashboard.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Orders</h2>
          <p className="text-gray-600">Total Order : {orders.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <p className="text-gray-600">Total Products : {products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <p className="text-gray-600">
            Total Categories : {categories.length}
          </p>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";

import { GET_PRODUCTS_URL, DELETE_PRODUCT_URL } from "../service/api";
import { ConfirmModal } from "../components/ui/ConfirmModal";
import { showSuccessToast } from "../utils/ToastUtils";
import { customStyles } from "../utils/DataTable";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [productToDelete, setProductToDelete] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(GET_PRODUCTS_URL);
        setProducts(res.data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleEdit = (product) => {
    navigate(`/products/edit/${product._id}`, { state: { product } });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(DELETE_PRODUCT_URL(productToDelete), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((product) =>
        product.filter((productItem) => productItem._id !== productToDelete)
      );
      showSuccessToast("product successfully deleted");
    } catch (err) {
      console.error("Error deleting product:", err);
    } finally {
      setIsModalOpen(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.pd_name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const columns = [
    {
      name: "Code",
      selector: (row) => row.pd_code,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.pd_name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.pd_price,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.pd_ct_id.ct_name,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => handleEdit(row)}
          >
            <FaPen className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => openDeleteModal(row._id)}
          >
            <FaRegTrashAlt className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </button>
        </div>
      ),
    },
  ];

  const openDeleteModal = (productId) => {
    setProductToDelete(productId);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>{" "}
          <p className="mt-2 text-sm text-gray-700">
            A list of all the products in your account including their code,
            name, price and category.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Input
          type="text"
          placeholder="Search product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64"
        />
        <Button
          className="w-full sm:w-auto"
          onClick={() => navigate("/products/new")}
        >
          Add product
        </Button>
      </div>

      {/* Data Table */}
      <div className="mt-4 overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5">
        <DataTable
          columns={columns}
          data={filteredProducts}
          progressPending={loading}
          customStyles={customStyles}
          pagination
          responsive
          highlightOnHover
          noHeader
        />
      </div>

      {isModalOpen && (
        <ConfirmModal
          title="Confirm Deletion"
          isOpen={isModalOpen}
          message="Are you sure you want to delete this product?"
          onConfirm={handleDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

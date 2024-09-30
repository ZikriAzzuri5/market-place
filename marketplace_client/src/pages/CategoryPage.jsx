import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";

import { GET_CATEGORIES_URL, DELETE_CATEGORY_URL } from "../service/api";
import { ConfirmModal } from "../components/ui/ConfirmModal";
import { showSuccessToast } from "../utils/ToastUtils";
import { customStyles } from "../utils/DataTable";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(GET_CATEGORIES_URL);
        setCategories(res.data.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleEdit = (category) => {
    navigate(`/categories/edit/${category._id}`, { state: { category } });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(DELETE_CATEGORY_URL(categoryToDelete), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories((category) =>
        category.filter((categoryItem) => categoryItem._id !== categoryToDelete)
      );
      showSuccessToast("Category successfully deleted");
    } catch (err) {
      console.error("Error deleting category:", err);
    } finally {
      setIsModalOpen(false);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.ct_name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const columns = [
    {
      name: "Code",
      selector: (row) => row.ct_code,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.ct_name,
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

  const openDeleteModal = (categoryId) => {
    setCategoryToDelete(categoryId);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>{" "}
          <p className="mt-2 text-sm text-gray-700">
            A list of all the categories in your account including their code
            and name.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Input
          type="text"
          placeholder="Search category name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64"
        />
        <Button
          className="w-full sm:w-auto"
          onClick={() => navigate("/categories/new")}
        >
          Add Category
        </Button>
      </div>

      {/* Data Table */}
      <div className="mt-4 overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5">
        <DataTable
          columns={columns}
          data={filteredCategories}
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
          message="Are you sure you want to delete this category?"
          onConfirm={handleDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

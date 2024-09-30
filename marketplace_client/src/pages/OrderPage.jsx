import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";

import { GET_ORDERS_URL, DELETE_ORDER_URL } from "../service/api";
import { ConfirmModal } from "../components/ui/ConfirmModal";
import { showSuccessToast } from "../utils/ToastUtils";
import { customStyles } from "../utils/DataTable";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [orderToDelete, setOrderToDelete] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(GET_ORDERS_URL);
        setOrders(res.data.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleEdit = (order) => {
    navigate(`/orders/edit/${order._id}`, { state: { order } });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(DELETE_ORDER_URL(orderToDelete), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders((order) =>
        order.filter((orderItem) => orderItem._id !== orderToDelete)
      );
      showSuccessToast("Order successfully deleted");
    } catch (err) {
      console.error("Error deleting order:", err);
    } finally {
      setIsModalOpen(false);
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.or_pd_id.pd_name
      .toLowerCase()
      .includes(debouncedSearchTerm.toLowerCase())
  );

  const columns = [
    {
      name: "Order Product Name",
      selector: (row) => row.or_pd_id.pd_name,
      sortable: true,
    },
    {
      name: "Order Amount",
      selector: (row) => row.or_amount,
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

  const openDeleteModal = (orderId) => {
    setOrderToDelete(orderId);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>{" "}
          <p className="mt-2 text-sm text-gray-700">
            A list of all the orders in your account including their order
            product name and order amount.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Input
          type="text"
          placeholder="Search order product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64"
        />
        <Button
          className="w-full sm:w-auto"
          onClick={() => navigate("/orders/new")}
        >
          Add Order
        </Button>
      </div>

      {/* Data Table */}
      <div className="mt-4 overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5">
        <DataTable
          columns={columns}
          data={filteredOrders}
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
          message="Are you sure you want to delete this order?"
          onConfirm={handleDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

import React, { useEffect, useState } from "react";
import {
  CREATE_ORDER_URL,
  GET_PRODUCTS_URL,
  UPDATE_ORDER_URL,
} from "../../service/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../utils/ToastUtils";

import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

const orderSchema = yup.object().shape({
  or_amount: yup.number().required("Order amount is required"),
  or_pd_id: yup.string().required("Product is required"),
});

export const OrderForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [products, setProducts] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(orderSchema),
  });

  useEffect(() => {
    if (id) {
      const product = location.state?.product;
      if (product) {
        const { or_amount, or_pd_id } = product;
        setValue("or_amount", or_amount);
        setValue("or_pd_id", or_pd_id);
        setOrderId(id);
        setIsEdit(true);
      }
    }
  }, [id, location.state, setValue]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(GET_PRODUCTS_URL);
        setProducts(res.data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      if (isEdit) {
        await axios.put(`${UPDATE_ORDER_URL}/${orderId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        showSuccessToast("Order updated successfully!");
      } else {
        await axios.post(CREATE_ORDER_URL, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        showSuccessToast("Order created successfully!");
      }
      navigate("/orders");
    } catch (err) {
      showErrorToast("Error submitting Orders. Please try again.");
      console.error("Error submitting Orders:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isEdit ? "Edit Order" : "Create Order"}
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="order-amount" className="sr-only">
              Order Amount
            </Label>
            <div className="relative">
              <Input
                id="Order-Amount"
                type="number"
                placeholder="Order Amount"
                {...register("or_amount")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              />
              {errors.or_amount && (
                <p className="text-red-500 text-xs italic">
                  {errors.or_amount.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="Order-product-id" className="sr-only">
              Order Product
            </Label>
            <div className="relative">
              <Select
                id="order-product-id"
                {...register("or_pd_id")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              >
                <option value="">Select product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.pd_name}
                  </option>
                ))}
              </Select>
              {errors.or_pd_id && (
                <p className="text-red-500 text-xs italic">
                  {errors.or_pd_id.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              {isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

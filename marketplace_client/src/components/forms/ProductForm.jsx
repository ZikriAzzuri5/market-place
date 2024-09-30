import React, { useEffect, useState } from "react";
import {
  CREATE_PRODUCT_URL,
  UPDATE_PRODUCT_URL,
  GET_CATEGORIES_URL,
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

const productSchema = yup.object().shape({
  pd_code: yup.string().required("Product Code is required"),
  pd_name: yup.string().required("Product Name is required"),
  pd_price: yup.number().required("Product Price is required"),
  pd_ct_id: yup.string().required("Product Category is required"),
});

export const ProductForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [productId, setProductId] = useState(null);
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  useEffect(() => {
    if (id) {
      const product = location.state?.product;
      if (product) {
        const { pd_code, pd_name, pd_price, pd_ct_id } = product;
        setValue("pd_code", pd_code);
        setValue("pd_name", pd_name);
        setValue("pd_price", pd_price);
        setValue("pd_ct_id", pd_ct_id);
        setProductId(id);
        setIsEdit(true);
      }
    }
  }, [id, location.state, setValue]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(GET_CATEGORIES_URL);
        setCategories(res.data.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      if (isEdit) {
        await axios.put(`${UPDATE_PRODUCT_URL}/${productId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        showSuccessToast("Product updated successfully!");
      } else {
        await axios.post(CREATE_PRODUCT_URL, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data);

        showSuccessToast("Product created successfully!");
      }
      navigate("/products");
    } catch (err) {
      showErrorToast("Error submitting Product. Please try again.");
      console.error("Error submitting Product:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isEdit ? "Edit Product" : "Create Product"}
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="product-code" className="sr-only">
              Product Code
            </Label>
            <div className="relative">
              <Input
                id="product-code"
                type="text"
                placeholder="Product Code"
                {...register("pd_code")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              />
              {errors.pd_code && (
                <p className="text-red-500 text-xs italic">
                  {errors.pd_code.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="product-name" className="sr-only">
              Product Name
            </Label>
            <div className="relative">
              <Input
                id="product-name"
                type="text"
                placeholder="Product Name"
                {...register("pd_name")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              />
              {errors.pd_name && (
                <p className="text-red-500 text-xs italic">
                  {errors.pd_name.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="product-price" className="sr-only">
              Product Price
            </Label>
            <div className="relative">
              <Input
                id="product-price"
                type="number"
                placeholder="Product Price"
                {...register("pd_price")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              />
              {errors.pd_price && (
                <p className="text-red-500 text-xs italic">
                  {errors.pd_price.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="product-category-id" className="sr-only">
              Product Category
            </Label>
            <div className="relative">
              <Select
                id="product-category-id"
                {...register("pd_ct_id")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.ct_name}
                  </option>
                ))}
              </Select>
              {errors.pd_ct_id && (
                <p className="text-red-500 text-xs italic">
                  {errors.pd_ct_id.message}
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

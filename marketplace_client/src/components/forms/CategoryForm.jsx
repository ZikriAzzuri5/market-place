import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { CREATE_CATEGORY_URL, UPDATE_CATEGORY_URL } from "../../service/api";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../utils/ToastUtils";

const categorySchema = yup.object().shape({
  ct_code: yup.string().required("Category Code is required"),
  ct_name: yup.string().required("Category Name is required"),
});

export const CategoryForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorySchema),
  });

  useEffect(() => {
    if (id) {
      const category = location.state?.category;
      if (category) {
        const { ct_code, ct_name } = category;
        setValue("ct_code", ct_code);
        setValue("ct_name", ct_name);
        setCategoryId(id);
        setIsEdit(true);
      }
    }
  }, [id, location.state, setValue]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      if (isEdit) {
        await axios.put(`${UPDATE_CATEGORY_URL}/${categoryId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        showSuccessToast("Category updated successfully!");
      } else {
        await axios.post(CREATE_CATEGORY_URL, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        showSuccessToast("Category created successfully!");
      }
      navigate("/categories");
    } catch (err) {
      showErrorToast("Error submitting category. Please try again.");
      console.error("Error submitting category:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isEdit ? "Edit Category" : "Create Category"}
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="category-code" className="sr-only">
              Category Code
            </Label>
            <div className="relative">
              <Input
                id="category-code"
                type="text"
                placeholder="Category Code"
                {...register("ct_code")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              />
              {errors.ct_code && (
                <p className="text-red-500 text-xs italic">
                  {errors.ct_code.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="category-name" className="sr-only">
              Category Name
            </Label>
            <div className="relative">
              <Input
                id="category-name"
                type="text"
                placeholder="Category Name"
                {...register("ct_name")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              />
              {errors.ct_name && (
                <p className="text-red-500 text-xs italic">
                  {errors.ct_name.message}
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

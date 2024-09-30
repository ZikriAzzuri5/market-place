import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/Textarea";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { LOGIN_URL } from "../service/api";
import axios from "axios";
import { useEffect } from "react";
import { showSuccessToast } from "../utils/ToastUtils";

const loginSchema = yup.object().shape({
  us_email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  us_password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const registerSchema = yup.object().shape({
  us_name: yup.string().required("Name is required"),
  us_email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  us_password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  us_phone_number: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must only contain digits")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  us_address: yup.string().required("Address is required"),
});

export const AuthPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const isLogin = location.pathname === "/login";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(LOGIN_URL, data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);

        setIsAuthenticated(true);

        showSuccessToast(`Welcome to crud admin app`);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const toggleAuthMode = () => {
    navigate(isLogin ? "/register" : "/login");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {!isLogin && (
            <div>
              <Label htmlFor="name" className="sr-only">
                Name
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  {...register("us_name")}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                />
                <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.us_name && (
                <p className="text-red-500 text-xs italic">
                  {errors.us_name.message}
                </p>
              )}
            </div>
          )}

          <div>
            <Label htmlFor="email-address" className="sr-only">
              Email Address
            </Label>
            <div className="relative">
              <Input
                id="email-address"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                {...register("us_email")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              />
              <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {errors.us_email && (
              <p className="text-red-500 text-xs italic">
                {errors.us_email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                {...register("us_password")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              />
              <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {errors.us_password && (
              <p className="text-red-500 text-xs italic">
                {errors.us_password.message}
              </p>
            )}
          </div>

          {!isLogin && (
            <>
              <div>
                <Label htmlFor="phone-number" className="sr-only">
                  Phone Number
                </Label>
                <div className="relative">
                  <Input
                    id="phone-number"
                    type="text"
                    placeholder="Phone Number"
                    {...register("us_phone_number")}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  />
                  <FaPhone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {errors.us_phone_number && (
                  <p className="text-red-500 text-xs italic">
                    {errors.us_phone_number.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="address" className="sr-only">
                  Address
                </Label>
                <div className="relative">
                  <Textarea
                    id="address"
                    placeholder="Address"
                    {...register("us_address")}
                  />
                  <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {errors.us_address && (
                  <p className="text-red-500 text-xs italic">
                    {errors.us_address.message}
                  </p>
                )}
              </div>
            </>
          )}

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              {isLogin ? "Sign in" : "Register"}
            </Button>
          </div>

          <div className="text-center">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                className="text-black ml-2 underline hover:no-underline transition duration-200"
                onClick={toggleAuthMode}
              >
                {isLogin ? "Register" : "Sign In"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

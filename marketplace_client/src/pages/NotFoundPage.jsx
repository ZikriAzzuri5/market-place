import React from "react";
import { Link } from "react-router-dom";
export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-9xl font-bold text-red-500">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-black  text-white text-lg rounded-lg hover:bg-gray-800 transition duration-300"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

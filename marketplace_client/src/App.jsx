import "./App.css";
import { useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { PrivateRoute } from "./components/privateRoute/PrivateRoute";

import { CategoryForm } from "./components/forms/CategoryForm";
import { ProductForm } from "./components/forms/ProductForm";
import { OrderForm } from "./components/forms/OrderForm";

import { AuthPage } from "./pages/AuthPage";
import { DashboardPage } from "./pages/DashboardPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { CategoryPage } from "./pages/CategoryPage";
import { ProductPage } from "./pages/ProductPage";
import { OrderPage } from "./pages/OrderPage";

import { Sidebar } from "./components/ui/Sidebar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <AuthPage setIsAuthenticated={setIsAuthenticated} />,
    },
    {
      path: "/register",
      element: <AuthPage setIsAuthenticated={setIsAuthenticated} />,
    },
    { path: "/", element: <Navigate to="/login" /> },
    { path: "*", element: <NotFoundPage /> },
    {
      path: "/dashboard",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        </PrivateRoute>
      ),
    },
    {
      path: "/categories",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <CategoryPage />
          </DashboardLayout>
        </PrivateRoute>
      ),
    },
    {
      path: "/categories/new",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <CategoryForm />
          </DashboardLayout>
        </PrivateRoute>
      ),
    },
    {
      path: "/categories/edit/:id",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <CategoryForm />
          </DashboardLayout>
        </PrivateRoute>
      ),
    },
    {
      path: "/products",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <ProductPage />
          </DashboardLayout>
        </PrivateRoute>
      ),
    },
    {
      path: "/products/new",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <ProductForm />
          </DashboardLayout>
        </PrivateRoute>
      ),
    },
    {
      path: "/products/edit/:id",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            {" "}
            <ProductForm />
          </DashboardLayout>
        </PrivateRoute>
      ),
    },
    {
      path: "/orders",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <OrderPage />
          </DashboardLayout>
        </PrivateRoute>
      ),
    },
    {
      path: "/orders/new",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <OrderForm />
          </DashboardLayout>
        </PrivateRoute>
      ),
    },
    {
      path: "/orders/edit/:id",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <DashboardLayout>
            <OrderForm />
          </DashboardLayout>
        </PrivateRoute>
      ),
    },
  ]);
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

function DashboardLayout({ children }) {
  return (
    <div className="app-layout flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 lg:ml-64">{children}</main>
    </div>
  );
}

export default App;

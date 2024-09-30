import React, { useState } from "react";
import {
  FaRegCopy,
  FaRegFolder,
  FaRegChartBar,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { showSuccessToast } from "../../utils/ToastUtils";
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const navItems = [
  { name: "Dashboard", icon: FaHome, href: "/" },
  { name: "Products", icon: FaRegCopy, href: "/products" },
  { name: "Categories", icon: FaRegFolder, href: "/categories" },
  { name: "Orders", icon: FaRegChartBar, href: "/orders" },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    showSuccessToast("Successfully logout");
    navigate("/login");
  };
  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 rounded-md border border-gray-300 bg-white p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <FaTimes className="h-4 w-4" />
        ) : (
          <FaBars className="h-4 w-4" />
        )}
      </button>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center border-b px-4">
            <h2 className="text-2xl font-bold text-gray-800">Crud App</h2>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t p-4">
            <Button
              onClick={handleLogout}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Log out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

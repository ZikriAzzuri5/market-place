import { FaBars, FaTimes } from "react-icons/fa";

export const ToggleButton = ({ isOpen, setIsOpen }) => (
  <button
    className="fixed top-4 left-4 z-50 rounded-md border border-gray-300 bg-white p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
    onClick={() => setIsOpen(!isOpen)}
  >
    {isOpen ? <FaTimes className="h-4 w-4" /> : <FaBars className="h-4 w-4" />}
  </button>
);

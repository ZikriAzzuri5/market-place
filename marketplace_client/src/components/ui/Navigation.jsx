import { Link } from "react-router-dom";
import {
  FaRegCopy,
  FaRegFolder,
  FaRegChartBar,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export const Navigation = ({ items }) => (
  <nav className="flex-1 overflow-y-auto py-4">
    <ul className="space-y-1 px-2">
      <li>
        <Link
          href={"/categories"}
          className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <FaRegCopy className="mr-3 h-5 w-5" />
          {Categories}
        </Link>
      </li>
      <li>
        <Link
          href={"/products"}
          className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <FaRegCopy className="mr-3 h-5 w-5" />
          {Products}
        </Link>
      </li>
      <li>
        <Link
          href={"/orders"}
          className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <FaRegCopy className="mr-3 h-5 w-5" />
          {Orders}
        </Link>
      </li>
    </ul>
  </nav>
);

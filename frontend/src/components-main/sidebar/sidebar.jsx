import { Link } from "react-router-dom"; // Import Link from React Router
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed z-30 inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        id="drawer-navigation"
        className={`fixed z-40 top-0 left-0 w-64 h-screen px-4 py-10 overflow-y-auto transition-transform bg-[#141414] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5 id="drawer-navigation-label" className="text-base font-semibold text-white uppercase">
          Cinestream
        </h5>

        {/* Navigation Links */}
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to="/" className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                <FontAwesomeIcon className="size-4" icon="fa-solid fa-home" />
                <span className="ms-3">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/history" className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                <FontAwesomeIcon className="size-4" icon="fa-solid fa-history" />
                <span className="ms-3">History</span>
              </Link>
            </li>
            <li>
              <Link to="/movie/type?category=top_rated" className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                <FontAwesomeIcon className="size-4" icon="fa-solid fa-heart" />
                <span className="ms-3">Top Movies</span>
              </Link>
            </li>
            <li>
              <Link to="/movie/type?category=trending" className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                <FontAwesomeIcon className="size-4" icon="fa-solid fa-arrow-trend-up" />
                <span className="ms-3">Trending Movies</span>
              </Link>
            </li>
            <li>
              <Link to="/movie/type?category=popular" className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                <FontAwesomeIcon className="size-4" icon="fa-solid fa-fire" />
                <span className="ms-3">Popular Movies</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-500"></div>

        {/* User Links */}
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to="/" className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                <FontAwesomeIcon className="size-4" icon="fa-solid fa-home" />
                <span className="ms-3">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/edit-profile" className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                <FontAwesomeIcon className="size-4" icon="fa-solid fa-user" />
                <span className="ms-3">Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

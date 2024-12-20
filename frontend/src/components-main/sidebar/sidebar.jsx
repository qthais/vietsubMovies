import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <div
        className={`fixed z-30 inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>
      <div
        id="drawer-navigation"
        className={`fixed z-40 top-0 left-0 w-64 h-screen px-4 py-10 overflow-y-auto transition-transform -translate-x-full bg-[#141414] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-white uppercase"
        >
          Cinestream
        </h5>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-100 group"
              >
                <FontAwesomeIcon className="size-4" icon="fa-solid fa-home" />
                <span className="ms-3">Home</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-100 group"
              >
                <FontAwesomeIcon className="size-4" icon="fa-solid fa-history" />
                <span className="ms-3">History</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-100 group"
              >
                <FontAwesomeIcon className="size-4" icon="fa-solid fa-heart" />
                <span className="ms-3">Favorite Movies</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-100 group"
              >
                <FontAwesomeIcon className="size-4" icon="fa-solid fa-arrow-trend-up" />
                <span className="ms-3">Trending Movies</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-100 group"
              >
                <FontAwesomeIcon className="size-4" icon="fa-solid fa-fire" />
                <span className="ms-3">Popular Movies</span>
              </a>
            </li>
            

          </ul>
        </div>
        <div className="w-full h-[1px] bg-gray-500"></div>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-100 group"
              >
                <FontAwesomeIcon className="size-4" icon="fa-solid fa-home" />
                <span className="ms-3">Home</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-100 group"
              >
                <FontAwesomeIcon className="size-4" icon="fa-solid fa-user" />
                <span className="ms-3">Profile</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const Header2 = ({onSearch}) => {
  const location = useLocation();
  const user_id = location.pathname.split("/")[2]; // GET PRODUCT ID FROM PARAMETER (URL)
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    picture: null,
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/get_loggedin_user/${user_id}`
        );
        const user = res.data[0];
        setUserData({
          name: user.firstname,
          email: user.email,
          picture: user.picture,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserDetails();
  }, [user_id]);

  const OnNavAbout = (e) => {
    document
      .getElementById(e.target.value)
      .scrollIntoView({ behavior: "smooth" });
  };

  const handleProfileClick = (e) => {
    window.location.href = `/profile/${user_id}`;
  };

  const handleAddressClick = (e) => {
    window.location.href = `/address/${user_id}`;
  };

  const handlechangePassClick = (e) => {
    window.location.href = `/change_pass/${user_id}`;
  };

  const handlePurchase = () => {
    window.location.href = `/view/${user_id}#TOPAY`;
  };

  return (
    <>
      <nav
        className="font-inter border-gray-200 pt-2 py-2.5 rounded dark:bg-gray-900"
        style={{
          background: "url(/assets/imgs/abstract_bg.png)",
          borderImage: "url(/assets/imgs/border.png) 30",
          borderBottom: "10px solid transparent",
        }}
      >
        <div className="container-fluid flex sm:flex-wrap md:flex-nowrap lg:flex-nowrap items-center px-5 justify-between mx-auto ">
          <a href={`/marketplace/${user_id}`} className="flex items-center">
            <img
              width="200px"
              src="../assets/imgs/logo_1.png"
              className="object-cover"
              alt="Flowbite Logo"
            />
          </a>
          <div className="flex items-center md:order-2">
            <button
              type="button"
              className="flex mr-3 text-sm  rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              {userData.picture ? (
                <img
                  className=" w-11 h-11 object-cover rounded-full"
                  src={userData.picture}
                  alt=""
                />
              ) : (
                <FaUserCircle size={45} className="hover:text-blue-700" />
              )}
            </button>
            <div
              className="z-50 hidden my-4 text-base font-bold list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {userData.name}
                </span>
                <span className="block text-sm font-medium text-black-500 truncate dark:text-gray-400">
                  {userData.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <button
                    onClick={handleProfileClick} // Call the event handler on profile button click
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleAddressClick}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Address
                  </button>
                </li>
                <li>
                  <button
                    href="/"
                    onClick={handlechangePassClick}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Change Password
                  </button>
                </li>
                <li>
                  <button
                    onClick={handlePurchase}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    My Purchase
                  </button>
                </li>
                <li>
                  <a
                    href="/#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className=" items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col justify-content-center p-4 mt-4 sm:bg-white md:bg-transparent border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href={`/marketplace/${user_id}`}
                  className="block py-2 pl-3 pr-4 md:text-base lg:text-lg font-bold text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Home
                </a>
              </li>
              <li>
                <button
                  id="about_us"
                  value={"about"}
                  onClick={OnNavAbout}
                  className="block py-2 pl-3 pr-4 md:text-base lg:text-lg font-bold text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About Us
                </button>
              </li>
              <li>
                <a
                  href={`/mall/${user_id}`}
                  className="block py-2 pl-3 pr-4 md:text-base lg:text-lg font-bold text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Mall
                </a>
              </li>
              <li>
                <a
                  href={`/cart/${user_id}`}
                  className="block py-2 pl-3 pr-4 md:text-base lg:text-lg font-bold text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Cart
                </a>
              </li>
              <li>
                {" "}
                <form className="-mt-2">
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-lg font-bold  text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative ">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      onChange={onSearch}
                      className="block md:w-[8rem] lg:w-[17rem] sm:w-full lg:mr-5 sm:mt-2 md:mt-1 pl-10 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search Products, Merchandise..."
                      required
                    />
                  </div>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header2;

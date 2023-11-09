import { useLocation } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const SmallSidebar = () => {
  const [alldetails, setAllDetails] = useState({
    info: {
      firstname: "",
      lastname: "",
      number: "",
      birthday: "",
      picture: "",
      email: "",
      shop_name: "",
      shop_desc: "",
      shop_address: "",
      shop_logo: "",
      shop_banner: "",
    },
  });


  const location = useLocation();
  // getting the id on the URL
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchAllDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/get_shop_all_details/${id}`
        );
        setAllDetails({
          info: {
            firstname: res.data[0].firstname,
            lastname: res.data[0].lastname,
            number: res.data[0].number,
            birthday: res.data[0].birthday,
            picture: res.data[0].picture,
            email: res.data[0].email,
            shop_name: res.data[0].shop_name,
            shop_desc: res.data[0].shop_desc,
            shop_address: res.data[0].shop_address,
            shop_phone: res.data[0].shop_phone,
            shop_logo: res.data[0].shop_logo,
            shop_banner: res.data[0].shop_banner,
          },
        });

        // await axios.get(`http://localhost:8800/get_seller_all_details/${id}`);
        // setAllDetails(res.data);

      } catch (err) {
        console.log(err);
      }
    };
    fetchAllDetails();
  }, [id]);
  return (
    <>
      <div className="md:hidden w-full md:w-auto -mt-5" id="mobile-menu-3">
        <ul
          className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100  bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700
                  md:hidden lg:block"
        >
          <a
            href="https://flowbite.com/"
            className="flex items-center pl-2.5 mb-5"
          >
            {alldetails.info.shop_logo ? (
              <img
                // id="output"
                src={alldetails.info.shop_logo}
                className="h-6 mr-3 sm:h-10 rounded-full"
                alt="Flowbite Logo"
              />
            ) : (
              <FaUserCircle size={45} className="" />
            )}
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              {alldetails.info.shop_name}
            </span>
          </a>
          <li>
            <a
              href={`/dashboard/${id}`}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">Dashboard</span>
            </a>
          </li>

          <li>
            <a
              href={`/inventory/${id}`}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Inventory</span>
            </a>
          </li>
          <li>
            <a
              href={`/view_orders/${id}`}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Orders</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SmallSidebar
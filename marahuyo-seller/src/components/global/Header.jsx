import { FaBars, FaUserCircle } from "react-icons/fa";
import {  useLocation } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Header = ({ showSidebar, toggleSidebar, large }) => {
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
    <nav
      className="flex justify-between"
      style={{
        background: "url(/assets/imgs/abstract_bg.png)",
        borderImage: "url(/assets/imgs/border.png) 30",
        borderBottom: "10px solid transparent",
      }}
    >
      <div>
        {/* <!-- Breadcrumb --> */}
        <button
          onClick={() => {
            toggleSidebar();
          }}
          className=" hidden text-white mb-2 mt-2.5 bg-gray-800 px-3 ml-3 py-2 rounded-md hover:bg-gray-700"
        >
          {showSidebar ? "" : ""} <FaBars />
        </button>

        {/* md/small - large sidebar */}
        <button
          data-collapse-toggle="mobile-menu-3"
          type="button"
          className=" text-white mb-2 mt-2.5 bg-gray-800 px-3 ml-3 py-2 rounded-md hover:bg-gray-700"
          aria-controls="mobile-menu-3"
          aria-expanded="false"
          onClick={() => {
            large();
          }}
        >
          <span className="sr-only">Open main menu</span>
          <FaBars />
        </button>
      </div>
      <button
        type="button"
        className="flex mr-3 text-sm mb-2 mt-1  rounded-full  focus:ring-4 focus:ring-red-500 dark:focus:ring-blue-600"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
      >
        <span className="sr-only">Open user menu</span>

        {alldetails.info.picture ? (
          <img
            // id="output"
            src={alldetails.info.picture}
            className="bg-red-700 w-11 h-11 object-cover rounded-full"
            // src={require("../../../../../repo/imgs/" + alldetail.shop_logo)}
            alt="user"
          />
        ) : (
          <FaUserCircle size={45} className="" />
        )}
      </button>

      <div
        id="user-dropdown"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">
            {alldetails.info.firstname} {alldetails.info.lastname}
          </span>
          <span className="block text-sm font-medium text-black-500 truncate dark:text-gray-400">
            {alldetails.info.email}
          </span>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
              <a
                href={`/update_seller/${id}`}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Profile
              </a>
          </li>
          <li>
              <a
                href={`/update_shop/${id}`}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Shop Details
              </a>
          </li>
          <li>
              <a
                href={`/update_pass/${id}`}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Change Password
              </a>
          </li>
          <li>
              <a
                href="/#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;

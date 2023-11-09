import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiBarChartFill, RiCalendar2Fill } from "react-icons/ri";
import { Ri24HoursFill } from "react-icons/ri";
import { IoCalendarNumber } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const DashboardContent = () => {
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
    <div className="p-4 ">
    <nav
      className="flex items-center mb-4 rounded justify-between flex-wrap bg-blue-500 p-6"
      style={{
        background: "url(/assets/imgs/poly3.png)",
      }}
    >
      <div className="flex items-center flex-shrink-0 text-white">
        <span className="font-bold text-xl">WELCOME TO SELLER'S PANEL</span>
      </div>
      {/* <div className="w-auto flex justify-end">
        <div className="flex items-center justify-between h-10">
          <div className="flex">
            <div className="md:hidden sm:hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-4">
                  <button 
                    onClick={() => window.location.href = (`/summary_sales/${id}`)}
                    className="border border-blue-200 bg-blue-200 flex items-center space-x-2 font-medium rounded-full text-sm px-5 py-2.5 text-center">
                    <RiBarChartFill size={20} />
                    <span>Summary</span>
                  </button>
                  <button 
                    onClick={() => window.location.href = (`/daily_sales/${id}`)}
                    className="border border-blue-200 bg-blue-200 flex items-center space-x-2 font-medium rounded-full text-sm px-5 py-2.5 text-center">
                    <Ri24HoursFill size={20} />
                    <span>Daily</span>
                  </button>
                  <button 
                    onClick={() => window.location.href = (`/monthly_sales/${id}`)}
                    className="border border-blue-200 bg-blue-200 flex items-center space-x-2 font-medium rounded-full text-sm px-5 py-2.5 text-center">
                    <IoCalendarNumber size={20} />
                    <span>Monthly</span>
                  </button>
                  <button 
                    onClick={() => window.location.href = (`/annually_sales/${id}`)}
                    className="border border-blue-200 bg-blue-200 flex items-center space-x-2 font-medium rounded-full text-sm px-5 py-2.5 text-center">
                    <RiCalendar2Fill size={20} />
                    <span>Annual</span>
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-white lg:hidden md:block sm:block  bg-red-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        <span>View Sales Reports</span>
      </button>

      <div
        id="dropdown"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li 
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => window.location.href = (`/summary_sales/${id}`)}>
              Summary of Sales
          </li>
          <li 
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => window.location.href = (`/daily_sales/${id}`)}>
              Daily Sales
          </li>
          <li 
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => window.location.href = (`/monthly_sales/${id}`)}>
              Monthly Sales
          </li>
          <li 
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => window.location.href = (`/annually_sales/${id}`)}>
              Annual Sales
          </li>
        </ul>
      </div> */}
    </nav>
    <div className="w-full">
          <iframe
            title="TUP website"
            src="http://www.tup.edu.ph/"
            frameborder="0"
            width="100%"
            height="700px"
          ></iframe>
        </div>
    
  </div>
  );
};

export default DashboardContent;

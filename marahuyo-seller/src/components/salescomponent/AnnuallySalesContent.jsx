import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiBarChartFill, RiCalendar2Fill } from "react-icons/ri";
import { Ri24HoursFill } from "react-icons/ri";
import { IoCalendarNumber } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const AnnuallySalesContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState(new Date());

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };


  return (
    <div className="p-4 ">
      <nav
        className="flex items-center mb-4 rounded justify-between flex-wrap bg-blue-500 p-6"
        style={{
          background: "url(/assets/imgs/poly3.png)",
        }}
      >
        <div className="flex items-center flex-shrink-0 text-white">
          <span className="font-bold text-xl">ANNUAL SALES</span>
        </div>
        <div className="w-auto flex justify-end">
          <div className="flex items-center justify-between h-10">
            <div className="flex">
              <div className="md:hidden sm:hidden lg:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <button
                    onClick={() =>
                      (window.location.href = `/summary_sales/${id}`)
                    }
                    className="border border-blue-200 bg-blue-200 flex items-center space-x-2 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                  >
                    <RiBarChartFill size={20} />
                    <span>Summary</span>
                  </button>
                  <button
                    onClick={() =>
                      (window.location.href = `/daily_sales/${id}`)
                    }
                    className="border border-blue-200 bg-blue-200 flex items-center space-x-2 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                  >
                    <Ri24HoursFill size={20} />
                    <span>Daily</span>
                  </button>
                  <button
                    onClick={() =>
                      (window.location.href = `/monthly_sales/${id}`)
                    }
                    className="border border-blue-200 bg-blue-200 flex items-center space-x-2 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                  >
                    <IoCalendarNumber size={20} />
                    <span>Monthly</span>
                  </button>
                  <button
                    onClick={() =>
                      (window.location.href = `/annually_sales/${id}`)
                    }
                    className="border  border-blue-500 bg-blue-500 flex items-center space-x-2 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                  >
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
            <li>
              <li
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => (window.location.href = `/summary_sales/${id}`)}
              >
                Summary of Sales
              </li>
              <li
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => (window.location.href = `/daily_sales/${id}`)}
              >
                Daily Sales
              </li>
              <li
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => (window.location.href = `/monthly_sales/${id}`)}
              >
                Monthly Sales
              </li>
              <li
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => (window.location.href = `/annually_sales/${id}`)}
              >
                Annual Sales
              </li>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container mx-auto p-4">
      <p className="mb-4">List of sales for: <span className="text-2xl font-bold">{date.toLocaleDateString()}</span></p>

        <div className="flex justify-between items-center mb-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="px-4 py-2 border lg:w-full sm:w-[12rem] border-gray-300 rounded-md mr-2 focus:outline-none"
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
              onClick={() => (window.location.href = `/print_annually/${id}`)}
            >
              Export
            </button>
          </div>
          <p className="text-gray-500 text-sm">
            Showing  results
          </p>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Item Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Item Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {data.length !== 0 ? (
              data.map((item, idx) => ( */}
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  1
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  1
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  1
                </th>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">1</td>
              </tr>
              {/* ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-left">No order found!</td>
              </tr>
            )} */}
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnnuallySalesContent;

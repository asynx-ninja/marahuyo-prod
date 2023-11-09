import React, { useState, useEffect } from "react";
import axios from "axios";
import SuccessAlert from "../../components/global/SuccessAlert";
import DangerAlert from "../../components/global/DangerAlert";
import InformationAlert from "../../components/global/InformationAlert";
import {  useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
const CompletedContent = () => {
  const [data, setData] = useState([]);
  const [disable, setDisable] = useState(true);
  const [showEdit, setShowEdit] = useState(true);
  const [showSave, setShowSave] = useState(false);
  const [search, setSearch] = useState("");
  const [alerts, setAlerts] = useState({
    success: {
      value: false,
      text: "",
    },
    danger: {
      value: false,
      text: "",
    },
    info: {
      value: false,
      text: "",
    },
  });

  const location = useLocation();
  // getting the id on the URL
  const id = location.pathname.split("/")[2];

  const handleClickEdit = () => {
    setDisable(false);
    setShowEdit(false);
    setShowSave(true);
  };
  const handleStatusChange = (name, index) => (event) => {
    let newArr = data.map((item, i) => {
      if (index == i) {
        return { ...item, [name]: event.target.value };
      } else {
        return item;
      }
    });
    setData(newArr);
  };
  const handleClickSave = async (e) => {
    try {
      data
        .map(async (item) => {
          await axios.put(`http://localhost:8800/set_status/`, {
            order_id: item.order_id,
            status_name: item.status_name,
          });
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));

      setDisable(true);
      setShowEdit(true);
      setShowSave(false);
    } catch (err) {
      console.log(err);
      setAlerts({
        success: {
          value: false,
          text: "",
        },
        danger: {
          value: true,
          text: "Something went wrong, Please try again!",
        },
        info: {
          value: false,
          text: "",
        },
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    setAlerts({
      success: {
        value: true,
        text: "Order status updated successfully!",
      },
      danger: {
        value: false,
        text: "",
      },
      info: {
        value: false,
        text: "",
      },
    });
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  useEffect(() => {
    const fetchAllDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/get_completed_orders/${id}`
        );
        setData(res.data);

        const filtered = res.data.filter((item) =>
        item.prod_name.toLowerCase().includes(search.toLowerCase()) ||
        item.firstname.toLowerCase().includes(search.toLowerCase()) || 
        item.lastname.toLowerCase().includes(search.toLowerCase()) || 
        item.order_id.toString().includes(search)
      );
        setData(filtered);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllDetails();
  }, [id, search]);

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="p-4">
      <nav
        className="flex items-center mb-4 rounded justify-between flex-wrap bg-blue-500 p-6"
        style={{
          background: "url(/assets/imgs/poly3.png)",
        }}
      >
        <div className="flex items-center flex-shrink-0 text-white">
          <span className="font-bold text-xl">COMPLETED ORDERS</span>
        </div>
        <div className="w-auto flex justify-end">
          {showEdit && data.length !== 0 ? (
            <button
              type="button"
              id="edit"
              onClick={handleClickEdit}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Edit Orders
            </button>
          ) : null}

          {showSave ? (
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="submit"
              value={data[0].order_id}
              onClick={handleClickSave}
            >
              Save
            </button>
          ) : null}
        </div>
      </nav>
      {alerts.success.value ? (
        <SuccessAlert text={alerts.success.text} />
      ) : null}
      {alerts.danger.value ? <DangerAlert text={alerts.danger.text} /> : null}
      {alerts.info.value ? <InformationAlert text={alerts.info.text} /> : null}
      <div className="sm:container sm:mx-auto md:mx-auto px-4 py-8 overflow-x-auto">
        {/* <h2 className="text-2xl font-bold mb-4">Completed Orders</h2> */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex">
            <input
              type="search"
              name="default-search"
              className="px-4 py-2 border lg:w-full sm:w-[12rem] border-gray-300 rounded-md mr-2 focus:outline-none"
              onChange={onSearch}
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none">
              Search
            </button>
          </div>
            <button 
               onClick={() => window.location.href = (`/print_completed/${id}`)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold md:py-2 md:px-4 ml-8 sm:p-0 rounded">
              <FontAwesomeIcon icon={faPrint} className="mr-2" />
              Print Summary
            </button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3">
                  Item Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Order Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length !== 0 ? (
                data.map((item, idx) => (
                  <tr
                    key={idx}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.order_id}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.firstname} {item.lastname}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.prod_name}
                    </th>
                    <td className="px-6 py-4">{item.product_qty}</td>
                    <td className="px-6 py-4">{item.order_total}</td>
                    <td className="px-6 py-4">{item.order_date}</td>
                    <td className="px-6 py-4">
                      <select
                        className="inline-block py-1 px-3 text-xs font-semibold rounded-full bg-green-500 text-white"
                        name="status_name"
                        onChange={handleStatusChange("status_name", idx)}
                        disabled={disable}
                      >
                        <option
                          value="TOPAY"
                          // selected={item.status_name === "TOPAY"}
                        >
                          TOPAY
                        </option>
                        <option
                          value="TOSHIP"
                          // selected={item.status_name === "TOSHIP"}
                        >
                          TOSHIP
                        </option>
                        <option
                          value="TORECEIVE"
                          // selected={item.status_name === "TORECEIVE"}
                        >
                          TORECEIVE
                        </option>
                        <option
                          value="COMPLETED"
                          selected
                        >
                          COMPLETED
                        </option>
                        <option
                          value="CANCELLED"
                          // selected={item.status_name === "CANCELLED"}
                        >
                          CANCELLED
                        </option>
                        <option
                          value="RETURN"
                          // selected={item.status_name === "RETURN"}
                        >
                          RETURN
                        </option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4 text-left">No order found!</td>
                </tr>
              )}
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompletedContent;

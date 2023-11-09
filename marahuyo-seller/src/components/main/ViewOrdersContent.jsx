import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faShippingFast,
  faBox,
  faCheckCircle,
  faTimesCircle,
  faUndoAlt,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";


const ViewOrdersContent = () => {
  const [toPay, setTopay] = useState([])
  const [toShip, setToShip] = useState([])
  const [toReceive, setToReceive] = useState([])
  const [toCompleted, setCompleted] = useState([])
  const [toCancelled, setCancelled] = useState([])
  const [toReturn, setReturn] = useState([])
  const [total, setTotal] = useState(0)
  const [sales, setSales] = useState(0)
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchAllDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/get_topay_orders/${id}`
        );
        const res1 = await axios.get(
          `http://localhost:8800/get_cancelled_orders/${id}`
        );
        const res2 = await axios.get(
          `http://localhost:8800/get_completed_orders/${id}`
        );
        const res3 = await axios.get(
          `http://localhost:8800/get_return_orders/${id}`
        );
        const res4 = await axios.get(
          `http://localhost:8800/get_toreceive_orders/${id}`
        );
        const res5 = await axios.get(
          `http://localhost:8800/get_toship_orders/${id}`
        );
        setTopay(res.data)
        setToShip(res5.data)
        setToReceive(res4.data)
        setCompleted(res2.data)
        setCancelled(res1.data)
        setReturn(res3.data)

      } catch (err) {
        console.log(err);
      }
    };
    fetchAllDetails();
  }, [id]);

  // console.log(toPay)

  const getTotalSales = () => {
    let totalSales = 0;

    toShip.forEach((item) => {
      totalSales = totalSales + (item.prod_price * item.product_qty);
    });

    toReceive.forEach((item) => {
      totalSales = totalSales + (item.prod_price * item.product_qty);
    });

    toCompleted.forEach((item) => {
      totalSales = totalSales + (item.prod_price * item.product_qty);
    });

    return totalSales.toFixed(2);
  };

  const getTotalOrders = () => {
    let totalOrders = toPay.length + toShip.length + toReceive.length + toCancelled.length + toCompleted.length + toReturn.length

    return totalOrders;
  };

  return (
    <div className="p-6">
      <nav
        className="flex items-center mb-4 rounded justify-between flex-wrap bg-blue-500 p-6"
        style={{
          background: "url(/assets/imgs/poly3.png)",
        }}
      >
        <div className="flex items-center flex-shrink-0 text-white">
          <span className="font-bold text-xl">SHOP ORDERS</span>
        </div>
      </nav>
      <div className="">

        <div className="flex items-center justify-between p-4 mb-2">
          <span className="text-lg font-bold">Number of Orders: {getTotalOrders()}</span>
          <span className="text-lg font-bold">Total Sales: ₱ {getTotalSales()}</span>
          {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <FontAwesomeIcon icon={faPrint} className="mr-2" />
            Print Summary
          </button> */}
        </div>
        <div className="grid md:grid-cols-3 -mt-4 sm:grid-cols-2 gap-4 p-4 align-center ">
          <div className="max-w-xl rounded overflow-hidden shadow-lg">
            <div className="w-full h-40 flex items-center justify-center bg-blue-200">
              <FontAwesomeIcon
                icon={faCreditCard}
                className="text-6xl text-blue-500"
              />
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-1">To Pay</div>
              <span className="text-gray-500">{toPay.length} orders</span>
              <br></br>
              <button className="px-4 py-1 text-sm text-white mt-5 bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => window.location.href = (`/to_pay_orders/${id}`)}
              >
                Show to pay orders
              </button>
            </div>
          </div>
          <div className="max-w-xl rounded overflow-hidden shadow-lg">
            <div className="w-full h-40 flex items-center justify-center bg-blue-200">
              <FontAwesomeIcon
                icon={faShippingFast}
                className="text-6xl text-yellow-500"
              />
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-1">To Ship</div>
              <span className="text-gray-500">{toShip.length} orders</span>
              <br></br>
              <button className="px-4 py-1 text-sm text-white mt-5 bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                onClick={() => window.location.href = (`/to_ship_orders/${id}`)}
              >
                Show to ship orders
              </button>
            </div>
          </div>
          <div className="max-w-xl rounded overflow-hidden shadow-lg">
            <div className="w-full h-40 flex items-center justify-center bg-blue-200">
              <FontAwesomeIcon icon={faBox} className="text-6xl text-red-500" />
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-1">To Receive</div>
              <span className="text-gray-500">{toReceive.length} orders</span>
              <br></br>
              <button className="px-4 py-1 text-sm text-white mt-5 bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:red-blue-500 focus:ring-offset-2"
                onClick={() => window.location.href = (`/to_receive_orders/${id}`)}
              >
                Show to receive orders
              </button>
            </div>
          </div>
          <div className="max-w-xl rounded overflow-hidden shadow-lg">
            <div className="w-full h-40 flex items-center justify-center bg-blue-200">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-6xl text-green-500"
              />
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-1">Completed</div>
              <span className="text-gray-500">{toCompleted.length} orders</span>
              <br></br>
              <button className="px-4 py-1 text-sm text-white mt-5 bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:green-blue-500 focus:ring-offset-2"
                onClick={() => window.location.href = (`/completed_orders/${id}`)}
              >
                Show completed orders
              </button>
            </div>
          </div>
          <div className="max-w-xl rounded overflow-hidden shadow-lg">
            <div className="w-full h-40 flex items-center justify-center bg-blue-200">
              <FontAwesomeIcon
                icon={faTimesCircle}
                className="text-6xl text-red-500"
              />
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-1">Cancelled</div>
              <span className="text-gray-500">{toCancelled.length} orders</span>
              <br></br>
              <button className="px-4 py-1 text-sm text-white mt-5 bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={() => window.location.href = (`/cancelled_orders/${id}`)}
              >
                Show cancelled orders
              </button>
            </div>
          </div>
          <div className="max-w-xl rounded overflow-hidden shadow-lg">
            <div className="w-full h-40 flex items-center justify-center bg-blue-200">
              <FontAwesomeIcon
                icon={faUndoAlt}
                className="text-6xl text-black-500"
              />
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-1">Return Refund</div>
              <span className="text-gray-500">{toReturn.length} orders</span>
              <br></br>
              <button className="px-4 py-1 text-sm text-white mt-5 bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={() => window.location.href = (`/return_orders/${id}`)}
              >
                Show returned orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrdersContent;
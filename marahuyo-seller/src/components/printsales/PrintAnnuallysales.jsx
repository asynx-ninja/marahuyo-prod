import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

const PrintAnnually = () => {
  const [data, setData] = useState([]);
  const [shopData, setShopData] = useState({
    shop_name: "",
    shop_username: "",
  });
  const location = useLocation();
  // getting the id on the URL

  const id = location.pathname.split("/")[2];
  useEffect(() => {
    const fetchAllDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/get_topay_orders/${id}`
        );
        const res1 = await axios.get(
          `http://localhost:8800/get_shop_data/${id}`
        );
        setData(res.data);
        setShopData({
          shop_name: res1.data[0].shop_name,
          shop_username: res1.data[0].email,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllDetails();
  }, [id]);
  const currentDate = new Date().toLocaleDateString();

  const URL = (id) => {
    window.location.href = `/annually_sales/${id}`;
  };

  const componentPDF = useRef(null);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "AnnuallySales",
    onAfterPrint: () => {
      alert("Data saved in PDF");
      URL(id); // Call the navigation function
    },
  });

  return (
    <div>
      <button
        onClick={generatePDF}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded absolute"
        style={{
          top: "10px",
          left: "10px",
        }}
      >
        <FontAwesomeIcon icon={faPrint} className="mr-2" />
        Export to PDF
      </button>
      <div
        ref={componentPDF}
        className="flex flex-col p-10 min-h-screen bg-gray-100"
      >
        <div className="flex items-center justify-between w-full p-4">
          <div>
            <img
              src="/logo512.png"
              alt="Marahuyo Logo"
              className="w-24 mt-12 "
            />
          </div>
          <h1 className="text-4xl font-bold">MARAHUYO</h1>
          <div>
            <img src="/tup_logo1.png" alt="TUP Logo" className="w-20 mt-8" />
          </div>
        </div>
        <h2 className="text-2xl -mt-8 text-center italic">
          "Magical Marketplace of TUP Merchandise"
        </h2>
        <div className="mt-12">
          <p className="text-lg font-semibold">
            Shop Name: 
            <span className="font-normal"> {shopData.shop_name}</span>
          </p>
          <p className="text-lg font-semibold">
            Username: 
            <span className="font-normal"> {shopData.shop_username}</span>
          </p>
          <p className="text-lg font-semibold">
            Date: <span className="font-normal">{currentDate}</span>
          </p>
        </div>
        <h1 className="text-2xl font-bold text-center mt-8 mb-4">
          ANNUALLY SALES
        </h1>
        {/* Add the rest of your content here */}
        <table className="w-full bg-white border border-gray-200">
          <thead>
            <tr className="justify-center">
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100  text-sm font-semibold text-gray-700">
                Order ID
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100  text-sm font-semibold text-gray-700">
                Customer
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100  text-sm font-semibold text-gray-700">
                Item Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100  text-sm font-semibold text-gray-700">
                Quantity
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100  text-sm font-semibold text-gray-700">
                Total Price
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100  text-sm font-semibold text-gray-700">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.length !== 0 ? (
              data.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {item.order_id}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {item.firstname}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {item.prod_name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {item.product_qty}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {item.order_total}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {item.order_date}
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
  );
};

export default PrintAnnually;

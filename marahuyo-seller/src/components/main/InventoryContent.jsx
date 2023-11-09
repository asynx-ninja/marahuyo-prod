import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SuccessAlert from "../global/SuccessAlert";

const InventoryContent = () => {
  const location = useLocation();
  const acc_id = location.pathname.split("/")[2];
  const [selected, setSelected] = useState("");
  const [input, setInput] = useState("");
  const [info, setInfo] = useState([]);
  const [filter, setFilter] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:8800/get_products/${acc_id}`
      );

      const new_data = res.data;

      setInfo(new_data);
      setFilter(new_data);
    };

    fetchData();
  }, [acc_id]);

  const handleOnEdit = (e) => {
    const id = e.target.id;
    window.location.href = `/edit_product/${acc_id}/${id}`;
  };

  const handleOnDelete = async (e) => {
    try {
      const id = e.target.value;
      
      await axios.delete(`http://localhost:8800/delete_category/${id}`);
      await axios.delete(
        `http://localhost:8800/delete_images/${id}`
      );
      await axios.delete(
        `http://localhost:8800/delete_sizes/${id}`
      );
      await axios.delete(
        `http://localhost:8800/delete_variant/${id}`
      );
      await axios.delete(
        `http://localhost:8800/delete_product/${id}`
      );

      setSuccess(true);
      
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectedChange = (e) => {
    setSelected(e.target.value);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value.toLowerCase());
  };

  const handleOnClickSearch = () => {
    const user = info.filter((item) => {
      switch (selected) {
        case "id":
          return item.prod_id == input;
        case "name":
          return item.prod_name.toLowerCase().includes(input);
        case "":
          return (
            item.prod_id == input ||
            item.prod_name.toLowerCase().includes(input)
          );
        default:
          break;
      }

      return true;
    });

    setFilter(user);
  };

  const handleAdd = () => {
    window.location.href = `/add_product/${acc_id}`;
  };

  return (
    <div classname="flex flex-row">
      <div className="p-5">
        <div
          className="flex items-center mb-4 rounded justify-between flex-wrap bg-blue-500 p-6"
          style={{
            background: "url(/assets/imgs/poly3.png)",
          }}
        >
          <div className="flex items-center flex-shrink-0 text-white">
            <span className="font-bold text-xl">MANAGE INVENTORY</span>
          </div>
          <button
            onClick={handleAdd}
            className="text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            ADD PRODUCT
          </button>
        </div>
        {success ? (
          <div className="pt-5">
            <SuccessAlert text={"Product successfuly deleted!"} />
          </div>
        ) : null}
        <div className="mt-5">
          <div>
            <form>
              <div className="flex">
                <select
                  id="entity"
                  onChange={handleSelectedChange}
                  defaultValue={""}
                  className="bg-gray-50 border w-[15%] border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">All</option>
                  <option value="id">Product ID</option>
                  <option value="name">Product Name</option>
                </select>

                <div className="relative w-full">
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search Product Name or Product ID ..."
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={handleOnClickSearch}
                    className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <span className="sr-only">Search</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Stocks
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filter.length !== 0 ? (
                filter.map((item, idx) => (
                  <tr
                    key={idx}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.prod_id}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.prod_name}
                    </th>
                    <td className="px-6 py-4">{"₱ " + item.prod_price}</td>
                    <td className="px-6 py-4">{item.prod_stocks}</td>
                    <td className="px-6 py-4 text-left">
                      <button
                        type="button"
                        onClick={handleOnEdit}
                        id={item.prod_id}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4 text-left">
                      <button
                        type="button"
                        value={item.prod_id}
                        onClick={handleOnDelete}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4 text-left">No user found!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryContent;

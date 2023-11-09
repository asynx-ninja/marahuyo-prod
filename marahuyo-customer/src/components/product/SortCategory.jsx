import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const SortCategory = ({ getCategory }) => {
  const location = useLocation();
  const user_id = location.pathname.split("/")[2]; // GET PRODUCT ID FROM PARAMETER (URL)
  const shop_name = location.hash.split("#")[1]; // GET PRODUCT ID FROM PARAMETER (URL)
  const hash_categoryName = location.hash.split("#")[2];

  const [category, setCategory] = useState([]);
  const [display, setDisplay] = useState({
    category_name: hash_categoryName === undefined ? "All" : hash_categoryName,
  });

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        if (shop_name === undefined) {
          const res = await axios.get(
            "http://localhost:8800/get_all_categories"
          );
          setCategory(res.data);
        } else {
          const res = await axios.get(
            "http://localhost:8800/get_shop_categories/" + shop_name
          );
          setCategory(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProducts();
  }, [shop_name]);

  const OnClick = (e) => {
    if (hash_categoryName === undefined) {
      getCategory((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
      setDisplay((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    } else {
      setDisplay((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
      window.location.href = `/store/${user_id}#${shop_name}#${e.target.value}`;
    }
  };

  return (
    <>
      <div className="my-3 flex gap-5">
        <div className="flex">
          <button
            type="button"
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="flex ml-5 h-[30px] gap-2 rounded-lg bg-orange-600 px-2 shadow-xl"
          >
            <FaBars className="m-auto text-white" />
            <h1 className="m-auto text-white">Categories</h1>
          </button>
          <div
            id="dropdown"
            className="z-50 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-[130px] dark:bg-gray-700 border-[1px] border-orange-400"
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li className="border-b-[1px]">
                <button
                  onClick={OnClick}
                  name="category_name"
                  className="text-center w-full font-bold block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white focus:bg-orange-400 focus:text-white"
                  value={"All"}
                >
                  All
                </button>
              </li>
              {Object.entries(category).map(([i, item]) => (
                <li key={i} className="border-b-[1px]">
                  <button
                    onClick={OnClick}
                    name="category_name"
                    className="text-center w-full font-bold block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white focus:bg-orange-400 focus:text-white"
                    value={item.category_name}
                  >
                    {item.category_name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex h-[30px]">
          <h1 name="category_display" className="font-bold my-auto">
            Category: <b className="text-custom-red">{display.category_name}</b>
          </h1>
        </div>
      </div>
    </>
  );
};

export default SortCategory;

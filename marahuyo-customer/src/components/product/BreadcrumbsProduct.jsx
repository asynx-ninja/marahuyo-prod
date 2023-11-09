import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const user_id = location.pathname.split("/")[2]; // GET PRODUCT ID FROM PARAMETERS (URL)
  const prod_name = location.hash.split("#")[1]; // GET PRODUCT ID FROM PARAMETERS (URL)
  // const hash = window.location.hash; // GET PRODUCT ID FROM PARAMETER (URL)
  // const user_id = hash.substring(1)

  const [nav, setNav] = useState({
    shop_id: 0,
    shop_name: "",
    prod_category: "",
    prod_name: "",
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/get_product/` + prod_name
        ); // USED THE SAME LINK TO GET PRODUCT AND SHOP DETAILS
        const res1 = await axios.get(
          `http://localhost:8800/get_shopInfo/` + res.data[0].shop_id
        );
        setNav({
          shop_id: res1.data[0].shop_id,
          shop_name: res1.data[0].shop_name,
          prod_category: res.data[0].category_name,
          prod_name: res.data[0].prod_name,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [prod_name]);

  return (
    <div>
      <nav
        className="flex lg:ml-12 md:ml-3 sm:ml-3 mt-5"
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a
              href={user_id === "undefined" ? (`/#`) : (`/marketplace/${user_id}`) }
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              MARAHUYO
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <a
                href={`/store/${user_id}#${nav.shop_name}`}
                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                {nav.shop_name}
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <a
                href={`/store/${user_id}#${nav.shop_name}#${nav.prod_category}`}
                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                {nav.prod_category}
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="ml-1 lg:text-sm md:text-sm sm:text-xs font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                {nav.prod_name}
              </span>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;

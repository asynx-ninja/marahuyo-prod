import Pagination from "../../components/global/Pagination";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ShopProduct = ({ category }) => {
  const location = useLocation();
  const user_id = location.pathname.split("/")[2]; // GET PRODUCT ID FROM PARAMETER (URL)
  const shop_name = location.hash.split("#")[1]; // GET PRODUCT ID FROM PARAMETERS (URL)
  const hash_categoryName = location.hash.split("#")[2];

  const [data, setProduct] = useState([]);
  const prod_category = category.category_name;

  // FOR PAGINATION
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 8
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const filter = data.filter((item) => item.prod_stocks !== 0)
  const itemRecord = filter.slice(firstPostIndex, lastPostIndex)

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        if (hash_categoryName === undefined || hash_categoryName === "All") {
          if (prod_category === undefined || prod_category === "All") {
            const res = await axios.get(
              "http://localhost:8800/get_all_shop_products/" + shop_name
            );
            setProduct(res.data);
          } else {
            const res = await axios.get(
              `http://localhost:8800/get_categorized_prod/${prod_category}/${shop_name}`
            );
            setProduct(res.data);
          }
        } else {
          const res = await axios.get(
            `http://localhost:8800/get_categorized_prod/${hash_categoryName}/${shop_name}`
          );
          setProduct(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProducts();
  }, [shop_name, prod_category, hash_categoryName]);

  // console.log(prod_category)

  const handleOnPage = (childData) => {
    setCurrentPage(childData)
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 x:grid-cols-5 xl:grid-cols-6">
          {Object.entries(itemRecord).map(([i, item]) => (
            <button
              key={i}
              className="flex flex-col w-[95%] m-auto cursor-pointer border-[1px] hover:border-red-700"
              style={{ margin: "5px" }}
              onClick={() =>
                (window.location.href = `/product/${user_id}#${item.prod_name}`)
              }
            >
              <img
                className="h-60 object-cover"
                src={item.image_url}
                alt=""
                width="100%"
              />
              <div className="flex flex-col h-20 shadow-xl w-full">
                <h1 className="hidden">{item.prod_id}</h1>
                <h1 className="hidden">{item.shop_id}</h1>
                <h1 className="ml-1 mt-1 truncate w-[80%] text-left">
                  {item.prod_name}
                </h1>
                <div className="flex mt-5 px-2 justify-between items-center">
                  <h1 className="text-red-600">₱ {item.prod_price}</h1>
                  <h1 className="text-[13px] text-gray-500 relative">
                    {item.prod_stocks} Item/s left
                  </h1>
                </div>
              </div>
            </button>
          ))}
        </div>

        <Pagination
          total={data.length}
          postsPerPage={postsPerPage}
          handleOnPage={handleOnPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default ShopProduct;

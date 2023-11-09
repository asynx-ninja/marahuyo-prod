import Header2 from "../../components/global/Header2";
import Header1 from "../../components/global/Header1";
import Footer from "../../components/global/Footer";
import StoreBanner from "../../components/product/StoreBanner";
import ShopProduct from "../../components/product/ShopProduct";
import SortCategory from "../../components/product/SortCategory";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const StoreHome = () => {
  const location = useLocation();
  const user_id = location.pathname.split("/")[2]; // GET PRODUCT ID FROM PARAMETER (URL)
  const [category, setCategory] = useState([]);

  const getCategory = (childData) => {
    setCategory(childData);
  };

  return (
    <div>
      {user_id === "undefined" ? (<Header1 />) : (<Header2 />)}
      <StoreBanner />
      {/* Lagyan niyo ng sorting to by category sa taas gawa kayo component */}
      <SortCategory getCategory={getCategory} />
      <div className="mb-5">
        <ShopProduct category={category} />
      </div>
      <Footer />
    </div>
  );
};

export default StoreHome;

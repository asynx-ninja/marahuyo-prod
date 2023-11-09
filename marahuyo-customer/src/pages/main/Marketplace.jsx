import Header2 from "../../components/global/Header2";
import Banner from "../../components/global/Banner";
import AboutUs from "../../components/global/AboutUs";
import Footer from "../../components/global/Footer";
import SortCategory from "../../components/product/SortCategory";
import ItemList from "../../components/product/ItemList";
import React, { useState, useEffect } from "react";

const Marketplace = () => {
  const [isBackButtonClicked, setBackbuttonPress] = useState(false);
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("")

  const onSearch = (e) => {
    setSearch(e.target.value)
  }

  console.log("Search: " + search)

  const getCategory = (childData) => {
    setCategory(childData);
  };

  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);

    // //logic for showing popup warning on page refresh
    // window.onbeforeunload = function () {
    //     return "Data will be lost if you leave the page, are you sure?";
    // };

    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!isBackButtonClicked) {
      window.history.pushState(null, null, window.location.pathname);
      setBackbuttonPress(false);
    }
  };

  return (
    <div className="bg-gray-100">
      <Header2 onSearch={onSearch}/>
      <Banner />
      <div className="w-full flex-col m-auto mb-5">
        <SortCategory getCategory={getCategory} />
        <div className="w-[93%] m-auto">
          <ItemList category={category} search={search} />
        </div>
      </div>
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Marketplace;

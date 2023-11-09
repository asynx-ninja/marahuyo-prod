import Header2 from "../../components/global/Header2";
import OrgList from "../../components/product/OrgList";
import SortCategory from "../../components/product/SortCategory";
import ItemList from "../../components/product/ItemList";
import AboutUs from "../../components/global/AboutUs";
import Footer from "../../components/global/Footer";
import { useState } from "react";

const Mall = () => {
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("")

  const onSearch = (e) => {
    setSearch(e.target.value)
  }

  const getCategory = (childData) => {
    setCategory(childData);
  };

  return (
    <div>
      <Header2 onSearch={onSearch}/>
      <OrgList />
      {/* Lagyan niyo ng sorting to by category sa taas gawa kayo component */}
      <SortCategory getCategory={getCategory} />
      <div className="mb-5">
        <ItemList category={category} search={search}/>
      </div>
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Mall;

import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Variants = ({ handleOnChange, setVariantDisplay }) => {
  const location = useLocation();
  const prod_name = location.hash.split("#")[1]; // GET PRODUCT ID FROM PARAMETERS (URL)

  const [variant, setVariant] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/get_variants/` + prod_name
        ); // GET VARIANTS FROM DATABASE
        res.data[0] === undefined
          ? setVariantDisplay(false)
          : setVariantDisplay(true);
        setVariant(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, [prod_name, setVariantDisplay]);

  const handleOnClick = (e) => {
    handleOnChange((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
    }));
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-2 w-8/12">
        {Object.entries(variant).map(([i, value]) => (
          <button key={i}>
            <input
              type="radio"
              onClick={handleOnClick}
              id={value.variant_color}
              name="variant"
              value={value.variant_id}
              className="hidden peer"
              required
            />
            <label
              htmlFor={value.variant_color}
              className="inline-flex items-center justify-between w-full p-4 text-black font-bold bg-white border border-gray-500 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-custom-red peer-checked:text-white peer-checked:bg-orange-400 hover:text-white hover:bg-orange-600 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              {value.variant_color}
            </label>
          </button>
        ))}
      </div>
    </>
  );
};

export default Variants;

import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Sizes = ({ handleOnChange, setSizedisplay }) => {
  const location = useLocation();
  const prod_name = location.hash.split("#")[1]; // GET PRODUCT ID FROM PARAMETERS (URL)

  const [size, setSize] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/get_size/` + prod_name
        ); // GET SIZES FROM DATABASE

        res.data.length !== 0 ? setSizedisplay(true) : setSizedisplay(false);

        const sizes = [
          "XS",
          "S",
          "M",
          "L",
          "XL",
          "2XL",
          "3XL",
          "4XL",
          "5XL",
          "6XL",
          "7XL",
          "8XL",
          "9XL",
        ];

        const data = res.data.sort((a, b) => {
          const indexA = sizes.indexOf(a.size_name);
          const indexB = sizes.indexOf(b.size_name);

          return indexA - indexB;
        });

        setSize(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, [prod_name, setSizedisplay]);

  const handleOnClick = (e) => {
    handleOnChange((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
    }));
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-2 w-8/12">
        {Object.entries(size).map(([i, value]) => (
          <button key={i}>
            <input
              type="radio"
              onClick={handleOnClick}
              id={value.size_name}
              name="size"
              value={value.size_id}
              className="hidden peer"
              required
            />
            <label
              htmlFor={value.size_name}
              className="inline-flex items-center justify-between w-full p-4 text-black font-bold bg-white border border-gray-500 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-custom-red peer-checked:text-white peer-checked:bg-orange-400 hover:text-white hover:bg-orange-600 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              {value.size_name}
            </label>
          </button>
        ))}
      </div>
    </>
  );
};

export default Sizes;

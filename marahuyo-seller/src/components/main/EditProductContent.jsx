import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SuccessAlert from "../global/SuccessAlert";
import InformationAlert from "../global/InformationAlert";
import DangerAlert from "../global/DangerAlert";

const EditProductContent = () => {
  const [alerts, setAlerts] = useState({
    success: {
      value: false,
      text: "",
    },
    danger: {
      value: false,
      text: "",
    },
    info: {
      value: false,
      text: "",
    },
  });

  const [merch, setMerch] = useState({
    name: "",
    desc: "",
    price: 0,
    stocks: 0,
    category: "",
    sizes: [],
    variants: [],
  });

  const [images, setImages] = useState([]);
  const [imageURLS, setImageURLs] = useState([]);

  const location = useLocation();
  const user_id = location.pathname.split("/")[2];
  const prod_id = location.pathname.split("/")[3];

  useEffect(() => {
    let newImageUrls = [];

    images.forEach((image) =>
      newImageUrls.push(
        typeof image === "string" ? image : URL.createObjectURL(image)
      )
    );

    setImageURLs(newImageUrls);
  }, [images]);

  useEffect(() => {
    // if (images.length < 1) return;
    const fetchAllDetails = async () => {
      const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL", "7XL", "8XL", "9XL"];

      const prod_res = await axios.get(
        `http://localhost:8800/get_spec_prod/${prod_id}`
      );
      const cat_res = await axios.get(
        `http://localhost:8800/get_spec_cat/${prod_id}`
      );
      const img_res = await axios.get(
        `http://localhost:8800/get_spec_img/${prod_id}`
      );
      const size_res = await axios.get(
        `http://localhost:8800/get_spec_size/${prod_id}`
      );
      const var_res = await axios.get(
        `http://localhost:8800/get_spec_var/${prod_id}`
      );

      const data = size_res.data.sort((a, b) => {
        const indexA = sizes.indexOf(a.size_name);
        const indexB = sizes.indexOf(b.size_name);

        return indexA - indexB;
      });

      let size_arr = data.map((a) => a.size_name);
      let var_arr = var_res.data.map((a) => a.variant_color);

      setMerch({
        name: prod_res.data[0].prod_name,
        desc: prod_res.data[0].prod_desc,
        price: prod_res.data[0].prod_price,
        stocks: prod_res.data[0].prod_stocks,
        category: cat_res.data[0].category_name,
        sizes: size_arr.toString().split(","),
        variants: var_arr.sort().toString().split(","),
      });

      for (let i = 0; i < img_res.data.length; i++) {
        setImages((f) => [...f, img_res.data[i].image_url]);
      }
    };

    fetchAllDetails();
  }, [prod_id]);

  const onImageChange = (e) => {
    setImages((f) => [...f, ...e.target.files]);
  };

  const handleChange = (e) => {
    setMerch((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === "sizes" || e.target.name === "variants")
      setMerch((prev) => ({
        ...prev,
        [e.target.name]: e.target.value.split(","),
      }));
  };

  const handleDeleteImageClick = (idx) => {
    setImageURLs((prev) => prev.filter((item, index) => index !== idx));
    setImages((prev) => prev.filter((item, index) => index !== idx));
  };

  const handleClick = async () => {
    try {
      await axios.put(
        `http://localhost:8800/update_products/`,
        {
          merch: merch,
          prod_id: prod_id
        }
      );

      await axios.put(`http://localhost:8800/update_category/`, {
        merch: merch,
        prod_id: prod_id,
      });

      if (merch.variants.length !== 0) {
        await axios.delete(`http://localhost:8800/delete_variant/${prod_id}`);

        merch.variants.forEach(async (element) => {
          await axios.post(
            `http://localhost:8800/insert_variants_up/`,
            {
              element: element,
              prod_id: prod_id,
            }
          );
        });
      }

      if (merch.sizes.length !== 0) {
        await axios.delete(`http://localhost:8800/delete_sizes/${prod_id}`);

        merch.sizes.forEach(async (element) => {
          await axios.post(
            `http://localhost:8800/insert_sizes_up/`,
            {
              element: element,
              prod_id: prod_id,
            }
          );
        });
      }

      if (images.length !== 0) {
        await axios.delete(`http://localhost:8800/delete_images/${prod_id}`);

        const filter_str = images.filter((item) => typeof item === "string");
        const filter_file = images.filter((item) => typeof item === "object");

        filter_str.forEach(async (element, idx) => {
          await axios.post(
            `http://localhost:8800/insert_prod_images_str/`,
            {
              element: element,
              prod_id: prod_id,
              idx: idx === 0 ? 1 : 0
            }
          );
        });

        filter_file.forEach(async (element) => {
          var formData = new FormData();
          formData.append("image", element);
          formData.append("prod_id", prod_id);

          await axios.post(
            `http://localhost:8800/insert_prod_images_file/`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
        });
      }

      setAlerts({
        success: {
          value: true,
          text: "Product edited succesfully!",
        },
        danger: {
          value: false,
          text: "",
        },
        info: {
          value: false,
          text: "",
        },
      });

      setTimeout(() => {
        window.location.href = `/inventory/${user_id}`;
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-5">
      {alerts.success.value ? (
        <SuccessAlert text={alerts.success.text} />
      ) : null}
      {alerts.danger.value ? <DangerAlert text={alerts.danger.text} /> : null}
      {alerts.info.value ? <InformationAlert text={alerts.info.text} /> : null}
      <form action="">
        <div
          className="flex items-center mb-4 rounded justify-between flex-wrap bg-blue-500 p-6"
          style={{
            background: "url(/assets/imgs/poly3.png)",
          }}
        >
          <div className="flex items-center flex-shrink-0 text-white">
            <span className="font-bold text-xl">EDIT MERCHANDISE</span>
          </div>
          <button
            type="button"
            onClick={handleClick}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            SAVE CHANGES
          </button>
        </div>

        <div className="flex lg:flex-row sm:flex-col">
          <div className="border rounded-lg p-4 mb-5 lg:w-5/12 sm:w-full lg:mr-5 md:mr-0">
            <h2 className="text-xl font-bold mb-4 ">Basic Information</h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="product-name"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={merch.name}
                onChange={handleChange}
                id="helper-text"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Product Name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <select
                id="categories"
                name="category"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option selected>Choose a category</option>
                <option
                  value="Clothing"
                  selected={merch.category === "Clothing"}
                >
                  Clothing
                </option>
                <option value="Lanyard" selected={merch.category === "Lanyard"}>
                  Lanyard
                </option>
                <option
                  value="Stickers"
                  selected={merch.category === "Stickers"}
                >
                  Stickers
                </option>
                <option value="Bags" selected={merch.category === "Bags"}>
                  Bags
                </option>
                <option value="Pins" selected={merch.category === "Pins"}>
                  Pins
                </option>
                <option value="Bundle" selected={merch.category === "Bundle"}>
                  Bundle
                </option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="product-description"
              >
                Product Description
              </label>

              <textarea
                name="desc"
                id="message"
                value={merch.desc}
                onChange={handleChange}
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write Product Description here!"
                required
              ></textarea>
            </div>
          </div>

          <div className="border rounded-lg p-4 mb-5 lg:w-7/12 sm:w-full">
            <h2 className="text-xl font-bold mb-4 ">Inventory Details</h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="product-name"
              >
                Variants
              </label>
              <input
                type="text"
                value={merch.variants}
                onChange={handleChange}
                name="variants"
                id="helper-text"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Seperated by a comma with no space (E.g. Blue,Black,White)"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="category"
              >
                Sizes
              </label>
              <input
                type="text"
                value={merch.sizes}
                onChange={handleChange}
                name="sizes"
                id="helper-text"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Seperated by a comma with no space and no abbreviation (E.g. Small,Medium)"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="category"
              >
                Price
              </label>
              <input
                type="number"
                onChange={handleChange}
                name="price"
                value={merch.price}
                id="helper-text"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Product Price"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="category"
              >
                Stocks
              </label>
              <input
                type="number"
                value={merch.stocks}
                onChange={handleChange}
                name="stocks"
                id="helper-text"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Product Stocks"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col border rounded-lg p-4">
          <div className="flex items-center justify-between w-full pb-5">
            <h2 className="text-xl font-bold ">Upload Product Images</h2>
            <label
              htmlFor="dropzone-file"
              className={
                images.length === 5
                  ? "hidden"
                  : "flex flex-col items-center justify-center rounded-lg cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              }
            >
              <div className="flex flex-col items-center justify-center">
                <p className="text-sm">
                  <span className="font-semibold">
                    Click to upload (PNG or JPG)
                  </span>
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={onImageChange}
                required
              />
            </label>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {imageURLS.map((imageSrc, idx) => (
              <div className="relative" key={idx}>
                <button
                  type="button"
                  onClick={() => handleDeleteImageClick(idx)}
                  className="absolute right-0 bg-red-600 px-1 rounded-tr-md"
                >
                  <span className="text-white">&times;</span>
                </button>
                <img
                  src={imageSrc}
                  alt="not fount"
                  className="h-auto max-w-full rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProductContent;

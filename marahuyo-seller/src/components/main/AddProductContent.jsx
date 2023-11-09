import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SuccessAlert from "../global/SuccessAlert";
import InformationAlert from "../global/InformationAlert";
import DangerAlert from "../global/DangerAlert";

const AddProductContent = () => {
  const [merch, setMerch] = useState({
    name: "",
    desc: "",
    price: 0,
    stocks: 0,
    category: "",
    sizes: [],
    variants: [],
  });
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

  const [images, setImages] = useState([]);
  const [imageURLS, setImageURLs] = useState([]);

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    // if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

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
      if (
        merch.name === "" ||
        merch.desc === "" ||
        merch.price === 0 ||
        merch.stocks === 0 ||
        merch.category === "" ||
        images.length === 0
      )
        setAlerts({
          success: {
            value: false,
            text: "",
          },
          danger: {
            value: true,
            text: "Fill out all the requirements needed!",
          },
          info: {
            value: false,
            text: "",
          },
        });
      else{
        try {
          const getID = await axios.get(
            `http://localhost:8800/get_shop_id/${id}`
          );

          const getMAXID = await axios.get(
            `http://localhost:8800/get_max_prod_id/`
          );

          const shop_id = getID.data[0].shop_id;
          const max_id =
            getMAXID.data[0].prod_id === null ? 1 : getMAXID.data[0].prod_id;

          const obj = {
            shop_id: shop_id,
            max_id: max_id,
          };

          console.log(obj);
          const prod_res = await axios.post(
            `http://localhost:8800/insert_products/`,
            {
              merch: merch,
              obj: obj,
            }
          );

          const cat_res = await axios.post(
            `http://localhost:8800/insert_category/`,
            {
              merch: merch,
              obj: obj,
            }
          );

          console.log(prod_res);
          console.log(cat_res);

          if (merch.variants.length !== 0) {
            console.log("pepe");

            merch.variants.forEach(async (element) => {
              const var_res = await axios.post(
                `http://localhost:8800/insert_variants/`,
                {
                  element: element,
                  obj: obj,
                }
              );
              console.log(var_res);
            });
          }

          if (merch.sizes.length !== 0) {
            const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];

            merch.sizes.sort((a, b) => {
              const indexA = sizes.indexOf(a.size_name);
              const indexB = sizes.indexOf(b.size_name);

              return indexA - indexB;
            });

            merch.sizes.forEach(async (element) => {
              const size_res = await axios.post(
                `http://localhost:8800/insert_sizes/`,
                {
                  element: element,
                  obj: obj,
                }
              );
              console.log(size_res);
            });
          }

          if (images.length !== 0) {
            console.log("puke");

            images.forEach(async (element, idx) => {
              var formData = new FormData();
              formData.append("image", element);
              formData.append("max_id", obj.max_id);
              formData.append("val", idx === 0 ? 1 : 0);

              const images_res = await axios.post(
                `http://localhost:8800/insert_prod_images/`,
                formData,
                {
                  headers: { "Content-Type": "multipart/form-data" },
                }
              );
              console.log(images_res);
            });
          }

          setAlerts({
            success: {
              value: true,
              text: "Product added succesfully!",
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
            window.location.href = `/inventory/${id}`
          }, 3000);
        } catch (err) {
          console.log(err);
        }
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
            <span className="font-bold text-xl">NEW MERCHANDISE</span>
          </div>
          <button
            type="button"
            onClick={handleClick}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            ADD MERCHANDISE
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
                <option value="Clothing">Clothing</option>
                <option value="Lanyard">Lanyard</option>
                <option value="Stickers">Stickers</option>
                <option value="Bags">Bags</option>
                <option value="Pins">Pins</option>
                <option value="Bundle">Bundle</option>
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

export default AddProductContent;

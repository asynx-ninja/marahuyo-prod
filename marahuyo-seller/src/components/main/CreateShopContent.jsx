import React, { useState } from "react";
import axios from "axios";
import SuccessAlert from "../../components/global/SuccessAlert";
import DangerAlert from "../../components/global/DangerAlert";
import InformationAlert from "../../components/global/InformationAlert";
import { useLocation } from "react-router-dom";

// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";

const CreateShopContent = () => {
  const [logo, setLogo] = useState();
  const [banner, setBanner] = useState();
  const [data, setData] = useState({
    shopname: "",
    desc: "",
    number: "",
    logo: null,
    banner: null,
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

  const location = useLocation();
  // getting the id on the URL
  const id = location.pathname.split("/")[2];

  const handleOnChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnClick = async (e) => {
    e.preventDefault();
    console.log(logo);
    console.log(banner);

    if (logo !== undefined && banner !== undefined)
      // const res = await axios.get(
      //   `http://localhost:8800/get_seller_credentials/${data.email}`
      // );
      try {
        await axios.post(
          `http://localhost:8800/insert_shop_details/${id}`, data);

        var formData = new FormData();

        formData.append("logo", logo);
        formData.append("banner", banner);
        console.log(formData);
        
        await axios.put(
          `http://localhost:8800/insert_shop_image/${id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        setAlerts({
          success: {
            value: true,
            text: "Shop successfully created!",
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
          window.location.href = `/dashboard/${id}`;
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    else {
      setAlerts({
        success: {
          value: false,
          text: "",
        },
        danger: {
          value: true,
          text: "Something went wrong, Please try again!",
        },
        info: {
          value: false,
          text: "",
        },
      });
      setTimeout(() => {
        window.location.href = `/create_shop/${id}`;
      }, 3000);
    }
  };

  const handleImageChange = (e) => {
    setLogo(e.target.files[0]);
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  const handleImageChange2 = (e) => {
    setBanner(e.target.files[0]);
    var output1 = document.getElementById("output2");
    output1.src = URL.createObjectURL(e.target.files[0]);
    output1.onload = function () {
      URL.revokeObjectURL(output1.src); // free memory
    };
  };

  return (
    <div
      className="h-screen flex flex-col"
      style={{ backgroundColor: `#F4EEE0` }}
    >
      {/* HEADER */}
      <div
        className="flex flex-col bg-cover w-full  "
        style={{ backgroundImage: `url("/assets/imgs/abstract_bg.png")` }}
      >
        <div className="flex gap-4 p-5">
          <img className="w-[225px]" src="/assets/imgs/logo_1.png" alt="" />
          <h1 className="my-auto text-[20px] font-bold">|</h1>
          <h1 className="my-auto text-[20px] font-bold">Create Shop Info</h1>
        </div>
        <div
          className="bg-cover bg-center h-2 bg-gray-500 flex flex-col"
          style={{ backgroundImage: `url("/assets/imgs/border.png")` }}
        ></div>
      </div>
      {alerts.success.value ? (
        <SuccessAlert text={alerts.success.text} />
      ) : null}
      {alerts.danger.value ? <DangerAlert text={alerts.danger.text} /> : null}
      {alerts.info.value ? <InformationAlert text={alerts.info.text} /> : null}

      {/* CREATE SHOP FORM */}
      <div className="flex flex-col px-5 py-10 drop-shadow-md">
        <div className="bg-white pb-5">
          <div className="flex flex-col px-6 py-5 w-[100%]">
            <h1 className="text-[20px] font-bold">Create Shop</h1>
            <div
              className="border-b-2 w-[150px] mt-3"
              style={{ borderColor: `#A40000` }}
            >
              <h6
                className="text-[15px] font-bold pt-3 pb-3 ml-3 m-auto"
                style={{ color: `#A40000` }}
              >
                Basic Information
              </h6>
            </div>
          </div>
          {/* FORM */}
          <div className="w-full md: lg:w-[900px] mx-auto">
            <form action="" className="flex flex-col" encType="">
              <div className="flex sm:flex-col-reverse mx-auto w-full lg:flex-row px-6">
                <div className="flex flex-col mx-auto sm:w-[90%] lg:w-[500px] mt-10">
                  <div className="flex sm:flex-col md:flex-row mb-5 gap-5">
                    <h2 className="my-auto w-48 font-bold">Shop Name</h2>
                    <input
                      className="my-auto border-2 rounded-md h-[30px] w-full"
                      type="text"
                      placeholder="Enter Shop Name"
                      name="shopname"
                      onChange={handleOnChange}
                      // defaultValue={data.shopname}
                      required
                    />
                  </div>

                  <div className="flex sm:flex-col md:flex-row mb-5 gap-5">
                    <h2 className="my-auto w-48 font-bold">Shop Number</h2>
                    <input
                      className="my-auto border-2 rounded-md h-[30px] w-full"
                      onChange={handleOnChange}
                      placeholder="Enter Shop Number"
                      name="number"
                      type="number"
                      pattern="^09\d{9}$"
                      id="floating_phone"
                      required
                    />
                    <label
                      htmlFor="floating_phone"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    ></label>
                  </div>
                </div>

                <div className="flex flex-col mb-5 mx-auto">
                  <div className="flex flex-row mb-5 mx-auto gap-5">
                    <div className=" rounded-full md:w-[100px] md:h-[100px] sm:h-[80px] sm:mt-[30px] lg:w-36 lg:h-24 sm:w-[150px] lg:ml-10 md:ml-5 sm:ml-5 mt-5">
                      <img
                        id="output"
                        className="border-4 border-red-600 md:w-[100px] md:h-[100px] sm:w-[150px] sm:h-[80px]  rounded-full"
                        alt=""
                      />
                    </div>

                    <div className="flex flex-col">
                      <h2 className="my-auto font-bold w-[83px] mt-8">
                        Shop Logo
                      </h2>
                      <label
                        className="text-white font-bold w-[83px]  my-auto text-center rounded-full cursor-pointer"
                        htmlFor="file"
                        style={{ backgroundColor: `#A40000` }}
                      >
                        Edit
                      </label>
                      <input
                        className="hidden"
                        type="file"
                        onChange={handleImageChange}
                        name="logo"
                        id="file"
                        required
                      />
                    </div>
                    <div className="mx-auto mt-9">
                      <p className="text-[10px] text-gray-400">
                        Recommended image dimensions: width 300px, height 300px
                      </p>
                      <p className="text-[10px] text-gray-400">
                        Maximum file size: 2.0 MB
                      </p>
                      <p className="text-[10px] text-gray-400">
                        Image format accepted: JPG, JPEG, PNG
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col px-6">
                <div className="flex flex-col mb-5 gap-3">
                  <div className="flex flex-row my-3">
                    <h2 className="my-auto font-bold w-32">Shop Banner</h2>
                    <label
                      className="text-white font-bold w-[83px] my-auto text-center rounded-full cursor-pointer"
                      htmlFor="file1"
                      style={{ backgroundColor: `#A40000` }}
                    >
                      Edit
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      onChange={handleImageChange2}
                      name="banner"
                      id="file1"
                      required
                    />
                  </div>

                  <div className="my-auto  h-40">
                    <img
                      id="output2"
                      className="border-2 border-red-400 w-[900px] h-[160px] object-cover"
                      alt=""
                    />
                  </div>
                </div>

                <div className="flex lg:flex-col sm:flex-col md:flex-row mb-5">
                  <h2 className="w-40 font-bold">Shop Description</h2>
                  <textarea
                    className="my-auto border-2 rounded-md h-[100px] w-full"
                    type="text"
                    placeholder="Shop Description"
                    onChange={handleOnChange}
                    name="desc"
                  />
                </div>
              </div>

              <div className="justify-center ml-6">
                <button
                  type="button"
                  onClick={handleOnClick}
                  className="m-auto text-white justify-center align-center font-bold w-[70px] h-[30px] "
                  style={{ backgroundColor: `#A40000` }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateShopContent;

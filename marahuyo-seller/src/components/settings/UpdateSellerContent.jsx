import React, { useState, useEffect } from "react";
import axios from "axios";
import SuccessAlert from "../../components/global/SuccessAlert";
import DangerAlert from "../../components/global/DangerAlert";
import InformationAlert from "../../components/global/InformationAlert";
import {useLocation } from "react-router-dom";

const UpdateSellerContent = () => {
  const [picture, setPicture] = useState();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    number: "",
    email: "",
    age: 1,
    birthday: "",
    picture: null,
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

  useEffect(() => {
    const fetchAllDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/get_shop_all_details/${id}`
        );
        setData({
          firstname: res.data[0].firstname,
          lastname: res.data[0].lastname,
          number: res.data[0].number,
          birthday: res.data[0].birthday.substr(0, 10),
          picture: res.data[0].picture,
          email: res.data[0].email,
          age: res.data[0].age,
        });
        var img;
        img = document.getElementById("output");
        img.src =
          res.data[0].picture == null
            ? "/assets/imgs/tup_logo.png"
            : res.data[0].picture;

        // await axios.get(`http://localhost:8800/get_seller_all_details/${id}`);
        // setAllDetails(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllDetails();
  }, [id]);

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  };
  const handleOnChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === "birthday") {
      setData((prev) => ({
        ...prev,
        age: calculateAge(e.target.value),
      }));
    }
  };

  const handleImageChange = (e) => {
    setPicture(e.target.files[0]);
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };

    const fileSizeLimit = 5 * 1024 * 1024; // 5MB
    if (setPicture && setPicture.size > fileSizeLimit) {
      alert('File size exceeds the limit of 5MB.');
      e.target.value = null; // Reset the file input
      return;
    }

  };
  const handleOnClick = async (e) => {
    console.log(data)
    
    try {
    const res = await axios.put(`http://localhost:8800/update_seller_details/${id}`, data);
      console.log(res)
      if (picture !== undefined) {
        console.log("tetete");

        if (data.picture !== null)
          await axios.put(`http://localhost:8800/delete_image/${id}`, data);

        var formData = new FormData();

        formData.append("picture", picture);

         await axios.put(
          `http://localhost:8800/update_seller_image/${id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );  
      }

    } catch (err) {
      console.log(err);
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
        window.location.reload();
      }, 3000);
    }
    setAlerts({
      success: {
        value: true,
        text: "Profile details updated successfully!",
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
      window.location.reload();
    }, 3000);
  };

  return (
    <div className="p-4 ">
      {alerts.success.value ? (
        <SuccessAlert text={alerts.success.text} />
      ) : null}
      {alerts.danger.value ? <DangerAlert text={alerts.danger.text} /> : null}
      {alerts.info.value ? <InformationAlert text={alerts.info.text} /> : null}
      {/* CREATE SHOP FORM */}
      <div className="flex flex-col px-5 py-10 drop-shadow-md">
        <div className="bg-white pb-5">
          <div className="flex flex-col px-6 py-5 w-[100%]">
            <h1 className="text-[20px] font-bold">Seller Details</h1>
            <div
              className="border-b-2 w-[150px] mt-3"
              style={{ borderColor: `#A40000` }}
            ></div>
          </div>
          {/* FORM */}
          <div className="w-full md: lg:w-[900px] mx-auto">
            <form action="" className="flex flex-col" encType="">
              <div className="flex sm:flex-col-reverse lg:flex-row w-[80%] mx-auto w-full lg:flex-row px-6">
                <div className="flex flex-col mx-auto sm:w-[90%] lg:w-[500px]">
                  <div className="flex sm:flex-col md:flex-row mb-5 gap-5">
                    <h2 className="my-auto w-40 font-bold">First Name</h2>
                    <input
                      className="my-auto border-2 rounded-md h-[30px] w-full"
                      type="text"
                      defaultValue={data.firstname}
                      placeholder="Enter First Name"
                      name="firstname"
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                  <div className="flex sm:flex-col md:flex-row mb-5 gap-5">
                    <h2 className="my-auto w-40 font-bold">Last Name</h2>
                    <input
                      className="my-auto border-2 rounded-md h-[30px] w-full"
                      type="text"
                      defaultValue={data.lastname}
                      placeholder="Enter Last Name"
                      onChange={handleOnChange}
                      name="lastname"
                      required
                    />
                  </div>
                  <div className="flex sm:flex-col md:flex-row mb-5 gap-5">
                    <h2 className="my-auto w-40 font-bold">E-mail</h2>
                    <input
                      className="my-auto border-2 rounded-md h-[30px] w-full"
                      placeholder="Enter E-mail Address"
                      onChange={handleOnChange}
                      name="email"
                      type="text"
                      defaultValue={data.email}
                      disabled
                    />
                    <label
                      htmlFor="floating_phone"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    ></label>
                  </div>
                  <div className="flex sm:flex-col md:flex-row mb-5 gap-5">
                    <h2 className="my-auto w-40 font-bold">Contact</h2>
                    <input
                      className="my-auto border-2 rounded-md h-[30px] w-full"
                      placeholder="Enter Contact Number"
                      onChange={handleOnChange}
                      name="number"
                      type="number"
                      defaultValue={data.number}
                      pattern="^09\d{9}$"
                      id="floating_phone"
                      required
                    />
                    <label
                      htmlFor="floating_phone"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    ></label>
                  </div>
                  <div className="flex sm:flex-col md:flex-row mb-5 gap-5">
                    <h2 className="my-auto w-40 font-bold">Birthday</h2>
                    <input
                      type="date"
                      id="floating_birthday"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                      placeholder=" "
                      defaultValue={data.birthday}
                      onChange={handleOnChange}
                      name="birthday"
                      required
                    />
                    <label
                      htmlFor="floating_birthday"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      {/* Birthday */}
                    </label>
                  </div>
                </div>

                <div className="flex flex-col mb-5 mx-auto">
                  <div className="flex flex-row mb-5 mx-auto gap-5">
                    <div className=" rounded-full bg-gray-300 h-24 w-36 ml-10">
                      <img
                        id="output"
                        accept=".jpg, .jpeg, .png"
                        className="border-4 border-red-600 md:w-[100px] md:h-[100px] sm:w-[150px] sm:h-[80px]  rounded-full"
                        // src="/assets/imgs/tup logo.png"
                        alt=""
                      />
                    </div>

                    <div className="flex flex-col">
                      <h2 className="my-auto text-center font-bold w-[83px]">
                        Profile Picture
                      </h2>
                      <label
                        className="text-white font-bold w-[83px] my-auto text-center rounded-full cursor-pointer"
                        htmlFor="file"
                        style={{ backgroundColor: `#A40000` }}
                      >
                        Edit
                      </label>
                      <input
                        className="hidden"
                        type="file"
                        onChange={handleImageChange}
                        name="picture"
                        id="file"
                        required
                      />
                    </div>
                    <div className="mx-auto mt-5">
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

              <button
                type="button"
                onClick={handleOnClick}
                className="m-auto text-white font-bold w-[70px] h-[30px] rounded-full"
                style={{ backgroundColor: `#A40000` }}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSellerContent;

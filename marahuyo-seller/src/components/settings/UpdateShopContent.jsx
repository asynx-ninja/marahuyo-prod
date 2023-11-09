import { useLocation } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import SuccessAlert from "../../components/global/SuccessAlert";
import DangerAlert from "../../components/global/DangerAlert";
import InformationAlert from "../../components/global/InformationAlert";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateShopContent = () => {
  const [data, setData] = useState({
    shopname: "",
    desc: "",
    number: "",
    address_line: "",
    region: "",
    province: "",
    city: "",
    brgy: "",
    logo: null,
    banner: null,
  });

  const [logo, setLogo] = useState();
  const [banner, setBanner] = useState();

  const [regionData, setRegion] = useState([]);
  const [provinceData, setProvince] = useState([]);
  const [cityData, setCity] = useState([]);
  const [barangayData, setBarangay] = useState([]);

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

  const region = () => {
    regions().then((response) => {
      setRegion(response);
    });
  };

  const province = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.selectedOptions[0].text,
    }));
    provinces(e.target.value).then((response) => {
      setProvince(response);
      setCity([]);
      setBarangay([]);
    });
  };

  const city = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.selectedOptions[0].text,
    }));
    cities(e.target.value).then((response) => {
      setCity(response);
    });
  };

  const barangay = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.selectedOptions[0].text,
    }));
    barangays(e.target.value).then((response) => {
      setBarangay(response);
    });
  };

  const brgy = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.selectedOptions[0].text,
    }));
  };

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const handleOnChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleImageChange = (e) => {
    setLogo(e.target.files[0]);
    console.log(e.target.files[0]);
    var output1 = document.getElementById("output_1");
    output1.src = URL.createObjectURL(e.target.files[0]);
    output1.onload = function () {
      URL.revokeObjectURL(output1.src); // free memory
    };
  };

  const handleImageChange2 = (e) => {
    setBanner(e.target.files[0]);
    var output2 = document.getElementById("output1");
    output2.src = URL.createObjectURL(e.target.files[0]);
    output2.onload = function () {
      URL.revokeObjectURL(output2.src); // free memory
    };
  };

  useEffect(() => {
    const fetchAllDetails = async () => {
      const get = await axios.get(`http://localhost:8800/getAddress/${id}`);

      const res = await axios.get(
        `http://localhost:8800/get_shop_all_details1/${id}`
      );

      if (get.data.length === 0) {
        setData({
          shopname: res.data[0].shop_name,
          desc: res.data[0].shop_desc,
          number: res.data[0].shop_phone,
          logo: res.data[0].shop_logo,
          banner: res.data[0].shop_banner,
          address_id: 0,
          fullName: "",
          phoneNumber: "",
          address_line: "",
          region: "",
          province: "",
          city: "",
          brgy: "",
          default: "",
          user_id: 0,
        });
      } else {
        setData({
          shopname: res.data[0].shop_name,
          desc: res.data[0].shop_desc,
          number: res.data[0].shop_phone,
          logo: res.data[0].shop_logo,
          banner: res.data[0].shop_banner,
          address_id: get.data[0].address_id,
          fullName: get.data[0].fullname,
          phoneNumber: get.data[0].phoneNumber,
          address_line: get.data[0].address_line,
          region: get.data[0].region,
          province: get.data[0].province,
          city: get.data[0].city,
          brgy: get.data[0].brgy,
          default: "",
          user_id: res.data[0].user_id,
        });
      }
      console.log(res.data[0].shop_logo);
      console.log(res.data[0].shop_banner);
      var img;
      var img1;
      img = document.getElementById("output_1");
      img.src =
        res.data[0].shop_logo == null
          ? "/assets/imgs/tup_logo.png"
          : res.data[0].shop_logo;

      img1 = document.getElementById("output1");
      img1.src =
        res.data[0].shop_banner == null
          ? "/assets/imgs/tup_logo.png"
          : res.data[0].shop_banner;
    };
    fetchAllDetails();
    region();
  }, [id]);

  console.log(data);
  const handleOnClick = async (e) => {
    // e.preventDefault();
    try {
      const get = await axios.get(`http://localhost:8800/getAddress/${id}`);
      console.log(get);
      if (get.data.length === 0)
        await axios.post(`http://localhost:8800/insertAddress/${id}`, data);
      else await axios.put(`http://localhost:8800/updateAddress/${id}`, data);

      await axios.put(`http://localhost:8800/update_shop_details/${id}`, data);

      if (logo !== undefined) {
        if (data.logo !== null)
          await axios.put(`http://localhost:8800/delete_shop_logo/${id}`, data);

        console.log("tetete");
        var formData = new FormData();

        formData.append("logo", logo);

        await axios.put(
          `http://localhost:8800/update_shop_logo/${id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }
      if (banner !== undefined) {
        if (data.banner !== null)
          await axios.put(
            `http://localhost:8800/delete_shop_banner/${id}`,
            data
          );
        console.log("pepe");
        var formData1 = new FormData();

        formData1.append("banner", banner);

        await axios.put(
          `http://localhost:8800/update_shop_banner/${id}`,
          formData1,
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
        text: "Shop details updated successfully!",
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
      {/* CREATE SHOP FORM */}
      {alerts.success.value ? (
        <SuccessAlert text={alerts.success.text} />
      ) : null}
      {alerts.danger.value ? <DangerAlert text={alerts.danger.text} /> : null}
      {alerts.info.value ? <InformationAlert text={alerts.info.text} /> : null}
      <form action="" className="flex flex-col" encType="">
        <div className="flex flex-col px-5 py-5 drop-shadow-md">
          <div className="bg-white pb-5">
            <div className="flex flex-col px-6 py-5 w-[100%]">
              <h1 className="text-[20px] font-bold">Shop Details</h1>
              <div
                className="border-b-2 w-[150px] mt-3"
                style={{ borderColor: `#A40000` }}
              ></div>
            </div>
            {/* FORM */}
            <div className="w-full md: lg:w-[900px] mx-auto">
              <div className="flex sm:flex-col-reverse mx-auto w-full lg:flex-row px-6">
                <div className="flex flex-col mx-auto sm:w-[90%] lg:w-[500px] mt-5">
                  <div className="flex sm:flex-col md:flex-row mb-5 gap-5">
                    <h2 className="my-auto w-48 font-bold">Shop Name</h2>
                    <input
                      className="my-auto border-2 rounded-md h-[30px] w-full"
                      type="text"
                      //   placeholder="Enter Shop Name"
                      name="shopname"
                      onChange={handleOnChange}
                      defaultValue={data.shopname}
                      required
                    />
                  </div>

                  <div className="flex sm:flex-col md:flex-row mb-5 gap-5">
                    <h2 className="my-auto w-48 font-bold">Shop Number</h2>
                    <input
                      className="my-auto border-2 rounded-md h-[30px] w-full"
                      placeholder="Shop Number"
                      defaultValue={data.number}
                      onChange={handleOnChange}
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
                  <div className="flex sm:flex-col md:flex-row mb-5 gap-5">
                    <h2 className="my-auto w-48 font-bold">Current Address</h2>
                    <input
                      className="my-auto border-2 rounded-md h-[30px] w-full"
                      type="text"
                      defaultValue={data.address_line}
                      onChange={handleOnChange}
                      name="address_line"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col mb-5 mx-auto">
                  <div className="flex flex-row mb-5 mx-auto gap-5">
                    <div className=" rounded-full md:w-[100px] md:h-[100px] sm:h-[80px] sm:mt-[30px] lg:w-36 lg:h-24 sm:w-[150px] lg:ml-10 md:ml-5 sm:ml-5 mt-5">
                      <img
                        id="output_1"
                        className="border-4 border-red-600 md:w-[100px] md:h-[100px] sm:w-[150px] sm:h-[80px]  rounded-full"
                        alt="shop logo"
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
                <div className="flex sm:flex-row md:flex-row mb-5 ">
                  <h2 className="my-3 w-48 font-bold">Shop Address</h2>
                  <button
                    data-modal-target="modal-title"
                    data-modal-toggle="modal-title"
                    type="button"
                    className="text-white -ml-14 font-bold w-[150px]  my-auto text-center rounded-full cursor-pointer"
                    style={{ backgroundColor: `#A40000` }}
                  >
                    <span className="">Add Address</span>
                  </button>
                </div>

                <div className="flex flex-col mb-5 gap-3">
                  <div className="flex flex-row my-3 gap-5">
                    <h2 className="my-auto w-48 font-bold">Region</h2>
                    <input
                      className="my-auto border-2 -ml-1 rounded-md h-[30px] w-full"
                      type="text"
                      value={data.region}
                      onChange={handleOnChange}
                      name="region"
                      required
                    />
                    <h2 className="my-auto w-48 font-bold">Province</h2>
                    <input
                      className="my-auto border-2 -ml-1 rounded-md h-[30px] w-full"
                      type="text"
                      value={data.province}
                      onChange={handleOnChange}
                      name="province"
                      required
                    />
                  </div>
                  <div className="flex flex-row my-3 gap-5">
                    <h2 className="my-auto w-48 font-bold">City</h2>
                    <input
                      className="my-auto border-2 -ml-1 rounded-md h-[30px] w-full"
                      type="text"
                      value={data.city}
                      onChange={handleOnChange}
                      name="city"
                      required
                    />
                    <h2 className="my-auto w-48 font-bold">Barangay</h2>
                    <input
                      className="my-auto border-2 -ml-1 rounded-md h-[30px] w-full"
                      type="text"
                      value={data.brgy}
                      onChange={handleOnChange}
                      name="brgy"
                      required
                    />
                  </div>
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

                  <div className="my-auto bg-gray-300  h-40">
                    <img
                      id="output1"
                      className="border-2 border-red-400 w-[900px] h-[160px] object-cover"
                      alt="shop banner"
                    />
                  </div>
                </div>

                <div className="flex lg:flex-col sm:flex-col md:flex-row mb-5">
                  <h2 className="w-40 font-bold">Shop Description</h2>
                  <textarea
                    className="my-auto border-2 rounded-md h-[100px] w-full"
                    type="text"
                    placeholder="Shop Description"
                    defaultValue={data.desc}
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
            </div>
          </div>
        </div>
        <div
          id="modal-title"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100">
                  <AiOutlinePlus
                    className="h-6 w-6 text-orange-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="text-center mt-4">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Add Address
                  </h3>
                </div>
                <div className="mt-3 sm:mt-5">
                  <div className="mt-6">
                    <div className="space-y-6">
                      <div className="md:flex md:items-center md:space-x-4">
                        {/* <div className="md:w-1/2">
                        <label
                          htmlFor="full-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Full Name
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="fullName"
                            id="full-name"
                            className="focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                            placeholder="Enter your full name"
                            onChange={handleOnChange}
                          />
                        </div>
                      </div> */}
                        {/* <div className="md:w-1/2">
                        <label
                          htmlFor="phone-number"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone Number
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="tel"
                            name="phoneNumber"
                            id="phone-number"
                            className="focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                            placeholder="Enter your phone number"
                            onChange={handleOnChange}
                            defaultValue={data.number}
                          />
                        </div>
                      </div> */}
                      </div>

                      <div className="space-y-6">
                        <div className="md:flex md:items-center md:space-x-4">
                          <div className="md:w-1/2">
                            <label
                              htmlFor="region"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Region
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <select
                                className="focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                name="region"
                                onChange={province}
                                onSelect={region}
                              >
                                {data.region === "" ? (
                                  <option disabled>Select Region</option>
                                ) : (
                                  <option selected>{data.region}</option>
                                )}
                                {regionData &&
                                  regionData.length > 0 &&
                                  regionData.map((item) => (
                                    <option
                                      key={item.region_code}
                                      value={item.region_code}
                                    >
                                      {item.region_name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div className="md:w-1/2">
                            <label
                              htmlFor="province"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Province
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <select
                                className="focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                name="province"
                                onChange={city}
                              >
                                {data.province === "" ? (
                                  <option disabled>Select Province</option>
                                ) : (
                                  <option selected>{data.province}</option>
                                )}
                                {provinceData &&
                                  provinceData.length > 0 &&
                                  provinceData.map((item) => (
                                    <option
                                      key={item.province_code}
                                      value={item.province_code}
                                    >
                                      {item.province_name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="md:flex md:items-center md:space-x-4">
                          <div className="md:w-1/2">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium text-gray-700"
                            >
                              City/Municipality
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <select
                                className="focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                name="city"
                                onChange={barangay}
                              >
                                {data.city === "" ? (
                                  <option disabled>Select City</option>
                                ) : (
                                  <option selected>{data.city}</option>
                                )}
                                {cityData &&
                                  cityData.length > 0 &&
                                  cityData.map((item) => (
                                    <option
                                      key={item.city_code}
                                      value={item.city_code}
                                    >
                                      {item.city_name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div className="md:w-1/2">
                            <label
                              htmlFor="barangay"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Barangay
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <select
                                className="focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                name="brgy"
                                onChange={brgy}
                              >
                                {data.brgy === "" ? (
                                  <option disabled>Select Barangay</option>
                                ) : (
                                  <option selected>{data.brgy}</option>
                                )}
                                {barangayData &&
                                  barangayData.length > 0 &&
                                  barangayData.map((item) => (
                                    <option
                                      key={item.brgy_code}
                                      value={item.brgy_code}
                                    >
                                      {item.brgy_name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[2rem] align-center sm:mt-6 flex flex-row space-x-3">
                <button
                  type="button"
                  data-modal-hide="modal-title"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:text-sm"
                >
                  Add Address
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateShopContent;

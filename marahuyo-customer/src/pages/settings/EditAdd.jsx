import Header2 from "../../components/global/Header2";
import Footer from "../../components/global/Footer";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import Sidebar from "../../components/global/Sidebar";

const EditAdd = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const addressId = window.location.hash.substring(1);
  const [regionData, setRegion] = useState([]);
  const [provinceData, setProvince] = useState([]);
  const [cityData, setCity] = useState([]);
  const [barangayData, setBarangay] = useState([]);
  const [regionAddr, setRegionAddr] = useState("");
  const [provinceAddr, setProvinceAddr] = useState("");
  const [cityAddr, setCityAddr] = useState("");
  const [barangayAddr, setBarangayAddr] = useState("");
  const [formValues, setFormValues] = useState({
    fullName: "",
    phoneNumber: "",
    address_line: "",
  });

  const region = () => {
    regions().then((response) => {
      setRegion(response);
    });
  };

  const province = (e) => {
    setRegionAddr(e.target.selectedOptions[0].text);
    provinces(e.target.value).then((response) => {
      setProvince(response);
      setCity([]);
      setBarangay([]);
    });
  };

  const city = (e) => {
    setProvinceAddr(e.target.selectedOptions[0].text);
    cities(e.target.value).then((response) => {
      setCity(response);
    });
  };

  const barangay = (e) => {
    setCityAddr(e.target.selectedOptions[0].text);
    barangays(e.target.value).then((response) => {
      setBarangay(response);
    });
  };

  const brgy = (e) => {
    setBarangayAddr(e.target.selectedOptions[0].text);
  };

  const handleEditAddress = async (event) => {
    event.preventDefault();
    try {
      // Send a PUT request to update the address
      const response = await axios.put(
        `http://localhost:8800/edit_address/${addressId}`,
        {
          fullName: formValues.fullName,
          phoneNumber: formValues.phoneNumber,
          address_line: formValues.address_line,
          barangay: barangayAddr,
          city: cityAddr,
          province: provinceAddr,
          region: regionAddr,
        }
      );

      // Handle the response from the server
      console.log("Address updated successfully:", response.data);

      // Reset the form values
      setFormValues({
        fullName: "",
        phoneNumber: "",
        address_line: "",
      });

      window.location.href = `/address/${id}`;
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const handleClickCancel = (e) => {
    e.preventDefault();
    window.location.href = `/address/${id}`;
  };

  const handleAddressline = (event) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,

      [event.target.name]: event.target.value,
    }));
  };
  console.log(formValues);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/get_addressId/${addressId}`
        );
        const address = res.data[0];

        // Update the form values with the fetched data
        setFormValues({
          fullName: address.fullName,
          phoneNumber: address.phoneNumber,
          address_line: address.address_line,
        });
        // Fetch the region, province, city, and barangay data
        setBarangayAddr(address.brgy);
        setCityAddr(address.city);
        setProvinceAddr(address.province);
        setRegionAddr(address.region);
        region();
        provinces(address.region).then((response) => {
          setProvince(response);
        });
        cities(address.province).then((response) => {
          setCity(response);
        });
        barangays(address.city).then((response) => {
          setBarangay(response);
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchDetails();
  }, [addressId]);

  return (
    <>
      <Header2 data={id} />
      <div className="w-full bg-custom-gray sm:pb-7 md:py-5">
        <div className="flex">
          <Sidebar data={id} />
          <div className="w-full basis-full">
            <div className="bg-white h-full drop-shadow-xl rounded-md lg:p-10 md:py-10 md:px-5 sm:py-10 sm:px-5 sm:m-3 md:m-0">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100">
                  <FiEdit
                    className="h-6 w-6 text-orange-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="text-center mt-4">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Edit Address
                  </h3>
                </div>
                <div className="mt-3 sm:mt-5">
                  <div className="mt-6">
                    <div className="space-y-6">
                      <div className="md:flex md:items-center md:space-x-4">
                        <div className="md:w-1/2">
                          <label
                            htmlFor="full-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Full Name
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                              value={formValues.fullName}
                              type="text"
                              name="fullName"
                              id="full-name"
                              className="focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                              placeholder="Enter your full name"
                              onChange={handleAddressline}
                            />
                          </div>
                        </div>
                        <div className="md:w-1/2">
                          <label
                            htmlFor="phone-number"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phone Number
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                              value={formValues.phoneNumber}
                              type="tel"
                              name="phoneNumber"
                              id="phone-number"
                              className="focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                              placeholder="Enter your phone number"
                              onChange={handleAddressline}
                              maxLength={11}
                            />
                          </div>
                        </div>
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
                                onChange={province}
                                onSelect={region}
                              >
                                <option selected>{regionAddr}</option>
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
                                onChange={city}
                              >
                                <option selected>{provinceAddr}</option>
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
                                onChange={barangay}
                              >
                                <option selected>{cityAddr}</option>
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
                                onChange={brgy}
                              >
                                <option selected>{barangayAddr}</option>
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
                        <div>
                          <label className=" mb-2 ">Address Line</label>
                          <input
                            value={formValues.address_line}
                            type="text"
                            onChange={handleAddressline}
                            name="address_line"
                            placeholder="Street Name, Building, House No."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-custom-blue"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[2rem] sm:mt-6 flex flex-row space-x-3">
                <button
                  onClick={handleEditAddress}
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:text-sm"
                >
                  Update
                </button>
                <button
                  onClick={handleClickCancel}
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-5 shadow-sm px-4 py-2 text-base font-medium text-orange-600 border-orange-600 hover:opacity-40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditAdd;

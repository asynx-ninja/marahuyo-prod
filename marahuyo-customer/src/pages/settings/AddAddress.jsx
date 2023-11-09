import Header2 from "../../components/global/Header2";
import Footer from "../../components/global/Footer";
import { useEffect, useState } from "react";
import { useLocation} from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import Sidebar from "../../components/global/Sidebar";

const AddAddress = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  //For address
  const [regionData, setRegion] = useState([]);
  const [provinceData, setProvince] = useState([]);
  const [cityData, setCity] = useState([]);
  const [barangayData, setBarangay] = useState([]);
  const [regionAddr, setRegionAddr] = useState("");
  const [provinceAddr, setProvinceAddr] = useState("");
  const [cityAddr, setCityAddr] = useState("");
  const [barangayAddr, setBarangayAddr] = useState("");
  const [userData, setUserData] = useState([]);
  const [,setAddressList] = useState([]);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    fullName: "",
    phoneNumber: "",
    address_line: "",
  });
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phoneNumber: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
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

  const handleAddAddress = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log(newAddress);

    try {
      // Send a POST request to your backend server
      const response = await axios.post(
        `http://localhost:8800/save_address/${id}`,
        {
          fullName: formValues.fullName,
          phoneNumber: formValues.phoneNumber,
          address_line: formValues.address_line,
          region: regionAddr,
          province: provinceAddr,
          city: cityAddr,
          brgy: barangayAddr,
        }
      );

      if (
        !formValues.fullName ||
        !formValues.phoneNumber ||
        !regionAddr ||
        !provinceAddr ||
        !cityAddr ||
        !barangayAddr ||
        !formValues.address_line
      ) {
        setError("You need to enter all the address details.");
        return;
      }

      setError("");
      // Handle the response from the server
      console.log("Address added successfully:", response.data);

      setAddressList((prevAddressList) => [...prevAddressList, response.data]);

      // Reset the new address form
      setNewAddress({
        address_line: "",
        region: "",
        province: "",
        city: "",
        barangay: "",
      });

      event.preventDefault();
      window.location.href = `/address/${id}`;
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const handleClickCancel = (e) => {
    e.preventDefault();
    window.location.href = `/address/${id}`;
  };

  const handleAddressline = (event) => {
    let value = event.target.value;

    // Remove non-alphanumeric characters
    if (event.target.name === "phoneNumber") {
      value = value.replace(/[^0-9]/g, "");
    }
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [event.target.name]: value,
    }));
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/get_address/${id}`);
        setUserData(res.data);
        region();
      } catch (err) {
        console.log(err);
      }
    };
    fetchDetails();
  }, [id, userData]);

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
                        <div className="md:w-1/2">
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
                              type="tel"
                              name="phoneNumber"
                              id="phone-number"
                              className="focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                              placeholder="Enter your phone number"
                              onChange={handleAddressline || ""}
                              pattern="[0-9]*"
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
                                <option disabled selected>
                                  Select Region
                                </option>
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
                                <option disabled>Select Province</option>
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
                                <option disabled>Select City</option>
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
                                <option disabled>Select Barangay</option>
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
                  onClick={handleAddAddress}
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:text-sm"
                >
                  Add
                </button>
                <button
                  onClick={handleClickCancel}
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-5 shadow-sm px-4 py-2 text-base font-medium text-orange-600 border-orange-600 hover:opacity-40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
              {error && <p>{error}</p>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddAddress;

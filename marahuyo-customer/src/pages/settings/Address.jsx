import Header2 from "../../components/global/Header2";
import Footer from "../../components/global/Footer";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import Sidebar from "../../components/global/Sidebar";

const Address = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/get_address/${id}`);
        setdata(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDetails();
  }, [id]);

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8800/delete_address/${addressId}`
      );
      console.log("Address deleted successfully:", response.data);

      // Filter out the deleted address from the address list
      const updateddata = data.filter(
        (address) => address.address_id !== addressId
      );
      setdata(updateddata);
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleClickAdd = (e) => {
    e.preventDefault();
    navigate(`/addaddress/${id}`);
  };
  const handleClickedit = (e, addressId) => {
    e.preventDefault();
    navigate(`/editadd/${id}#${addressId}`);
  };

  const handleDefault = async (addressId) => {
    try {
      // Send a PUT request to update the address
      const response = await axios.put(
        `http://localhost:8800/set_default_address/${addressId}/${id}`
      );

      // Handle the response from the server
      console.log("Address set as default:", response.data);

      // Update the data to reflect the changes
      const updatedData = data.map((address) => {
        if (address.address_id === addressId) {
          return { ...address, default: "default" };
        } else {
          return { ...address, default: "" };
        }
      });
      setdata(updatedData);
    } catch (error) {
      console.error("Error setting as default:", error);
    }
  };

  return (
    <>
      <Header2 data={id} />
      <div className="w-full bg-custom-gray sm:pb-7 md:py-5">
        <div className="flex">
          <Sidebar data={id} />

          <div className="w-full basis-full">
            <div className="bg-white h-full drop-shadow-xl rounded-md lg:p-10 md:py-10 md:px-5 sm:py-10 sm:px-5 sm:m-3 md:m-0">
              <div className="mb-4 flex justify-between items-center">
                <h1 className="font-bold text-xl">My Address</h1>
                <button
                  onClick={handleClickAdd}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700"
                >
                  <AiOutlinePlus
                    className="-ml-1 mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Add Address
                </button>
              </div>
              <hr />
              {data.length !== 0 ? (
                data.map((address) => (
                  <div
                    key={address.id}
                    className="flex justify-start items-center sm:flex-col-reverse md:flex-row"
                  >
                    <div className="flex justify-between my-3 items-start w-full">
                      <div>
                        <div className="flex justify-start items-center">
                          <h1 className="font-bold mr-2">{address.fullName}</h1>
                          <p className="text-sm text-gray">
                            {address.phoneNumber}
                          </p>
                        </div>
                        <p className="text-sm text-gray">
                          {address.address_line}, {address.brgy}, {address.city}
                          , {address.province}, {address.region}
                        </p>
                        {address.default === "default" ? (
                          <div className=" w-[3.7rem] border-2 text-sm mt-2 text-custom-orange border-custom-orange p-1">
                            Default
                          </div>
                        ) : null}
                      </div>
                      <div className="flex-col justify-end items-end">
                        <div className="flex flex-row text-end text-custom-lblue">
                          <button
                            onClick={(e) =>
                              handleClickedit(e, address.address_id)
                            }
                            className="flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-gray-500 hover:text-gray-700"
                          >
                            <FiEdit
                              className="-ml-1 mr-0.5 h-4 w-4"
                              aria-hidden="true"
                            />
                            Edit
                          </button>
                          <button
                            className="flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-gray-500 hover:text-gray-700"
                            onClick={() =>
                              handleDeleteAddress(address.address_id)
                            }
                          >
                            Delete
                          </button>
                        </div>
                        {address.default !== "default" && (
                          <div className="text-end">
                            <button
                              onClick={() => handleDefault(address.address_id)}
                              className="border-2 text-sm border-gray p-1"
                            >
                              Set as Default
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-orange-500 mt-5 text-[1.5rem] font-semibold">
                  No address found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Address;

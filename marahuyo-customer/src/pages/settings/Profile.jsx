import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import Header2 from "../../components/global/Header2";
import Footer from "../../components/global/Footer";
import Sidebar from "../../components/global/Sidebar";

const Profile = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [selectedImage, setSelectedImage] = useState(null);
  const [userData, setUserData] = useState({
    id: "",
    firstname: "",
    lastname: "",
    number: "",
    birthday: "",
    email: "",
    age: 1,
    picture: null,
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/get_user_id/${id}`);
        const user = res.data[0];

        setUserData({
          id: user.user_id,
          firstname: user.firstname,
          lastname: user.lastname,
          number: user.number,
          birthday: user.birthday.substr(0, 10),
          email: user.email,
          age: user.age,
          picture: user.picture,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "number") {
      const numericValue = value.replace(/[^0-9]/g, "");
      const limitedValue = numericValue.slice(0, 11);
      setUserData((prevData) => ({
        ...prevData,
        [name]: limitedValue,
      }));
    }

    if (name === "birthday") {
      setUserData((prev) => ({
        ...prev,
        age: calculateAge(e.target.value),
      }));
    }
  };

  console.log(userData);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedImage === null) {
        await axios.put(`http://localhost:8800/edit_profile/${id}`, userData);
        window.location.reload();
      } else if (typeof selectedImage === "object") {
        const formData = new FormData();
        formData.append("image", selectedImage);

        await axios.put(`http://localhost:8800/edit_profile/${id}`, userData);
        await axios.put(`http://localhost:8800/updateImage/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        window.location.reload();
      }

      console.log("User data saved successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header2 />
      <div className="w-full bg-custom-gray md:py-5 sm:pb-1">
        <div className="flex">
          <Sidebar />
          <div className="w-full basis-full">
            <div className="bg-white drop-shadow-xl rounded-md lg:p-10 md:py-10 md:px-5 sm:py-10 sm:px-5 sm:m-3 md:m-0">
              <div className="mb-4">
                <h1 className="font-bold text-xl">My Profile</h1>
                <p>Manage and protect your account</p>
              </div>
              <hr />
              <div className="flex justify-start items-center sm:flex-col-reverse md:flex-row">
                <form onSubmit={handleSubmit} className="mr-[5rem]">
                  <div className="flex justify-start my-4 items-center">
                    <h1 className="w-[10rem]">First name:</h1>
                    <input
                      type="text"
                      name="firstname"
                      value={userData.firstname}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-start my-4 items-center">
                    <h1 className="w-[10rem]">Last name:</h1>
                    <input
                      type="text"
                      name="lastname"
                      value={userData.lastname}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-start my-4 items-center">
                    <h1 className="w-[10rem]">Phone Number:</h1>
                    <input
                      type="tel"
                      name="number"
                      value={userData.number}
                      onChange={handleInputChange}
                      className="w-full"
                      pattern="[0-9]*"
                    />
                  </div>
                  <div className="flex justify-start items-center">
                    <h1 className="w-[10rem]">Date of Birth:</h1>
                    <input
                      type="date"
                      name="birthday"
                      value={userData.birthday}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-center items-center mt-5">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="bg-custom-orange px-10 py-2 text-white"
                    >
                      Save
                    </button>
                  </div>
                </form>
                <div className="">
                  <div className="mx-auto rounded-full object-cover w-44 h-44">
                    {selectedImage ? (
                      <img
                        className="w-full h-full object-cover"
                        src={URL.createObjectURL(selectedImage)}
                        alt=""
                      />
                    ) : userData.picture ? (
                      <img
                        className="w-full h-full object-cover"
                        src={userData.picture}
                        alt=""
                      />
                    ) : (
                      <FaUserCircle
                        size={45}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="text-center my-3">
                    Select Profile Picture:{" "}
                  </div>
                  <input
                    className="border border-black w-11/12"
                    type="file"
                    name="image"
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;

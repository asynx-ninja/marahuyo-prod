import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../../components/global/Header";
import Sidebar from "../../components/global/Sidebar";
import SuccessAlert from "../../components/global/SuccessAlert";

const EditUser = () => {
  const [image, setImage] = useState();
  const [alert, setAlert] = useState(false);
  const location = useLocation();
  const acc_id = location.pathname.split("/")[2];
  const [data, setData] = useState({
    id: 0,
    firstname: "",
    lastname: "",
    number: "",
    birthday: "",
    age: 0,
    email: "",
    password: "",
    retype: "",
  });

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

  useEffect(() => {
    const fetchData = async () => {
      var img;
      try {
        const res = await axios.get(
          `http://localhost:8800/get_specific_info/${acc_id}`
        );
        const data = res.data[0];
        const date = data.birthday.substr(0, 10);
        setData({
          id: data.user_id,
          firstname: data.firstname,
          lastname: data.lastname,
          number: data.number,
          birthday: date,
          age: data.age,
          email: data.email,
          password: "",
          retype: "",
          picture: data.picture
        });

        img = document.getElementById("output")
        img.src = data.picture == null ? "/assets/imgs/edit.png" : data.picture
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [acc_id]);

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

  const handleOnClick = async () => {
    try {
      if(image === undefined)
        await axios.put(
          `http://localhost:8800/update_user_info/${acc_id}`,
          data
        );
      else if(typeof image === "object"){
        var formData = new FormData();
        formData.append("image", image);

        await axios.put(
          `http://localhost:8800/update_user_info/${acc_id}`,
          data
        );
        const res = await axios.put(
          `http://localhost:8800/updateImage/${acc_id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        console.log(res)
      }
      
      setAlert(true);

      setTimeout(() => {
        window.location.reload();
      }, 3000)
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <nav className="flex mt-14 pl-10 pt-10 sm:ml-64 " aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a
              href={`/dashboard/${acc_id}`}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Dashboard
            </a>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                Edit My Account
              </span>
            </div>
          </li>
        </ol>
      </nav>
      {alert ? (
        <div className="pl-10 pt-10 pr-10 sm:ml-64">
          <SuccessAlert text={"Account successfuly updated!"} />
        </div>
      ) : null}

      <form action="" className="px-10 py-5 sm:ml-64">
        <div className="mb-5 flex justify-center items-center">
          <img
            id="output"
            alt=""
            srcSet=""
            className="w-[20%] border"
          />
          <div className="ml-5">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <input
              onChange={handleImageChange}
              name="image"
              accept="image/*"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
            />
            <p
              className="mt-1 text-xs text-left text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              SVG, PNG, JPG or GIF (MAX. 800x400px).
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="relative z-0 w-full group">
            <input
              type="text"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
              onChange={handleOnChange}
              name="firstname"
              value={data.firstname}
              required
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
          </div>
          <div>
            <div className="relative z-0 w-fullgroup">
              <input
                type="text"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder=" "
                onChange={handleOnChange}
                name="lastname"
                value={data.lastname}
                required
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last name
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full group">
            <input
              type="number"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
              onChange={handleOnChange}
              name="number"
              value={data.number}
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Contact # (09XXXXXXXXX)
            </label>
          </div>
          <div className="relative z-0 w-full group">
            <input
              type="date"
              id="floating_birthday"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
              onChange={handleOnChange}
              name="birthday"
              value={data.birthday}
              required
            />
            <label
              htmlFor="floating_birthday"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Birthday
            </label>
          </div>
          <div className="relative z-0 w-full group">
            <input
              type="age"
              id="floating_age"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
              onChange={handleOnChange}
              name="age"
              value={data.age}
              required
              disabled
            />
            <label
              htmlFor="floating_age"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Age
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
              onChange={handleOnChange}
              name="email"
              value={data.email}
              required
              disabled
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your email
            </label>
          </div>
        </div>
        <button
          type="button"
          onClick={handleOnClick}
          className="w-full text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditUser;

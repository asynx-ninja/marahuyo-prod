import axios from "axios";
import bcrypt from "bcryptjs";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import SuccessAlert from "../../components/global/SuccessAlert";
import DangerAlert from "../../components/global/DangerAlert";
import InformationAlert from "../../components/global/InformationAlert";

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
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
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const URL = (id) => {
    window.location.href = `/dashboard/${id}`;
  };

  const handleOnChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnNative = async (e) => {
    try {
      const res = await axios.get(
        `http://localhost:8800/get_user_credentials/${data.email}`
      );
      if (res.data.length !== 0) {
        bcrypt.compare(data.password, res.data[0].password, (err, result) => {
          if (err) {
            console.error(err);
          } else if (result && res.data[0].user_type === "admin") {
            setAlerts({
              success: {
                value: true,
                text: "Login Successfully! Please wait...",
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
              URL(res.data[0].user_id);
            }, 3000);
          } else {
            setAlerts({
              success: {
                value: false,
                text: "",
              },
              danger: {
                value: true,
                text: "Invalid email/password/account! Please try again...",
              },
              info: {
                value: false,
                text: "",
              },
            });
          }
        });
      } else {
        setAlerts({
          success: {
            value: false,
            text: "",
          },
          danger: {
            value: true,
            text: "Invalid email or password! Please try again...",
          },
          info: {
            value: false,
            text: "",
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-row-reverse">
      <div className="sm:hidden lg:block relative lg:w-6/12">
        <img
          className="object-cover h-screen"
          src="/assets/imgs/poly2.png"
          alt=""
        />
      </div>
      <div className="lg:w-6/12 h-screen flex flex-col items-center justify-center bg-white">
        <img className="" src="/assets/imgs/LoginLogo.png" alt="" width="75%" />
        {alerts.success.value ? (
          <SuccessAlert text={alerts.success.text} />
        ) : null}
        {alerts.danger.value ? <DangerAlert text={alerts.danger.text} /> : null}
        {alerts.info.value ? (
          <InformationAlert text={alerts.info.text} />
        ) : null}
        <h1 className="sm:text-xl md:text-3xl font-bold text-center sm:mb-5 md:mb-10 mt-1">
          Welcome back, Administrator!
        </h1>
        <form action="" className="w-9/12">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
              name="email"
              onChange={handleOnChange}
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your email
            </label>
          </div>
          <div className="relative z-0 w-full mb-3 group">
            <input
              type={passwordShown ? "text" : "password"}
              id="password"
              onChange={handleOnChange}
              name="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your password
            </label>
            <button
              type="button"
              onClick={togglePassword}
              className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-orange-700  border border-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
            >
              {passwordShown ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </button>
          </div>
          <div className="relative z-0 text-right text-sm mb-6 group">
            <a href="/forgot">Forgot Password?</a>
          </div>
          <button
            type="button"
            onClick={handleOnNative}
            className="w-full text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-2">
          No Account?{" "}
          <span className="font-bold">
            <a href="/signup">Create account</a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

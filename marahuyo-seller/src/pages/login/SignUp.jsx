import axios from "axios";
import bcrypt from "bcryptjs";
import zxcvbn from "zxcvbn";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import SuccessAlert from "../../components/global/SuccessAlert";
import DangerAlert from "../../components/global/DangerAlert";
import InformationAlert from "../../components/global/InformationAlert";

const SignUp = () => {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [repasswordShown, setRePasswordShown] = useState(false);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState({
    id: 0,
    firstname: "",
    lastname: "",
    number: "",
    birthday: new Date(""),
    age: 0,
    email: "",
    password: "",
    retype: "",
    usertype: "seller",
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

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:8800/get_last_id");
        setData({
          id: res.data[0] === undefined ? 1 : res.data[0].id,
          usertype: "seller",
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, []);

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

  const encrypt = (plainText) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(plainText, salt);

    return hash;
  };

  const PasswordValidator = (password) => {
    const result = zxcvbn(password);
    setScore(result.score);
    setErrors(getErrors(password));

    let message = "";
    switch (score) {
      case 0:
        message = "Password is too weak";
        break;
      case 1:
        message = "Password could be stronger";
        break;
      case 2:
        message = "Password is decent";
        break;
      case 3:
        message = "Password is strong";
        break;
      case 4:
        message = "Password is very strong";
        break;
      default:
        message = "";
    }

    setMessage(message);
  };

  const getErrors = (password) => {
    const errors = [];
    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one digit.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/\W/.test(password)) {
      errors.push("Password must contain at least one symbol.");
    }

    return errors;
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
    if (e.target.name === "password") {
      PasswordValidator(e.target.value);
    }
  };

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const RetogglePassword = () => {
    setRePasswordShown(!repasswordShown);
  };

  const handleOnClick = async (e) => {
    console.log(data);
    e.preventDefault();

    if (data.password === data.retype && score >= 3) {
      try {
        const getEmail = await axios.get(
          `http://localhost:8800/get_user_credentials/${data.email}`
        );

        if (getEmail.data.length === 0) {
          const enc = encrypt(data.password);

          await axios.post(`http://localhost:8800/insert_user_details/`, data);
          await axios.post(`http://localhost:8800/insert_user_credentials/`, {
            obj: data,
            encryptedPass: enc,
          });

          setAlerts({
            success: {
              value: true,
              text: "Account successfully created!",
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
            navigate("/");
          }, 3000);
        } else {
          setAlerts({
            success: {
              value: false,
              text: "",
            },
            danger: {
              value: false,
              text: "",
            },
            info: {
              value: true,
              text: "Email has been registered! Please try again!",
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setAlerts({
        success: {
          value: false,
          text: "",
        },
        danger: {
          value: true,
          text: "Incorrect password! Please try again!",
        },
        info: {
          value: false,
          text: "",
        },
      });
    }
  };

  return (
    <>
      <div>
        <div className="flex">
          <div className="sm:hidden lg:block relative lg:w-6/12">
            <img
              className="object-cover h-screen"
              src="/assets/imgs/poly1.png"
              alt=""
              srcSet=""
            />
          </div>
          <div className="lg:w-6/12 h-screen flex flex-col items-center justify-center bg-white">
            <img
              className=""
              src="/assets/imgs/LoginLogo.png"
              alt=""
              width="75%"
            />
            {alerts.success.value ? (
              <SuccessAlert text={alerts.success.text} />
            ) : null}
            {alerts.danger.value ? (
              <DangerAlert text={alerts.danger.text} />
            ) : null}
            {alerts.info.value ? (
              <InformationAlert text={alerts.info.text} />
            ) : null}
            <h1 className="sm:text-xl md:text-3xl font-bold text-center sm:mb-5 md:mb-10 mt-1">
              Create your account
            </h1>
            <form action="" className="w-9/12">
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    id="floating_first_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                    placeholder=" "
                    onChange={handleOnChange}
                    name="firstname"
                    required
                  />
                  <label
                    htmlFor="floating_first_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    First name
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                    placeholder=" "
                    onChange={handleOnChange}
                    name="lastname"
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
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="number"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    id="floating_phone"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                    placeholder=" "
                    onChange={handleOnChange}
                    name="number"
                    required
                  />
                  <label
                    htmlFor="floating_phone"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Contact # (09XXXXXXXXX)
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="date"
                    id="floating_birthday"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                    placeholder=" "
                    onChange={handleOnChange}
                    name="birthday"
                    required
                  />
                  <label
                    htmlFor="floating_birthday"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Birthday
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-1 md:gap-4">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="email"
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                    placeholder=" "
                    onChange={handleOnChange}
                    name="email"
                    required
                  />
                  <label
                    htmlFor="floating_email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Enter your email
                  </label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="mb-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        data-popover-target="popover-password"
                        data-popover-placement="bottom"
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
                    <div
                      data-popover
                      id="popover-password"
                      role="tooltip"
                      className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                    >
                      <div className="p-3 space-y-2">
                        <div>
                          <div>{message}</div>
                          {errors.length > 0 && (
                            <div>
                              <p>
                                Password does not meet the following
                                requirements:
                              </p>
                              <ul>
                                {errors.map((error) => (
                                  <li key={error}>{error}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      <div data-popper-arrow></div>
                    </div>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type={repasswordShown ? "text" : "password"}
                      id="floating_pass"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                      placeholder=" "
                      onChange={handleOnChange}
                      name="retype"
                      required
                    />
                    <button
                      type="button"
                      onClick={RetogglePassword}
                      className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-orange-700  border border-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                    >
                      {repasswordShown ? (
                        <AiOutlineEye size={20} />
                      ) : (
                        <AiOutlineEyeInvisible size={20} />
                      )}
                    </button>
                    <label
                      htmlFor="floating_pass"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Re-type your password
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleOnClick}
                className="w-full text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Register
              </button>
            </form>
            <p className="text-sm text-center mt-2">
              Already have an account?{" "}
              <span className="font-bold">
                <a href="/">Login</a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import bcrypt from "bcryptjs";
import zxcvbn from "zxcvbn";
import SuccessAlert from "../../components/global/SuccessAlert";
import DangerAlert from "../../components/global/DangerAlert";

const Change = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [repasswordShown, setRePasswordShown] = useState(false);
  const [account, setAccount] = useState({
    newPassword: "",
    confirmNewPassword: "",
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
  });
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const RetogglePassword = () => {
    setRePasswordShown(!repasswordShown);
  };

  const handleChange = (e) => {
    setAccount((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === "newPassword") {
      PasswordValidator(e.target.value);
    }
  };

  const encrypt = (plainText) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(plainText, salt);

    return hash;
  };

  const URL = () => {
    window.location.href = `/`;
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

  const handleOnClick = async (e) => {
    e.preventDefault();

    if (account.newPassword !== account.confirmNewPassword && score < 3) {
      setAlerts({
        success: {
          value: false,
          text: "",
        },
        danger: {
          value: true,
          text: "Password didn't matched! Try again!",
        },
      });
    } else {
      try {
        const encryptedPassword = encrypt(account.newPassword);
        await axios.put(`http://localhost:8800/change_pass/${id}`, {
          newPassword: encryptedPassword,
          confirmNewPassword: encryptedPassword,
        });
        setAlerts({
          success: {
            value: true,
            text: "Password successfully changed! Redirecting...",
          },
          danger: {
            value: false,
            text: "",
          },
        });

        setTimeout(() => {
          URL();
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="flex flex-row-reverse">
        <div className="sm:hidden lg:block relative lg:w-6/12">
          <img
            className="object-cover h-screen"
            src="/assets/imgs/poly2.png"
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
          <h1 className="sm:text-xl md:text-3xl font-bold text-center sm:mb-5 md:mb-10 mt-1">
            Create new password
          </h1>
          <form action="" className="w-9/12">
            <div className="mb-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  data-popover-target="popover-password"
                  data-popover-placement="bottom"
                  type={passwordShown ? "text" : "password"}
                  id="password"
                  onChange={handleChange}
                  name="newPassword"
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
                          Password does not meet the following requirements:
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
                name="confirmNewPassword"
                id="confirmNewPassword"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder=" "
                required
                onChange={handleChange}
              />
              <label
                htmlFor="floating_repassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Re-type your new password
              </label>
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
            </div>
            <button
              onClick={handleOnClick}
              type="button"
              className="w-full text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Change;

import Header2 from "../../components/global/Header2";
import Footer from "../../components/global/Footer";
import Sidebar from "../../components/global/Sidebar";
import bcrypt from "bcryptjs";
import zxcvbn from "zxcvbn";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import SuccessAlert from "../../components/global/SuccessAlert";
import DangerAlert from "../../components/global/DangerAlert";
import axios from "axios";

const ChangePass = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [oldpasswordShown, setOldPasswordShown] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [repasswordShown, setRePasswordShown] = useState(false);

  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
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

  const oldTogglePassword = () => {
    setOldPasswordShown(!oldpasswordShown);
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const RetogglePassword = () => {
    setRePasswordShown(!repasswordShown);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword === confirmNewPassword && score >= 3) {
      try {
        const res = await axios.get(`http://localhost:8800/get_oldPass/${id}`);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);
        const result = await bcrypt.compare(oldPassword, res.data[0].password);

        if (result) {
          try {
            await axios.put(`http://localhost:8800/change_password/${id}`, {
              hash,
            });

            setAlerts({
              success: {
                value: true,
                text: "Password successfully changed!",
              },
              danger: {
                value: false,
                text: "",
              },
            });

            setTimeout(() => window.location.reload(), 3000);
          } catch (err) {
            console.error(err);
          }
        } else {
          setAlerts({
            success: {
              value: false,
              text: "",
            },
            danger: {
              value: true,
              text: "Old Password isn't matched!",
            },
          });
        }
      } catch (error) {
        console.error(error);
        setAlerts({
          success: {
            value: false,
            text: "",
          },
          danger: {
            value: true,
            text: "Failed to update password! Please try again!",
          },
        });
      }
    } else {
      setAlerts({
        success: {
          value: false,
          text: "",
        },
        danger: {
          value: true,
          text: "New password and confirm password do not match or Password isn't strong.",
        },
      });
    }
  };

  return (
    <>
      <Header2 data={id} />
      <div className="w-full bg-custom-gray md:py-5 sm:pb-7">
        <div className="flex">
          <Sidebar data={id} />
          <div className="w-full basis-full">
            <div className="bg-white h-full drop-shadow-xl rounded-md lg:p-10 md:py-10 md:px-5 sm:py-10 sm:px-5 sm:m-3 md:m-0">
              <div className="mb-4 flex-col">
                <h1 className="font-bold text-xl">Change Password</h1>
                <p>
                  For your account's security, do not share your password with
                  anyone else
                </p>
              </div>
              <hr />
              {alerts.success.value ? (
                <SuccessAlert text={alerts.success.text} />
              ) : null}
              {alerts.danger.value ? (
                <DangerAlert text={alerts.danger.text} />
              ) : null}
              <form>
                {/* Old Password input */}
                <div className="relative z-0 w-full mb-6 group flex justify-start my-4 items-center">
                  <h1 className="w-[15rem]">Old Password:</h1>
                  <input
                    type={oldpasswordShown ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-11/12"
                  />
                  <button
                    type="button"
                    onClick={oldTogglePassword}
                    className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-orange-700  border border-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                  >
                    {oldpasswordShown ? (
                      <AiOutlineEye size={20} />
                    ) : (
                      <AiOutlineEyeInvisible size={20} />
                    )}
                  </button>
                </div>
                {/* New Password input */}
                <div className="relative z-0 w-full mb-6 group flex justify-start my-4 items-center">
                  <h1 className="w-[15rem]">New Password:</h1>
                  <input
                    data-popover-target="popover-password"
                    data-popover-placement="top"
                    type={passwordShown ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      PasswordValidator(e.target.value);
                    }}
                    className="w-11/12"
                  />
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
                  <div
                    id="popover-password"
                    role="tooltip"
                    className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-82 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
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
                {/* Confirm New Password input */}
                <div className="relative z-0 w-full mb-6 group flex justify-start my-4 items-center">
                  <h1 className="w-[15rem]">Confirm New Password:</h1>
                  <input
                    type={repasswordShown ? "text" : "password"}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-11/12"
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
                </div>
                {/* Submit button */}
                <div className="flex justify-center items-center mt-5">
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="bg-custom-orange px-10 py-2 text-white"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChangePass;
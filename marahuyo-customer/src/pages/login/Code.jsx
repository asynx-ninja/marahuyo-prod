import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import SuccessAlert from "../../components/global/SuccessAlert";
import DangerAlert from "../../components/global/DangerAlert";
import InformationAlert from "../../components/global/InformationAlert";

const Code = () => {
  const [code, setCode] = useState("");
  const [data, setData] = useState({
    id: 0,
    email: "",
    code: 0,
    date: new Date(),
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

  const location = useLocation();
  const id = location.pathname.split("/")[3];

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/get_forgot_pass/` + id
        );
        setData({
          id: res.data[0].forgot_id,
          email: res.data[0].email,
          code: res.data[0].code,
          date: new Date(res.data[0].date),
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchDetails();
  }, [id]);

  // Refs to track the input elements
  const inputRefs = useRef([]);
  const setInputRef = (index, element) => {
    inputRefs.current[index] = element;
  };

  const URL = (id) => {
    window.location.href = `/auth/change/${id}`;
  };

  // This sendConfirmationCode will send another code to Email and Database
  const sendConfirmationCode = async (e) => {
    e.preventDefault();

    await axios.put(
      `http://localhost:8800/update_forgot_credentials/${data.id}`,
      data
    );
    window.location.reload();
  };

  // This handleOnChange will get the code inputted by the user
  const handleOnChange = (event, index) => {
    // Only allow one digit
    if (event.target.value.length > 1) {
      return;
    }

    // Set the code
    setCode((prevState) => {
      const newState =
        prevState.substring(0, index) +
        event.target.value +
        prevState.substring(index + 1);
      return newState;
    });

    // Move the focus to the next input element if there is one
    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  // This handOnClick will determine if the TIME and CODE is valid
  const handleOnClick = () => {
    const currentTime = new Date();
    const maxTime = new Date(data.date.getTime() + 5 * 60000);

    if (code !== "") {
      if (code === data.code) {
        if (currentTime >= data.date && currentTime <= maxTime) {
          setAlerts({
            success: {
              value: true,
              text: "Code confirmed! Redirecting...",
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
            URL(id);
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
              text: `Code expired! Please click below to send again the code on email.`,
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
            text: "Invalid Confirmation Code! Please try again!",
          },
          info: {
            value: false,
            text: "",
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
          value: false,
          text: "",
        },
        info: {
          value: true,
          text: "Please type the OTP first before submitting in!",
        },
      });
    }
  };

  return (
    <div
      className="relative"
      style={{ background: `url('/assets/imgs/abstract_bg.png')` }}
    >
      <div className="flex flex-col items-center justify-center h-screen">
        <img
          className="md:w-[50%] sm:w-[75%]"
          src="/assets/imgs/LoginLogo.png"
          alt=""
        />
        <div className="md:w-[50%] sm:w-[75%]">
          <h1 className="uppercase sm:text-xl md:text-3xl font-bold text-center">
            PASSWORD RESET
          </h1>
          <p className="sm:mb-5 md:mb-10 mt-1 text-center">
            We sent a 6-digit code to <b>{data.email}</b>
          </p>
          {alerts.success.value ? (
            <SuccessAlert text={alerts.success.text} />
          ) : null}
          {alerts.danger.value ? (
            <DangerAlert text={alerts.danger.text} />
          ) : null}
          {alerts.info.value ? (
            <InformationAlert text={alerts.info.text} />
          ) : null}
          <form action="">
            <div className="grid grid-cols-6 md:gap-3 sm:gap-1">
              {[...Array(6)].map((_, index) => (
                <div className="relative z-0 w-full mb-6 group" key={index}>
                  <input
                    type="number"
                    maxLength="1"
                    ref={(el) => setInputRef(index, el)}
                    value={code.charAt(index)}
                    onChange={(event) => handleOnChange(event, index)}
                    className="text-5xl text-center font-bold h-[6rem] rounded-lg block py-2.5 px-0 w-full text-gray-900 bg-transparent border-2 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                    placeholder=" "
                    required
                  />
                </div>
              ))}
            </div>
          </form>

          {alerts.info.value &&
          alerts.info.text ===
            "Code expired! Please click below to send again the code on email." ? (
            <div className="flex justify-center">
              <button
                className="text-blue-500 underline"
                onClick={sendConfirmationCode}
              >
                Click this button to resend the 6-Digit Code
              </button>
            </div>
          ) : null}

          <div className="flex justify-center mt-10">
            <button
              onClick={handleOnClick}
              type="submit"
              className="px-10 py-3 rounded-md bg-blue-500 text-white font-bold"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Code;

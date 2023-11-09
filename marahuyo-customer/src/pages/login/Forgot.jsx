import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import SuccessAlert from "../../components/global/SuccessAlert";
import DangerAlert from "../../components/global/DangerAlert";


const Forgot = () => {
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);
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

  useEffect(() => {
    const fetchAllEmails = async () => {
      try {
        const res = await axios.get("http://localhost:8800/get_user_account");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllEmails();
  }, []);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const valid = data.find((item) => item.email === email);

    if (valid) {
      try {
        const res = await axios.get(
          `http://localhost:8800/get_forgot_credentials/${valid.user_id}`
        );

        if (res.data.length === 0)
          await axios.post(
            "http://localhost:8800/insert_forgot_credentials",
            valid
          );
        else
          await axios.put(
            `http://localhost:8800/update_forgot_credentials/${res.data[0].forgot_id}`,
            valid
          );

        setAlerts({
          success: {
            value: true,
            text: "Email is found! Redirecting...",
          },
          danger: {
            value: false,
            text: "",
          },
        });

        setTimeout(() => {
          URL(valid.user_id);
        }, 3000);
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
          text: "Email isn't found! Please contact the administrator!",
        },
      });
    }
  };

  const URL = (id) => {
    window.location.href = `/auth/code/${id}`;
  };

  return (
    <>
      <div
        className="relative"
        style={{ background: `url("/assets/imgs/abstract_bg.png")` }}
      >
        <div className="flex flex-col items-center justify-center h-screen">
          <img
            className="md:w-[50%] sm:w-[75%]"
            src="/assets/imgs/LoginLogo.png"
            alt=""
          />
          <div className="md:w-[50%] sm:w-[75%]">
            <h1 className="uppercase sm:text-xl md:text-3xl font-bold text-center sm:mb-5 md:mb-10 mt-1">
              FORGOT PASSWORD?
            </h1>
            {alerts.success.value ? (
              <SuccessAlert text={alerts.success.text} />
            ) : null}
            {alerts.danger.value ? (
              <DangerAlert text={alerts.danger.text} />
            ) : null}
            <form action="">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="email"
                  name="email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                  placeholder=" "
                  onChange={handleChange}
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Enter your email
                </label>
              </div>
              <button
                onClick={handleClick}
                id="modalBtn"
                type="submit"
                className="w-full text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgot;

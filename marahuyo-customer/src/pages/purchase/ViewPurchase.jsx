import Header2 from "../../components/global/Header2";
import Footer from "../../components/global/Footer";
import SuccessAlert from "../../components/global/SuccessAlert";
import DangerAlert from "../../components/global/DangerAlert";
import { FaStar } from "react-icons/fa";

import Modal from "@material-ui/core/Modal";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ViewPurchase = () => {
  const location = useLocation();
  const status = location.hash.split("#")[1];
  const user_id = location.pathname.split("/")[2];

  const [purchases, setPurchases] = useState([]);
  const [order, setOrder] = useState([]);
  const [orderItem, setOrderItem] = useState([]);
  const [size, setSize] = useState([]);
  const [variant, setVariant] = useState([]);
  const [stars, setStars] = useState(1);
  const [feedback, setFeedback] = useState("");
  const [displayModal, setDisplayModal] = useState(false);
  const [prodID, setProdID] = useState(0);

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
    const fetch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/get_purchases/${user_id}/${status}`
        );
        const res1 = await axios.get(`http://localhost:8800/get_size`);
        const res2 = await axios.get(`http://localhost:8800/get_variant`);
        const res3 = await axios.get(
          `http://localhost:8800/get_order_id/${user_id}`
        );
        const res4 = await axios.get(`http://localhost:8800/get_order_item`);
        setPurchases(res.data);
        setSize(res1.data);
        setVariant(res2.data);
        setOrder(res3.data);
        setOrderItem(res4.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [user_id, status]);

  const getSize = (data) => {
    const get_size = size.find((item) => item.size_id === data);

    return get_size === undefined ? "" : get_size.size_name;
  };
  const getVariant = (data) => {
    const get_variant = variant.find((item) => item.variant_id === data);

    return get_variant === undefined ? "" : get_variant.variant_color;
  };

  // UPDATES STATUS IF THE USER CANCEL ITS ORDER ITEM
  const onClickCancel = async (e) => {
    await axios.put(`http://localhost:8800/cancel_purchase/${e.target.value}`);

    window.location.reload();
  };

  // DELETE SPECIFIC ITEM FROM PURCHASES
  const onClickDelete = async (e) => {
    await axios.delete(
      `http://localhost:8800/delete_purchase/${e.target.value}/${e.target.id}`
    );

    window.location.reload();
  };

  // SQL STATEMENT TO DELETE ORDER FROM DATABASE
  const deleteOrder = async (order_id) => {
    const res = await axios.delete(
      `http://localhost:8800/delete_order/${order_id}`
    );
    console.log(res);
  };

  // DELETE ORDER IF THERE IS NO MATCH ID ON ORDER ITEM TABLE
  for (let i = 0; i < order.length; i++) {
    const get_order = orderItem.find(
      (item) => item.order_id === order[i].order_id
    );

    if (get_order === undefined) {
      // console.log(order[i].order_id)
      deleteOrder(order[i].order_id);
    }
  }

  // console.log(purchases)
  // console.log(order)

  const orderStatus = () => {
    if (status === "TOPAY") {
      return "To Pay";
    } else if (status === "TOSHIP") {
      return "To Ship";
    } else if (status === "TORECEIVE") {
      return "To Receive";
    } else if (status === "COMPLETED") {
      return "Completed";
    } else if (status === "CANCELLED") {
      return "Cancelled";
    } else if (status === "RETURN") {
      return "Return Refund";
    }
  };

  const handleClose = () => {
    setStars(1);
    setFeedback("");
    setProdID(0);
    setDisplayModal(false);
  };

  const handleOpen = (e) => {
    setDisplayModal(true);
    setProdID(e.target.value);
  };

  const handleFeedback = (e) => {
    setFeedback(e.target.value);
  };

  const onClickSubmitFeedback = async () => {
    if (feedback === "") {
      setAlerts({
        success: {
          value: false,
          text: "",
        },
        danger: {
          value: true,
          text: "Please fill the Feedback Form",
        },
      });
    } else {
      setAlerts({
        success: {
          value: true,
          text: "Feedback sent Successfully",
        },
        danger: {
          value: false,
          text: "",
        },
      });

      // console.log(prodID);

      await axios.post(
        `http://localhost:8800/send_feedback/${user_id}/${prodID}/${stars}/${feedback}`
      );

      setTimeout(() => {
        setStars(1);
        setFeedback("");
        setProdID(0);
        setDisplayModal(false);
        setAlerts({
          success: {
            value: false,
            text: "",
          },
          danger: {
            value: false,
            text: "",
          },
        });
      }, 2000);
    }
  };

  // console.log(prodID)

  return (
    <>
      <Header2 />
      <div className="bg-gray-50">
        <div className="table-responsive">
          <table className="w-full text-sm text-center p-6 text-gray-500 dark:text-gray-400">
            <thead className="text-xs p-6 text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
              <tr className="p-6">
                <th
                  scope="col"
                  className="py-5 hover:bg-gray-200 cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/view/${user_id}#TOPAY`)
                  }
                >
                  To Pay
                </th>

                <th
                  scope="col"
                  className="py-5 hover:bg-gray-200 cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/view/${user_id}#TOSHIP`)
                  }
                >
                  To Ship
                </th>

                <th
                  scope="col"
                  className="py-5 hover:bg-gray-200 cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/view/${user_id}#TORECEIVE`)
                  }
                >
                  To Receive
                </th>

                <th
                  scope="col"
                  className="py-5 hover:bg-gray-200 cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/view/${user_id}#COMPLETED`)
                  }
                >
                  Completed
                </th>

                <th
                  scope="col"
                  className="py-5 hover:bg-gray-200 cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/view/${user_id}#CANCELLED`)
                  }
                >
                  Cancelled
                </th>

                <th
                  scope="col"
                  className="py-5 hover:bg-gray-200 cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/view/${user_id}#RETURN`)
                  }
                >
                  Return
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="bg-gray-100 pt-20">
          {Object.entries(purchases).map(([i, item]) => (
            <div
              key={i}
              className="mx-auto -mt-16 justify-center sm:flex sm:space-x-6 px-6"
            >
              <div className="rounded-lg md:w-full sm:w-full mb-[50px]">
                <div className="justify-between mb-6 rounded-lg bg-white p-2 shadow-md flex justify-start">
                  <img
                    src={item.image_url}
                    alt=""
                    className="rounded-lg w-[125px] mr-4"
                  />
                  <div className="flex sm:w-full justify-between">
                    <div className="mt-5 sm:mt-0 justify-start">
                      <div className="flex gap-2">
                        <h2 className="lg:text-[20px] md:text-[15px] font-bold text-gray-900 sm:text-[0.7rem]">
                          {item.prod_name}
                        </h2>
                        <p
                          id="status"
                          className={`${
                            status === "CANCELLED" || status === "RETURN"
                              ? "m-auto text-[10px] text-red-500 font-bold"
                              : "m-auto text-[10px] text-custom-green font-bold"
                          }`}
                        >
                          {orderStatus()}
                        </p>
                      </div>
                      <p className="mt-1 text-[10px] text-gray-700">
                        Variant: <b>{getVariant(item.prod_variant_id)} </b>
                      </p>
                      <p className="mt-1 text-[10px] text-gray-700">
                        Size: <b>{getSize(item.prod_size_id)} </b>
                      </p>
                      <h3 className="mt-2 font-medium text-[10px]">
                        Quantity: {item.product_qty}
                      </h3>
                    </div>
                    <div className="flex-col mr-2 justify-end">
                      <div className="flex justify-end">
                        <p className="text-[15px] font-bold ">
                          ₱ {item.prod_price}
                        </p>
                        {/* add the price here */}
                      </div>
                      {status === "TOPAY" ? (
                        <button
                          className="mr-2 my-5 p-2 rounded-md bg-orange-500 text-[12px] text-white font-medium tracking-wide hover:bg-orange-600 transition-colors duration-200"
                          value={item.order_id}
                          onClick={onClickCancel}
                        >
                          Cancel Order
                        </button>
                      ) : (
                        ""
                      )}
                      {status === "COMPLETED" ? (
                        <button
                          className="mr-2 my-5 p-2 rounded-md bg-green-500 text-[12px] text-white font-medium tracking-wide hover:bg-orange-600 transition-colors duration-200"
                          value={item.prod_id}
                          onClick={handleOpen}
                          // onClick={OnFeedbackButton}
                        >
                          Feedback
                        </button>
                      ) : (
                        ""
                      )}
                      {status === "CANCELLED" ? (
                        <button
                          className="mr-2 my-5 p-2 rounded-md bg-orange-500 text-[12px] text-white font-medium tracking-wide hover:bg-orange-600 transition-colors duration-200"
                          id={item.prod_id}
                          value={item.order_id}
                          onClick={onClickDelete}
                        >
                          Delete
                        </button>
                      ) : (
                        ""
                      )}
                      {/* <button className="my-5 p-2 rounded-md bg-blue-500 text-[12px] text-white font-medium tracking-wide hover:bg-blue-600 transition-colors duration-200">
                        Contact Seller
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Product Feedback */}

      <Modal onClose={handleClose} open={displayModal}>
        <div className="fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none">
          <div className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
            <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
              <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                <h5
                  className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                  id="exampleModalScrollableLabel"
                >
                  Product Feedback
                </h5>

                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  onClick={handleClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {alerts.success.value ? (
                <SuccessAlert text={alerts.success.text} />
              ) : null}
              {alerts.danger.value ? (
                <DangerAlert text={alerts.danger.text} />
              ) : null}

              <div className="relative px-5 flex flex-col">
                <div className="flex flex-row-reverse justify-center p-5">
                  <div className="flex flex-row-reverse bg-orange-400 justify-center item-center border-[1px] border-orange-700 w-[150px] h-[30px] rounded-lg">
                    <span className="flex flex-row-reverse gap-2">
                      {[5, 4, 3, 2, 1].map((value) => (
                        <FaStar
                          className={`${
                            value <= stars
                              ? "text-yellow-200 peer peer-hover:text-yellow-200 hover:text-yellow-200 my-auto"
                              : "text-gray-300 peer peer-hover:text-yellow-200 hover:text-yellow-200 my-auto"
                          }`}
                          key={value}
                          onClick={() => setStars(value)}
                        />
                      ))}
                    </span>
                  </div>
                </div>
                <textarea
                  className="my-auto rounded-lg mb-2"
                  name="feedback_desc"
                  id="feedback"
                  // cols="30"
                  rows="5"
                  placeholder="Send your Feedback here...."
                  required
                  value={feedback}
                  onChange={handleFeedback}
                ></textarea>
              </div>

              <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50 gap-3">
                <button
                  type="button"
                  className="inline-block rounded bg-red-500 px-6 pb-2 pt-2 text-white text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="mr-2 my-5 p-2 rounded-md bg-green-500 w-[90px] text-[12px] text-white font-medium tracking-wide hover:bg-orange-600 transition-colors duration-200"
                  onClick={onClickSubmitFeedback}
                >
                  SEND
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Footer />
    </>
  );
};

export default ViewPurchase;

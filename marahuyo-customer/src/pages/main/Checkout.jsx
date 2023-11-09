import Header2 from "../../components/global/Header2";
import Footer from "../../components/global/Footer";
import SuccessAlert from "../../components/global/SuccessAlert";
import DangerAlert from "../../components/global/DangerAlert";

import { BsTruck, BsWallet2 } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const user_id = location.pathname.split("/")[2];
  let obj = location.hash.split("#")[1]
  const [product, setProduct] = useState([])
  const [address, setAddress] = useState([])
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    contact: 0,
  })
  const [payment, setPayment] = useState("cod")

  const item = Object.entries(product).map((item, i) => ({
    cart_id: product[i].cart_id === undefined ? 0 : product[i].cart_id,
    prod_id: product[i].prod_id,
    prod_qty: product[i].prod_qty,
    prod_price: product[i].prod_price,
    prod_size_id: product[i].prod_size_id,
    prod_variant_id: product[i].prod_variant_id
  }));
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
  const [display, setDisplay] = useState(false)
  const [prodDisplay, setProdDisplay] = useState(false)

  const [postsPerPage, setPostsPerPage] = useState(3);
  const lastPostIndex = 1 * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const itemRecord = product.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/get_user_address/${user_id}`);
        const res1 = await axios.get(
          `http://localhost:8800/get_user_data/${user_id}`);
        setProduct(JSON.parse(atob(obj)))
        setAddress(res.data)
        setUser({
          firstname: res1.data[0].firstname,
          lastname: res1.data[0].lastname,
          contact: res1.data[0].number
        })
      } catch (err) {
        console.log(err)
      }
    };
    fetch();
  }, [user_id, obj])

  // console.log(address)

  // Sum of Checkout price
  const getTotalPrice = () => {
    let totalPrice = 0;
    product.forEach((item) => {
      totalPrice = totalPrice + (item.prod_price * item.prod_qty);
    });

    return totalPrice;
  };

  const onClickDelete = async () => {
    window.location.href = (`/marketplace/${user_id}`)
  }

  // Set the payment if COD, GCASH, and MAYA
  const onClickPayment = (e) => {
    setPayment(e.target.value)
  }

  // INSERT ORDER_ITEM AND ORDER
  const onClickPlaceOrder = async () => {
    if (address.length === 0) {
      setAlerts({
        success: {
          value: false,
          text: "",
        },
        danger: {
          value: true,
          text: "No address found, please set an Address before Placing an Order",
        },
      });
    } else {
      try {
        await axios.post(`http://localhost:8800/insert_order/${user_id}/${payment}`, {
          orderSubTotal: getTotalPrice(),
          orderTotal: Object.keys(product).length
        })
        const res = await axios.get(`http://localhost:8800/get_order/${user_id}`)

        const order_id = res.data[0].order_id

        for (let i = 0; i < Object.keys(product).length; i++) {
          try {
            await axios.post(`http://localhost:8800/insert_order_item/${order_id}`, {
              selectedItems: product[i]
            })
            if (item[0].cart_id !== 0) {
              const res = await axios.delete(`http://localhost:8800/delete_cart/${item[i].cart_id}/${user_id}`);
              console.log(res)
            }
          } catch (error) {
            console.log(error)
          }
        }
      } catch (error) {
        console.log(error)
      }

      // ALARMS THE CLIENT WHEN CHECK OUT IS CLICKED
      setAlerts({
        success: {
          value: true,
          text: "Your Order has been Placed",
        },
        danger: {
          value: false,
          text: "",
        },
      });

      setTimeout(() => {
        window.location.href = (`/mall/${user_id}`);
      }, 3000);
    }
  }

  // GET THE NAME FROM DEFAULT ADDRESS
  const getDefaultName = () => {
    const default_name = address.find((item) => item.default === "default")

    const name = [user.firstname, " ", user.lastname]

    return default_name === undefined ? name : default_name.fullName
  }

  // GET THE CONTACT NUMBER FROM DEFAULT ADDRESS
  const getDefaultContact = () => {
    const default_contact = address.find((item) => item.default === "default")

    return default_contact === undefined ? user.contact : default_contact.phoneNumber
  }

  // GET THE ADDRESS FROM DEFAULT ADDRESS
  const getDefaultAddress = () => {
    const default_address = address.find((item) => item.default === "default")

    const default_add = default_address === undefined ? "No Address Found, please set an Address" : [default_address.address_line, ", ", default_address.brgy, ", ", default_address.city, ", ", default_address.province, ", ", default_address.region]

    return default_add
  }

  // ADDRESS OPTION WILL APPEAR WHEN CHANGE BUTTON IS CLICKED
  const onClickDisplay = () => {
    if (display === true) {
      setDisplay(false)
    } else {
      setDisplay(true)
    }
  }

  // SETTING DEFAULT RECEIPIENT AND ADDRESS WHEN CHANGE DEFAULT ADDRESS IS CLICKED
  const setDefault = async (address_id) => {
    try {
      const res = await axios.put(`http://localhost:8800/update_default_add/${address_id}/${user_id}`)
      console.log(res)
    } catch (error) {
      console.log(error)
    }

    window.location.reload()
  }

  const onClickExpand = () => {
    if (prodDisplay === true) {
      setPostsPerPage(product.length)
      setProdDisplay(false)
    } else {
      setPostsPerPage(3)
      setProdDisplay(true)
    }

  }

  // console.log(user)

  return (
    <>
      <Header2 />
      <div className="lg:container px-6 pt-6">
        <h1 className="font-bold text-xl mb-1">Place Order</h1>
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <button
                onClick={onClickDelete}
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Marahuyo
              </button>
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
                  ></path>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                  Checkout
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className="flex sm:flex-col-reverse lg:flex-row m-5">
        <div className="flex-1 mr-4 w-full">
          {alerts.success.value ? (
            <SuccessAlert text={alerts.success.text} />
          ) : null}
          {alerts.danger.value ? (
                <DangerAlert text={alerts.danger.text} />
              ) : null}
          <div className="font-semibold border border-black flex items-center rounded-lg justify-between p-5">
            <div>
              <h1 className="text text-gray-500">RECIPIENT</h1>
              <div className="font-bold flex">
                <p>{getDefaultName()}</p>
                <p className="ml-3">+(63) {getDefaultContact()}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="mt-4 border border-black flex items-center rounded-lg justify-between p-5">
              <div>
                <h1 className="font-semibold text text-gray-500">
                  SHIPPING ADDRESS
                </h1>
                <div className="font-bold flex">
                  <p>{getDefaultAddress()}</p>
                </div>
              </div>
              <div>
                {address.length === 0 ? (
                  <button className="border font-semibold text-sm p-1 rounded-lg bg-gray-100"
                    onClick={() => window.location.href = (`/address/${user_id}`)}
                  >
                    Set an Address
                  </button>
                ) : (
                  <button className="border font-semibold text-sm p-1 rounded-lg bg-gray-100"
                    onClick={onClickDisplay}
                  >
                    CHANGE
                  </button>
                )}
              </div>
            </div>
          </div>
          {display === false ? "" : (
            <div className="mt-4 border border-black flex-col items-center rounded-lg justify-between p-1">
              {Object.entries(address).map(([i, item]) => (
                <div key={i}>
                  {item.default === "default" ? "" : (
                    <div className="m-2 border border-black flex items-center rounded-lg justify-between p-5">
                      <div>
                        <h1 className="font-semibold text text-gray-500">
                          SHIPPING ADDRESS
                        </h1>
                        <div className="font-bold flex">
                          <p>{item.address_line} {item.barangay} {item.city} {item.province} {item.region}</p>
                        </div>
                      </div>
                      <div>
                        <button className="border font-semibold text-sm p-1 rounded-lg bg-gray-100"
                          onClick={() => setDefault(item.address_id)}
                        >
                          SET DEFAULT
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="">
            <div className="bg-[#D9D9D9] p-3 rounded-lg my-3 ">
              <h1>PAYMENT METHOD</h1>
            </div>
            <div>
              <form
                className=""
                action="
            "
              >
                <div className="flex justify-between items-center border py-2 pl-2 pr-4 border-b-black">
                  <div className="flex items-center justify-center">
                    <BsTruck
                      className="mr-2 border border-black p-2 rounded-lg"
                      style={{ fontSize: 50 }}
                    />
                    <label htmlFor="cod">Cash on Delivery</label>
                  </div>
                  <input type="radio" name="payment" id="cod" value={"cod"} onClick={onClickPayment} defaultChecked />
                </div>

                <div id="accordion-open" data-accordion="open">
                  <h2 id="accordion-open-heading-1">
                    <button
                      type="button"
                      className="flex items-center justify-between w-full p-2 border border-b-black font-medium text-left text-black"
                      data-accordion-target="#accordion-open-body-1"
                      aria-expanded="true"
                      aria-controls="accordion-open-body-1"
                    >
                      <span className="flex items-center text-black">
                        <BsWallet2
                          className="mr-2 border border-black p-2 rounded-lg"
                          style={{ fontSize: 50 }}
                        />
                        Payment Center / E-Wallet
                      </span>
                      <svg
                        data-accordion-icon
                        className="w-9 h-6 rotate-180 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </h2>
                  <div
                    id="accordion-open-body-1"
                    className="hidden"
                    aria-labelledby="accordion-open-heading-1"
                  >
                    <div className="p-5 border border-b-0">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center justify-center">
                          <img
                            src="/assets/imgs/gcash.png"
                            height={100}
                            width={100}
                            alt=""
                            srcSet=""
                          />
                          <label htmlFor="gcash" className="ml-3 font-bold">
                            G-Cash
                          </label>
                        </div>
                        <input type="radio" name="payment" id="gcash" value={"gcash"} onClick={onClickPayment} />
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center justify-center">
                          <img
                            src="/assets/imgs/maya.png"
                            height={100}
                            width={100}
                            alt=""
                            srcSet=""
                          />
                          <label htmlFor="maya" className="ml-3 font-bold">
                            Maya
                          </label>
                        </div>

                        <input type="radio" name="payment" id="maya" value={"maya"} onClick={onClickPayment} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-5">
                  <button
                    type="button"
                    className="text-center py-2 w-full bg-black mt-2 rounded-lg text-white font-bold"
                    onClick={onClickPlaceOrder}
                  >
                    Pay and Place Order
                  </button>
                  <button
                    type="button"
                    className="text-center py-2 w-full bg-white border-black border-[1px] mt-2 rounded-lg text-black font-bold"
                    onClick={onClickDelete}
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
        <div className="h-full basis-1/3 rounded-lg border border-black p-5 sm:mb-4 lg:mt-0">
          <div className="font-bold text-lg ">
            <h1>Your Order</h1>
            <hr className="border border-black-100 my-3" />
          </div>
          <div>
            {Object.entries(itemRecord).map(([i, item]) => (
              <div key={i}>
                <div className="flex justify-start items-center">
                  <img
                    src={item.image_url}
                    className="border border-black rounded-lg"
                    height={100}
                    width={100}
                    alt=""
                    srcSet=""
                  />
                  <div className="ml-3">
                    <h1 className="font-bold text-lg">{item.prod_name}</h1>
                    <div className="text-sm flex flex-1">
                      {item.prod_size_id === null ? "" : (
                        <>
                          <p className="text text-gray-500 mr-2">Size:</p>
                          <p className="font-bold mr-2">{item.prod_size_id}</p>
                        </>
                      )}
                      {item.prod_variant_id === null ? "" : (
                        <>
                          <p className="text text-gray-500 mr-2">Color:</p>
                          <p className="font-bold">{item.prod_variant_id}</p>
                        </>
                      )}
                    </div>
                    <div className="text-normal flex flex-1">
                      <p className="font-bold">₱ {item.prod_price}</p>
                      <p className="ml-2 text text-gray-500">x {item.prod_qty}</p>
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
              </div>
            ))}

            <div className="flex justify-center items-center cursor-pointer"
              onClick={onClickExpand}
            >
              <svg
                data-accordion-icon
                className="w-9 h-6 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <div className="flex justify-between items-center mb-3">
                <h1 className="font-bold">Delivery</h1>
                <div className="flex items-center">
                  <p className="font-bold mr-2">₱50.00</p>
                  <span>(J&T Express)</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-3">
                <h1 className="font-bold">Discount</h1>
                <div className="flex items-center">
                  <p className="font-bold">₱ - 50.00</p>
                </div>
              </div>
              <div className="flex justify-between items-center bg-[#ECE8E8] p-3 rounded-lg text-lg">
                <h1 className="font-bold">Total</h1>
                <div className="flex items-center">
                  <p className="font-bold">₱ {getTotalPrice()}</p>
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

export default Checkout;

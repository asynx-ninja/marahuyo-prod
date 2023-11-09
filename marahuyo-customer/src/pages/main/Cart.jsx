import Header2 from "../../components/global/Header2";
import Footer from "../../components/global/Footer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BsPlus, BsTrash } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import DangerAlert from "../../components/global/DangerAlert";

const Cart = () => {
  const location = useLocation();
  const user_id = Number(location.pathname.split("/")[2]); // GET PRODUCT ID FROM PARAMETER (URL)

  const [cart, setCart] = useState([]);
  const [size, setSize] = useState([]);
  const [variant, setVariant] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [alerts, setAlerts] = useState({
    danger: {
      value: false,
      text: "",
    },
  });

  useEffect(() => {
    const fetchAllCart = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/get_all_cart/${user_id}`
        );
        const res1 = await axios.get(`http://localhost:8800/get_size`); // GET PRODUCT DETAILS FROM DATABASE
        const res2 = await axios.get(`http://localhost:8800/get_variant`); // GET PRODUCT DETAILS FROM DATABASE
        setCart(res.data);
        setSize(res1.data);
        setVariant(res2.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCart();
  }, [user_id]);

  const getSize = (data) => {
    const get_size = size.find((item) => item.size_id === data);

    return get_size === undefined ? "" : get_size.size_name;
  };
  const getVariant = (data) => {
    const get_variant = variant.find((item) => item.variant_id === data);

    return get_variant === undefined ? "" : get_variant.variant_color;
  };

  const onClickDelete = async (e) => {
    // console.log(e.target.id, e.target.value)
    try {
      await axios.delete(
        `http://localhost:8800/delete_cart/${e.target.value}/${user_id}`);
    } catch (err) {
      console.log(err);
    }
    window.location.reload()
  }

  // console.log(cart)
  // console.log(selectedItems)

  // Function that handles the selected products
  const handleCheckboxChange = (event, item) => {
    const isChecked = event.target.checked;

    // item.prod_stocks === 0 ? document.getElementById(item.cart_id).disabled = true : document.getElementById(item.cart_id).disabled = false

    if (isChecked) {
      setSelectedItems((prevItems) => [...prevItems, item],);
    } else {
      setSelectedItems((prevItems) =>
        prevItems.filter((prevItem) => prevItem !== item),
      );
    }
  };

  // Funtion to compute the total sum of selected products
  const getTotalPrice = () => {
    let totalPrice = 0;
    selectedItems.forEach((item) => {
      totalPrice += item.prod_total_price;
    });

    return totalPrice;
  };

  // Function to change the current quantity of products
  const updateItemQuantity = async (item, quantity) => {
    const updatedItem = {
      ...item,
      prod_qty: quantity,
      prod_total_price: item.prod_price * quantity
    };

    try {
      await axios.put(`http://localhost:8800/update_cart/${item.cart_id}`, updatedItem);
    } catch (err) {
      console.log(err);
    }

    const updatedCart = cart.map((cartItem) =>
      cartItem === item ? updatedItem : cartItem
    );

    const selected = selectedItems.map((selected) =>
      selected === item ? updatedItem : selected
    );

    setCart(updatedCart);
    setSelectedItems(selected)
  };

  const handleCheckout = async () => {
    const str = btoa(JSON.stringify(selectedItems))

    if (selectedItems[0] === undefined) {
      setAlerts({
        danger: {
          value: true,
          text: "Please select a Product",
        },
      });
    } else {
      window.location.href = (`/checkout/${user_id}#${str}`)
    }
  }

  return (
    <>
      <Header2 />
      <div className="mt-5 flex flex-col">
        <div className="w-11/12 m-auto mb-5">
          <h1 className="font-bold text-lg mb-2">Shopping Cart</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a
                  href={user_id === "undefined" ? (`/#`) : (`/marketplace/${user_id}`)}
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
                  Marketplace
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
                    ></path>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                    My Shopping Cart
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        {alerts.danger.value ? (
          <DangerAlert text={alerts.danger.text} />
        ) : null}
        <div className="flex flex-col sm:mx-[1rem] md:mx-[2rem] lg:mx-[3rem] xl:mx-[4rem] m-auto">
          {Object.entries(cart).map(([i, item]) => (
            <div
              key={i}
              className="flex border-t-2 border-b-2"
              style={{ height: "200px" }}
            >
              <div className="flex sm:px-0 md:px-5 my-auto w-full justify-between">
                <div className="flex">
                  <div className="w-40 h-40 justify-start rounded-lg flex-col"
                    onClick={(e) =>
                      (window.location.href = `/product/${user_id}#${item.prod_name}`)
                    }
                  >
                    <h1 className="z-10 text-center relative h-0 text-black font-bold cursor-pointer"
                      style={{ top: `40%` }}
                    >
                      {item.prod_stocks === 0 ? "Out of Stocks" : ""}
                    </h1>
                    <img
                      className="object-cover rounded-lg h-40 w-40 cursor-pointer"
                      style={item.prod_stocks === 0 ? { filter: `blur(1.5px)` } : { filter: `blur(0px)` }}
                      src={item.image_url}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col ml-2">
                    <h1 className="font-bold truncate sm:w-40 md:w-60 cursor-pointer"
                      onClick={(e) =>
                        (window.location.href = `/product/${user_id}#${item.prod_name}`)
                      }
                    >
                      {item.prod_name}
                    </h1>
                    <div>
                      <div className="flex gap-3 mt-2">
                        <h1 className="text-gray-400 text-xs">
                          ₱ {item.prod_price}
                        </h1>
                        <h1 className="text-gray-400 text-xs">|</h1>
                        <h1 className={`${item.prod_stocks === 0 ? 'text-red-400 text-xs' : 'text-green-500 text-xs'}`}>
                          {item.prod_stocks === 0 ? "Out of Stocks" : item.prod_stocks}
                        </h1>
                      </div>

                      <div className="flex gap-3 mt-2">
                        {item.prod_size_id === null ? "" : (
                          <div className="flex gap-2">
                            <h1 className="text-gray-400 text-xs">Size:</h1>
                            <h1 className="font-bold text-xs">
                              {getSize(item.prod_size_id)}
                            </h1>
                          </div>
                        )}
                        {item.prod_variant_id === null ? "" : (
                          <div className="flex gap-2">
                            <h1 className="text-gray-400 text-xs">Color:</h1>
                            <h1 className="font-bold text-xs">
                              {getVariant(item.prod_variant_id)}
                            </h1>
                          </div>
                        )}
                      </div>

                      <div
                        className="flex h-8 mt-5 border-2 rounded-lg"
                        style={{ width: "90px" }}
                      >
                        <button
                          name="prod_total_price"
                          id="sub"
                          className="w-6 border-r-2 text-black font-bold text-lg"
                          onClick={() =>
                            updateItemQuantity(item, item.prod_qty > 1 ? item.prod_qty - 1 : 1)
                          }
                        >
                          <BiMinus className="m-auto" />
                        </button>
                        <input
                          className="w-10 text-center border-none"
                          name="prod_qty"
                          type="number"
                          value={item.prod_qty}
                          onChange={(e) =>
                            updateItemQuantity(item, parseInt(e.target.value))
                          }
                        />
                        <button
                          name="prod_total_price"
                          id="add"
                          className="w-6 border-l-2 text-black font-bold text-lg"
                          onClick={() =>
                            updateItemQuantity(item, item.prod_stocks === 0 ? 1 : item.prod_qty + 1)
                          }
                        >
                          <BsPlus className="m-auto" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex gap-2 justify-end">
                    <h1 className="text-black font-bold">
                      ₱ {item.prod_total_price}
                    </h1>
                    <input
                      className="rounded-full relative top-1"
                      type="checkbox"
                      onChange={(event) => handleCheckboxChange(event, item)}
                      disabled={item.prod_stocks === 0}
                    />
                  </div>
                  <div className="flex gap-1 text-center">
                    <button className="text-gray-400 text-xs flex"
                      value={item.cart_id}
                      onClick={onClickDelete}>
                      <BsTrash className="m-auto mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="my-5">
          <div className="flex justify-end sm:mr-[1rem] md:mr-[2rem] lg:mr-[3rem] xl:mr-[4rem] gap-3">
            <h1 className="font-bold text-lg align-center my-auto">₱{getTotalPrice()}</h1>
            <button type="button" className="bg-black text-white font-bold w-[8rem] h-[2rem] rounded-xl" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;

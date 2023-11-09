import { useEffect, useState } from "react";
import Header2 from "../../components/global/Header2";
import Header1 from "../../components/global/Header1";
import Footer from "../../components/global/Footer";
import Breadcrumbs from "../../components/product/BreadcrumbsProduct";
import ProductGallery from "../../components/product/ProductGallery";
import Stars from "../../components/product/Stars";
import Sizes from "../../components/product/Sizes";
import Variants from "../../components/product/Variants";
import Quantity from "../../components/product/Quantity";
import ProductDescription from "../../components/product/ProductDescription";
import ProductFeedbacks from "../../components/product/ProductFeedbacks";
import SuccessAlert from "../../components/global/SuccessAlert";
import DangerAlert from "../../components/global/DangerAlert";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const location = useLocation();
  const user_id = location.pathname.split("/")[2]; // GET PRODUCT ID FROM PARAMETER (URL)
  const prod_name = location.hash.split("#")[1]; // GET PRODUCT ID FROM PARAMETERS (URL)

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
  const [Sizedisplay, setSizedisplay] = useState(true);
  const [VariantDisplay, setVariantDisplay] = useState(true);
  const [data, setData] = useState({
    size: 0,
    variant: 0,
    quantity: 0,
  });
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState({
    user_id: 0,
    image_url: "",
    shop_name: "",
    shop_id: 0,
    prod_id: 0,
    prod_name: "",
    desc: "",
    price: 0,
    stocks: 0,
    category_id: 0,
    category: "",
  });

  const handleOnChange = (childData) => {
    setData(childData);
  };

  // const setDisplay = (childData) => {
  //   setVariantDisplay(childData);
  //   setSizedisplay(childData);
  // };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/get_product/` + prod_name
        ); // GET PRODUCT DETAILS FROM DATABASE
        const res1 = await axios.get(
          `http://localhost:8800/get_shopInfo/` + res.data[0].shop_id
        ); // GET SHOP DETAILS FROM DATABASE
        setProduct({
          user_id: user_id,
          image_url: res.data[0].image_url,
          shop_name: res1.data[0].shop_name,
          shop_id: res.data[0].shop_id,
          prod_id: res.data[0].prod_id,
          prod_name: res.data[0].prod_name,
          desc: res.data[0].prod_desc,
          price: res.data[0].prod_price,
          stocks: res.data[0].prod_stocks,
          category_id: res.data[0].category_id,
          category: res.data[0].category_name,
        });
        const res2 = await axios.get(
          `http://localhost:8800/all_cart/${user_id}`
        );
        setCart(res2.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [prod_name, user_id]);

  // console.log(cart)
  // console.log(product)

  const handleOnCart = (e) => {
    if (user_id === "undefined") {
      window.location.href = "/auth/login";
    } else {
      if (VariantDisplay === false) {
        if (data.quantity === 0) {
          message(true);
        } else {
          cartToDatabase();
        }
      } else if (Sizedisplay === false) {
        if (data.quantity === 0) {
          message(true);
        } else {
          cartToDatabase();
        }
      } else {
        if (data.size === 0 || data.variant === 0 || data.quantity === 0) {
          message(false);
        } else {
          cartToDatabase();
        }
      }
    }
  };

  const cartToDatabase = async () => {
    try {
      const size = data.size === 0 ? null : data.size;
      const variant = data.variant === 0 ? null : data.variant;
      const same_item = cart.find(
        (item) =>
          item.prod_id === product.prod_id &&
          item.prod_size_id === size &&
          item.prod_variant_id === variant
      );
      const same_size = cart.find(
        (item) => item.prod_id === product.prod_id && item.prod_size_id === size
      );
      const same_variant = cart.find(
        (item) =>
          item.prod_id === product.prod_id && item.prod_variant_id === variant
      );

      // console.log(same_item)
      // console.log(data)

      if (same_item) {
        same_item.prod_qty += data.quantity;
        same_item.prod_total_price =
          same_item.prod_total_price + product.price * data.quantity;
        if (
          same_item.prod_size_id === null &&
          same_item.prod_variant_id === null
        ) {
          queryDB(true, same_item);
        } else {
          queryDB(true, same_item);
        }
      } else if (same_size) {
        if (same_size.prod_size_id === null) {
          queryDB(false);
        } else {
          queryDB(false);
        }
      } else if (same_variant) {
        if (same_variant.prod_variant_id === null) {
          queryDB(false);
        } else {
          queryDB(false);
        }
      } else {
        queryDB(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const queryDB = async (prop, same_item) => {
    if (prop === true) {
      const res = await axios.put(`http://localhost:8800/update_cart/`, {
        productDetails: same_item,
      });
      message(res.statusText);
    } else {
      const res = await axios.post(`http://localhost:8800/insert_cart/`, {
        productDetails: product,
        productChoice: data,
      });
      message(res.statusText);
    }
  };

  const message = (data) => {
    if (data === "OK") {
      setAlerts({
        success: {
          value: true,
          text: "Successfully Added to Cart",
        },
        danger: {
          value: false,
          text: "",
        },
      });

      setTimeout(() => {
        window.location.href = `/cart/${user_id}`;
      }, 3000);
    } else if (data === true) {
      setAlerts({
        success: {
          value: false,
          text: "",
        },
        danger: {
          value: true,
          text: "Please enter a Quantity",
        },
      });
    } else {
      setAlerts({
        success: {
          value: false,
          text: "",
        },
        danger: {
          value: true,
          text: "Please enter a Size, Variant or Quantity",
        },
      });
    }
  };

  const handleOnCheckout = async () => {
    if (user_id === undefined) {
      window.location.href = "/auth/login";
    } else {
      if (VariantDisplay === false) {
        if (data.quantity === 0) {
          message(true);
        } else {
          checkout();
        }
      } else if (Sizedisplay === false) {
        if (data.quantity === 0) {
          message(true);
        } else {
          checkout();
        }
      } else {
        if (data.size === 0 || data.variant === 0 || data.quantity === 0) {
          message(false);
        } else {
          checkout();
        }
      }
    }
  };

  const checkout = async () => {
    let selectedItems = [
      {
        image_url: product.image_url,
        prod_id: product.prod_id,
        prod_name: product.prod_name,
        prod_price: product.price,
        prod_qty: data.quantity,
        prod_size_id: data.size,
        prod_variant_id: data.variant,
      },
    ];
    const str = btoa(JSON.stringify(selectedItems));

    if (user_id === "undefined") {
      window.location.href = "/auth/login";
    } else {
      setAlerts({
        success: {
          value: true,
          text: "Successfully Checkout. Please wait!",
        },
        danger: {
          value: false,
          text: "",
        },
      });

      setTimeout(() => {
        window.location.href = `/checkout/${user_id}#${str}`;
      }, 3000);
    }
  };

  return (
    <div>
      {user_id === "undefined" ? <Header1 /> : <Header2 />}
      <div>
        <Breadcrumbs data={product.shop_name} />
        <div
          className="lg:mx-12 md:mx-3 sm:mx-3  flex w-580  my-5 rounded-lg bg-cover bg-center "
          style={{ backgroundImage: `url("/assets/imgs/abstract_bg.png")` }}
        >
          <div className="flex lg:flex-row md:flex-col sm:flex-col mx-auto">
            <ProductGallery />
            <div className="w-1/2 px-10 py-5 md:w-full sm:w-full flex flex-col">
              {alerts.success.value ? (
                <SuccessAlert text={alerts.success.text} />
              ) : null}
              {alerts.danger.value ? (
                <DangerAlert text={alerts.danger.text} />
              ) : null}
              <h1 className="text-[250%] flex md:text-4xl font-bold">
                {product.prod_name}
              </h1>
              <h1 className="text-orange-500 text-[200%] font-bold pr-3 ">
                PHP {product.price}
              </h1>

              <div className="mt-7">
                <div className="flex items-center justify-start">
                  <h1 className="w-4/12 text-[130%] font-bold">SHOP FROM</h1>
                  <h1 className="text-[100%] font-bold">{product.shop_name}</h1>
                </div>
                <div className="flex items-center justify-start">
                  <h1 className="w-4/12 text-[130%] font-bold">CATEGORY</h1>
                  <h1 className="text-[100%] font-bold">{product.category}</h1>
                </div>
                <div className="flex items-center justify-start">
                  <h1 className="w-4/12 text-[130%] font-bold">RATINGS</h1>
                  <Stars />
                </div>

                {Sizedisplay ? (
                  <div className="flex items-start justify-start mt-5">
                    <h1 id="size" className="w-4/12 text-[130%] font-bold">
                      SIZES
                    </h1>
                    <Sizes
                      handleOnChange={handleOnChange}
                      setSizedisplay={setSizedisplay}
                    />
                  </div>
                ) : null}

                {VariantDisplay ? (
                  <div
                    id="variant"
                    className="flex items-start justify-start mt-5"
                  >
                    <h1 className="w-4/12 text-[130%] font-bold">VARIANTS</h1>
                    <Variants
                      handleOnChange={handleOnChange}
                      setVariantDisplay={setVariantDisplay}
                    />
                  </div>
                ) : null}

                <div className="flex items-start justify-start mt-10">
                  <h1 className="w-4/12 text-[130%] font-bold">QUANTITY</h1>
                  <Quantity
                    handleOnChange={handleOnChange}
                    data={data}
                    stocks={product.stocks}
                  />
                </div>
              </div>
              <div className="flex flex-row mt-10">
                <button
                  type="button"
                  onClick={handleOnCart}
                  className="w-6/12 h-20 drop-shadow-md text-white bg-[#FF9119] hover:bg-[#FF9119]/80 mr-2 mb-2 sm:text-sm md:text-xl font-bold"
                >
                  ADD TO CART
                </button>
                <button
                  type="button"
                  onClick={handleOnCheckout}
                  className="w-6/12 h-20 drop-shadow-md text-white mr-2 mb-2 bg-cover bg-center sm:text-sm md:text-xl font-bold"
                  style={{ backgroundImage: `url("/assets/imgs/poly3.png")` }}
                >
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductDescription data={product.desc} />
      <ProductFeedbacks />
      <Footer />
    </div>
  );
};

export default Product;

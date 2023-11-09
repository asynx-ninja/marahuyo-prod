import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const StoreBanner = () => {
  const location = useLocation();
  const shop_name = location.hash.split("#")[1]; // GET PRODUCT ID FROM PARAMETER (URL)

  const [store, setStore] = useState({
    user_id: 0,
    shop_name: "",
    shop_desc: "",
    shop_logo: "",
    shop_banner: "",
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/get_shopDetails/` + shop_name
        ); // GET ID AND IMAGE FROM DATABASE
        setStore({
          user_id: res.data[0].user_id,
          shop_name: res.data[0].shop_name,
          shop_desc: res.data[0].shop_desc,
          shop_logo: res.data[0].shop_logo,
          shop_banner: res.data[0].shop_banner,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop_name]);

  return (
    <div>
      <div
        className="flex my-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0,0,0,0.5)), url('${store.shop_banner}')`,
          backgroundPosition: "center",
          backgroundClip: "cover",
        }}
      >
        <div className="flex items-center justify-start px-10 py-5">
          <img
            className="lg:w-[30%] md:w-[50%] sm:w-[120%]"
            src={store.shop_logo}
            alt=""
          />
          <div className="text-white flex flex-col pl-10">
            <h1 className="font-kagitingan w-full lg:text-6xl md:text-5xl sm:text-3xl">
              {store.shop_name}
            </h1>
            <p className="lg:text-lg md:text-[0.8rem] sm:text-[12px]">
              {store.shop_desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreBanner;

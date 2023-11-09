import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Carousel } from "flowbite-react";
import axios from "axios";

const OrgList = () => {
  const location = useLocation();
  const user_id = location.pathname.split("/")[2]; // GET PRODUCT ID FROM PARAMETER (URL)

  const [orgList, setOrgList] = useState([]);

  const Orgs = Object.entries(orgList).map((item, i) => ({
    key: orgList[i].shop_id,
    name: orgList[i].shop_name,
    logo: orgList[i].shop_logo,
    banner: orgList[i].shop_banner,
  }));

  useEffect(() => {
    const fetchAllOrgs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/get_all_orgs"
        );
        setOrgList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllOrgs();
  }, []);

  // console.log(Orgs)

  return (
    <>
      <div className="flex flex-col lg:my-5 md:my-3 sm:my-1">
        <div
          id="animation-carousel"
          className="relative w-full"
        >
          <div className="relative h-56 overflow-hidden md:h-96">

            <Carousel>
              <div>
                <img
                  src="/assets/imgs/banner1.png"
                  srcSet=""
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
                  alt="..."
                />
              </div>
              {Orgs.map((item, i) => (
                <div
                  key={i}
                  className="flex my-5 cursor-pointer"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0,0,0,0.5)), url('${item.banner}')`,
                    backgroundPosition: "center",
                    backgroundClip: "cover",
                  }}
                  onClick={() => { window.location.href = (`/store/${user_id}#${item.name}`) }}
                >
                  <div className="flex items-center justify-start px-10 py-5">
                    <img
                      className="lg:w-[300px] md:w-[300px] sm:w-[120%]"
                      src={item.logo}
                      alt=""
                    />
                    <div className="text-white flex flex-col pl-10">
                      <h1 className="font-kagitingan w-full lg:text-6xl md:text-5xl sm:text-3xl">
                        {item.name}
                      </h1>
                      <p>
                        Click the banner to visit <u><b>{item.name}</b></u> Store
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrgList;

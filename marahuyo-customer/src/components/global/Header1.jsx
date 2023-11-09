const Header1 = () => {

  const OnNavAbout = (e) => {
    document
      .getElementById(e.target.value)
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="mb-5">
        <div
          className="bg-cover bg-center h-65 bg-gray-500 flex flex-col"
          style={{ backgroundImage: `url("/assets/imgs/abstract_bg.png")` }}
        >
          <div className="flex">
            <div
              className="bg-cover bg-center mx-auto mb-3 bg-black w-40 rounded-b-full relative"
              style={{
                backgroundImage: `url("/assets/imgs/poly2.png")`,
                left: "60px",
              }}
            >
              <img
                className="m-auto"
                srcSet="/assets/imgs/tup_logo.png"
                width={"60px"}
                alt=""
              />
            </div>
            <div className="flex gap-3 relative ml-2 top-1 right-3">
              <a
                className="font-bold text-xs h-5 border-b-2 border-red-600 border-opacity-0 border-t-0 border-l-0 border-r-0 hover:border-opacity-100 hover:duration-300 cursor-pointer"
                href="/auth/login"
              >
                Log-In
              </a>
              <h1 className="font-bold text-xs">|</h1>
              <a
                className="font-bold text-xs h-5 border-b-2 border-red-600 border-opacity-0 border-t-0 border-l-0 border-r-0 hover:border-opacity-100 hover:duration-300 cursor-pointer"
                href="/auth/signup"
              >
                Sign-Up
              </a>
            </div>
          </div>
          <div>
            <img
              className="mx-auto px-5"
              srcSet="/assets/imgs/logo_1.png"
              width={"500px"}
              alt=""
            />
          </div>
          <div className="mx-auto mt-5 mb-5">
          </div>
          <div className="mx-auto mb-5">
            <div className="flex">
              <div className="">
                <a
                  className="mx-5 my-auto border-b-2 border-red-600 border-opacity-0 border-t-0 border-l-0 border-r-0 hover:border-opacity-100 hover:duration-300 cursor-pointer"
                  href="/#"
                >
                  HOME
                </a>
              </div>
              •
              <div className="">
                <button
                  id="about_us"
                  value={"about"}
                  onClick={OnNavAbout}
                  className="mx-5 my-auto border-b-2 border-red-600 border-opacity-0 border-t-0 border-l-0 border-r-0 hover:border-opacity-100 hover:duration-300 cursor-pointer"
                >
                  ABOUT US
                </button>
              </div>
              •
              <div className="">
                <a
                  className="mx-5 my-auto border-b-2 border-red-600 border-opacity-0 border-t-0 border-l-0 border-r-0 hover:border-opacity-100 hover:duration-300 cursor-pointer"
                  href="/auth/login"
                >
                  MALL
                </a>
              </div>
              •
              <div className="">
                <a
                  className="mx-5 my-auto border-b-2 border-red-600 border-opacity-0 border-t-0 border-l-0 border-r-0 hover:border-opacity-100 hover:duration-300 cursor-pointer"
                  href="/auth/login"
                >
                  CART
                </a>
              </div>
            </div>
          </div>
          <div
            className="bg-cover bg-center h-5 bg-gray-500 flex flex-col"
            style={{ backgroundImage: `url("/assets/imgs/border.png")` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Header1;

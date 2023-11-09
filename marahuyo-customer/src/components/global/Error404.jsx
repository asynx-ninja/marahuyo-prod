const Error404 = () => {
  return (
    <>
      <div
        className="bg-cover bg-center min-h-screen bg-gray-500 flex flex-col"
        style={{ backgroundImage: `url("/assets/imgs/abstract_bg.png")` }}
      >
        <div className="mx-auto mb-5">
          <img
            className="relative top-20 mx-auto"
            src="./../assets/imgs/circle-lowpoly.png"
            alt=""
            width={"125px"}
          />
          <div
            className="sm:w-4/5 m-auto"
            style={{ backgroundColor: "#FFFBED" }}
          >
            <div className="sm:w-full m-auto">
              <img
                className="mx-auto sm:px-5 sm:pt-20 sm:pb-10 md:px-20"
                src="./../assets/imgs/logo 1.png"
                width={"800px"}
                alt=""
              />
              <div
                className="bg-cover bg-center h-8 bg-gray-500 flex flex-col"
                style={{ backgroundImage: `url("/assets/imgs/border.png")` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <img
            className="mx-auto sm:w-4/5 md:w-2/5"
            src="./../assets/imgs/Error404.png"
            width={"500px"}
            alt=""
          />
          <h1 className="m-auto mt-5 font-bold text-gray-500">
            PAGE NOT FOUND
          </h1>
        </div>
      </div>
    </>
  );
};

export default Error404;

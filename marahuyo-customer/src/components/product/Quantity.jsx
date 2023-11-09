// import { useState } from "react";

const Quantity = ({ handleOnChange, data, stocks }) => {
  const OnChange = (e) => {
    handleOnChange((prev) => ({
      ...prev,
      [e.target.name]: isNaN(Number(e.target.value))
        ? 0
        : Number(e.target.value),
    }));
  };

  const handleOnClick = (e) => {
    if (e.target.id === "sub") {
      handleOnChange((prev) => ({
        ...prev,
        [e.target.name]: data.quantity > 0 ? data.quantity - 1 : 0,
      }));
    } else if (e.target.id === "add") {
      handleOnChange((prev) => ({
        ...prev,
        [e.target.name]: data.quantity === stocks ? data.quantity : data.quantity + 1,
      }));
    }
  };

  return (
    <div className="flex items-center ">
      <button
        type="button"
        id="sub"
        name="quantity"
        onClick={handleOnClick}
        className=" w-10 h-10 text-[100%] drop-shadow-md text-white bg-[#FF9119] hover:bg-[#FF9119]/80 mr-1 "
      >
        -
      </button>
      <input
        type="text"
        className="w-[30%] h-[40%] mx-2 text-center"
        name="quantity"
        id="quantity"
        min={1}
        onChange={OnChange}
        value={data.quantity}
        required
      />
      <button
        type="button"
        id="add"
        name="quantity"
        onClick={handleOnClick}
        className=" w-10 h-10 text-[100%] drop-shadow-md text-white bg-[#FF9119] hover:bg-[#FF9119]/80 mr-2"
      >
        +
      </button>
      <div className="flex items-center">
        <p
          className={`${
            stocks === 0
              ? "text-red-500 font-bold mr-1 text-[13px]"
              : "text-green-500 font-bold mr-1 text-[13px]"
          }`}
        >
          {stocks}
        </p>
        <p className="font-bold text-[13px]">Item/s left</p>
      </div>
    </div>
  );
};

export default Quantity;

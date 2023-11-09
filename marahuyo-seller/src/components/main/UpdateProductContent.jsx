import React from "react";

const UpdateProductContent = () => {
  return (
    <div className="p-5">
      <nav
        className="flex items-center mb-4 rounded justify-between flex-wrap bg-blue-500 p-6"
        style={{
          background: "url(/assets/imgs/poly3.png)",
        }}
      >
        <div className="flex items-center flex-shrink-0 text-white">
          <span className="font-bold text-xl">Update Merchandise</span>
        </div>
        <div className="w-auto flex justify-end">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update Product
          </button>
        </div>
      </nav>

      <form className="flex lg:flex-row md:flex-col sm:flex-col ">
        {/* Left Column */}
        <div className="flex-1 mr-4">
          {/* Basic Information */}
          <h2 className="text-xl font-bold mb-4 ">Basic Information</h2>
          <div className="border rounded-lg p-4 mb-9 bg-white w-full">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="product-name"
              >
                Product Name
              </label>
              <input
                type="email"
                id="helper-text"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Product Name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <select
                id="categories"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a category</option>
                <option value="T">T-Shirts</option>
                <option value="L">Lanyard</option>
                <option value="TB">Tote Bag</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="product-description"
              >
                Product Description
              </label>

              <textarea
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
              ></textarea>
            </div>
          </div>

          {/* Stocks */}
          {/* Picture */}
          <h2 className="text-xl font-bold mb-4">Picture</h2>
          <div
            className="object-cover rounded-lg p-4 mb-6"
            style={{
              background: "url(/assets/imgs/poly1.png)",
            }}
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
              Add Image
            </button>
          </div>

          {/* Videos */}
          <h2 className="text-xl font-bold mb-4">Videos</h2>
          <div
            className="rounded-lg p-4 mb-8"
            style={{
              background: "url(/assets/imgs/poly3.png)",
            }}
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
              Add Video
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 ml-4 md:ml-0 sm:ml-0">
          <div className="flex">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-4">Variants</h2>
              <div className="flex mb-4">
                <ul className="  w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li className="w-full border-b border-gray-200 bg-gray-600 rounded-t-lg dark:border-gray-600">
                    <div className="flex items-center pl-3 ">
                      <input
                        id="color-radio-black"
                        type="radio"
                        value=""
                        name="color-radio"
                        className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        for="list-radio-license"
                        className="w-full py-3 ml-2 text-sm font-medium text-white dark:text-gray-300"
                      >
                        Black
                      </label>
                    </div>
                  </li>
                  <li className="w-full border-b border-gray-200  rounded-t-lg dark:border-gray-600">
                    <div className="flex items-center pl-3">
                      <input
                        id="color-radio-white"
                        type="radio"
                        value=""
                        name="color-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-orange-200 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        for="list-radio-id"
                        className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        White
                      </label>
                    </div>
                  </li>
                  <li className="w-full border-b border-gray-200 bg-blue-600 rounded-b-lg dark:border-gray-600">
                    <div className="flex items-center pl-3">
                      <input
                        id="color-radio-blue"
                        type="radio"
                        value=""
                        name="color-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        for="list-radio-passport"
                        className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Blue
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4">Size</h2>
            <div className="flex mb-5">
              <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="list-radio-license"
                      type="radio"
                      value=""
                      name="size-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="list-radio-license"
                      className="w-full py-3 ml-2 text-sm font-medium text-white-900 dark:text-gray-300 bg-dark"
                    >
                      Small
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="list-radio-id"
                      type="radio"
                      value=""
                      name="size-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="list-radio-id"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Medium
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="list-radio-millitary"
                      type="radio"
                      value=""
                      name="size-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="list-radio-millitary"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Large
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="list-radio-passport"
                      type="radio"
                      value=""
                      name="size-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="list-radio-passport"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Extra-large
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* Variants */}
          <h2 className="text-xl font-bold mb-4 ">Stocks</h2>
          <div className="border rounded-lg p-4 sm:mb-5 bg-white">
            <div className="">
              {/* <label
       className="block text-gray-700 font-bold mb-2"
       htmlFor="number-of-stocks"
     >
       Number of Stocks
     </label> */}
              <input
                type="number"
                id="helper-text"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="No. of Stocks"
              />
            </div>
          </div>

          {/* Price */}
          <h2 className="text-xl font-bold mb-4 mt-2">Price</h2>
          <div className="border rounded-lg p-4 bg-white">
            <div className="">
              {/* <label
       className="block text-gray-700 font-bold mb-2"
       htmlFor="product-price"
     >
       Product Price
     </label> */}
              <div className="flex items-center">
                <span className="mr-2">₱</span>
                <input
                  type="number"
                  id="helper-text"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Product Price"
                />
              </div>
            </div>
          </div>
          {/* <button
   type="button"
   className="mb-2 mt-8 block w-full rounded text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
 >
   Add Product
 </button> */}
        </div>
      </form>
    </div>
  );
};

export default UpdateProductContent;

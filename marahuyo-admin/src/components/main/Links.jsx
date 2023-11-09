const Links = () => {
    const handleOnHoverSeller = () => {
        var id = document.getElementById("iframe")
        id.src = "http://localhost:5001/"
    }

    const handleOnHoverCustomer = () => {
        var id = document.getElementById("iframe")
        id.src = "http://localhost:3000/"
    }

    const handleOnClickSeller = () => {
        window.location.href = "http://localhost:5001/"
    }

    const handleOnClickCustomer = () => {
        window.location.href = "http://localhost:3000/"
    }

  return (
    <div>
      <div className="flex flex-row justify-between items-center mt-8  border-2 border-x-0 border-y-black ">
        <div>
          <h1 className="text-3xl font-bold pl-1">MARAHUYO LINKS</h1>
        </div>
        <div className="py-2">
          <button
            type="button"
            onMouseOver={handleOnHoverSeller}
            onClick={handleOnClickSeller}
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
          >
            SELLER
          </button>
          <button
            type="button"
            onMouseOver={handleOnHoverCustomer}
            onClick={handleOnClickCustomer}
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
          >
            CUSTOMER
          </button>
        </div>
      </div>
        <iframe className="h-screen mt-5 bg-gray-200" id="iframe" name="myFrame" target="myFrame" frameBorder="0" title="myFrame" width="100%">
        </iframe>   
    </div>
  );
};

export default Links;

const ProductDescription = (desc) => {
  const data = desc.data;

  return (
    <div className="lg:mx-12 md:mx-3 sm:mx-3 border-2 flex flex-col h-auto w-580 my-5 rounded-lg bg-cover bg-center">
      <img
        src="./../assets/imgs/product_description.png"
        alt="..."
        className="inset-x-0 top-0 h-auto lg:w-[40%] md:w-[70%] sm:w-[90%] flex"
      />
      <label className="inset-x-0 bottom-0 flex px-5 py-5 text-justify">
        {data}
      </label>
    </div>
  );
};

export default ProductDescription;

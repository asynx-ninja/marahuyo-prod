const Banner = () => {
  const bannerSrc = [
    {
      key: 1,
      url: "/assets/imgs/banner1.png",
      lbl: "Slide 1",
    },
    {
      key: 2,
      url: "/assets/imgs/banner2.png",
      lbl: "Slide 2",
    },
    {
      key: 3,
      url: "/assets/imgs/banner3.png",
      lbl: "Slide 3",
    },
    {
      key: 4,
      url: "/assets/imgs/banner4.png",
      lbl: "Slide 4",
    },
    {
      key: 5,
      url: "/assets/imgs/banner5.png",
      lbl: "Slide 5",
    },
  ];

  return (
    <>
      <div className="flex flex-col lg:my-5 md:my-3 sm:my-1">
        <div
          id="animation-carousel"
          className="relative w-full"
          data-carousel="slide"
        >
          <div className="relative h-56 overflow-hidden md:h-96">
            {bannerSrc.map((item, i) => (
              <div
                key={i}
                className="hidden duration-200 ease-linear"
                data-carousel-item
              >
                <img
                  src={item.url}
                  srcSet=""
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
                  alt="..."
                />
              </div>
            ))}
          </div>
          <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
            {bannerSrc.map((item, i) => (
              <button
                key={i}
                type="button"
                className="w-3 h-3 rounded-full bg-custom-orange"
                aria-current="true"
                aria-label={item.lbl}
                data-carousel-slide-to={i}
              ></button>
            ))}
          </div>
          <button
            type="button"
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
        <div className="flex w-11/12 m-auto mt-5">
          <img src="/assets/imgs/block.png" alt="" srcSet="" />
        </div>
      </div>
    </>
  );
};

export default Banner;

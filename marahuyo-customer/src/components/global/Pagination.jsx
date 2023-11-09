const Pagination = ({ total, postsPerPage, handleOnPage, currentPage }) => {
    const numberPages = Math.ceil(total / postsPerPage)
    const numbers = [...Array(numberPages + 1).keys()].slice(1)

    const handleOnClick = (e) => {
        if (e.target.id === "prev") {
            if (currentPage !== 1) {
                handleOnPage((prev) => (
                    currentPage - 1
                ));
            }
        } else if (e.target.id === "next") {
            if (currentPage !== numberPages) {
                handleOnPage((prev) => (
                    currentPage + 1
                ));
            }
        } else if (e.target.id === "current") {
            handleOnPage((prev) => (
                Number(e.target.value)
            ));
        }
    }

    // console.log(currentPage)

    return (
        <>
            {/* Pagination */}
            <div className="flex mx-auto">
                <nav aria-label="Page navigation example" className="mt-3">
                    <ul className="inline-flex items-center -space-x-px">
                        <li>
                            <button
                                type="button"
                                id="prev"
                                onClick={handleOnClick}
                                className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <svg
                                    id="prev"
                                    onClick={handleOnClick}
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        id="prev"
                                        onClick={handleOnClick}
                                        fillRule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </li>
                        <li>
                            {numbers.map((item, i) => (
                                <button
                                    key={i}
                                    id="current"
                                    value={item}
                                    onClick={handleOnClick}
                                    className={`${currentPage === item ? 'px-3 py-2 leading-tight text-gray-500 bg-gray-300 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white active' : 'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
                                    {item}
                                </button>
                            ))}
                        </li>
                        <li>
                            <button
                                type="button"
                                id="next"
                                onClick={handleOnClick}
                                className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <svg
                                    id="next"
                                    onClick={handleOnClick}
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        id="next"
                                        onClick={handleOnClick}
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Pagination;
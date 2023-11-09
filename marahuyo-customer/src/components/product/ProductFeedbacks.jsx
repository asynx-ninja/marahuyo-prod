import FeedbackStars from "../../components/product/FeedbackStars";
import Pagination from "../../components/global/Pagination";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ProductFeedbacks = () => {

  const location = useLocation();
  const user_id = location.pathname.split("/")[2]; // GET PRODUCT ID FROM PARAMETERS (URL)
  const prod_name = location.hash.split("#")[1]; // GET PRODUCT ID FROM PARAMETERS (URL)
  const hash_star =
    location.hash.split("#")[2] === undefined
      ? "All"
      : location.hash.split("#")[2]; // GET PRODUCT ID FROM PARAMETERS (URL)

  const [feedback, setFeedback] = useState([]);
  const [countFeed, setCountFeedback] = useState([]);
  const [sortFeed, setSortFeed] = useState(0);

  // FOR PAGINATION
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const feedbackRecord = feedback.slice(firstPostIndex, lastPostIndex)

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res1 = await axios.get(
          `http://localhost:8800/get_feedback_count/` + prod_name
        );
        setCountFeedback(res1.data[0]["COUNT(product_feedback.feedback_id)"]);
        if (hash_star === undefined || hash_star === "All") {
          const res = await axios.get(
            `http://localhost:8800/get_feedback/${prod_name}`
          );
          setFeedback(res.data);
        } else {
          const res = await axios.get(
            `http://localhost:8800/get_sort_feedback/${prod_name}/${sortFeed.sort_feedback}`
          );
          setFeedback(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchFeedback();
  }, [prod_name, hash_star, sortFeed]);

  // console.log(feedbackRecord)

  const OnClick = (e) => {
    setSortFeed((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
    }));
    window.location.href = `/product/${user_id}#${prod_name}#${e.target.id}`;
  };

  const handleOnPage = (childData) => {
    setCurrentPage(childData)
  }

  const getDate = (data) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dateDB = new Date(data.date);
    const month = monthNames[dateDB.getMonth()];
    const day = dateDB.getDate();
    const year = dateDB.getFullYear();

    const feedback_date = `${month} ${day}, ${year}`;

    return feedback_date;
  };

  return (
    <div className="lg:mx-12 md:mx-3 sm:mx-3 border-2 flex flex-col h-auto w-580 my-5 rounded-lg bg-cover bg-center bg-gray-200/80">
      <img
        src="./../assets/imgs/product_rating.png"
        alt="..."
        className="inset-x-0 top-0 h-auto lg:w-[40%] md:w-[70%] sm:w-[90%] flex"
      />
      <div className="flex flex-col mx-auto w-full drop-shadow-md px-5 py-5">
        <div className="relative overflow-x-auto table-responsive text-justify flex-col ">
          <table className="w-full text-sm text-center p-6 text-gray-500 dark:text-gray-400">
            <thead className="text-xs p-6 text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
              <tr className="p-6">
                <th scope="col">
                  <button
                    name="sort_feedback"
                    id={"All"}
                    onClick={OnClick}
                    className="lg:px-6 md:px-6 sm:px-3 py-6 focus:border-b-2 border-blue-600 hover:bg-gray-200"
                    value={"All"}
                  >
                    ALL
                  </button>
                </th>
                <th scope="col">
                  <button
                    name="sort_feedback"
                    id={"5-Stars"}
                    onClick={OnClick}
                    className="lg:px-6 md:px-6 sm:px-3 py-6 focus:border-b-2 border-blue-600 hover:bg-gray-200"
                    value={5}
                  >
                    5 STARS
                  </button>
                </th>
                <th scope="col">
                  <button
                    name="sort_feedback"
                    id={"4-Stars"}
                    onClick={OnClick}
                    className="lg:px-6 md:px-6 sm:px-3 py-6 focus:border-b-2 border-blue-600 hover:bg-gray-200"
                    value={4}
                  >
                    4 STARS
                  </button>
                </th>
                <th scope="col">
                  <button
                    name="sort_feedback"
                    id={"3-Stars"}
                    onClick={OnClick}
                    className="lg:px-6 md:px-6 sm:px-3 py-6 focus:border-b-2 border-blue-600 hover:bg-gray-200"
                    value={3}
                  >
                    3 STARS
                  </button>
                </th>
                <th scope="col">
                  <button
                    name="sort_feedback"
                    id={"2-Stars"}
                    onClick={OnClick}
                    className="lg:px-6 md:px-6 sm:px-3 py-6 focus:border-b-2 border-blue-600 hover:bg-gray-200"
                    value={2}
                  >
                    2 STARS
                  </button>
                </th>
                <th scope="col">
                  <button
                    name="sort_feedback"
                    id={"1-Stars"}
                    onClick={OnClick}
                    className="lg:px-6 md:px-6 sm:px-3 py-6 focus:border-b-2 border-blue-600 hover:bg-gray-200"
                    value={1}
                  >
                    1 STARS
                  </button>
                </th>
              </tr>
            </thead>
          </table>

          <br />
          {/* Comment Section */}
          <section className="bg-white dark:bg-gray-900 py-8 lg:py-8">
            <div className="w-full mx-auto px-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Feedback ({countFeed})
                </h2>
              </div>

              {Object.entries(feedbackRecord).map(([i, item]) => (
                <article
                  key={i}
                  className="p-2 mb-4 text-base bg-white rounded-lg dark:bg-gray-900 justify-between"
                >
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center justify-between">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        <img
                          className="mr-2 w-6 h-6 rounded-full"
                          src={item.picture ? item.picture : "../assets/imgs/default.png"}
                          alt=""
                        />
                        {item.firstname} {item.lastname}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mr-5">
                        <time>{getDate(item)}</time>
                      </p>
                    </div>
                    <FeedbackStars ratings={item.ratings} />
                  </footer>
                  <p className="text-gray-500 dark:text-gray-400">
                    {item.feedback_desc}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <Pagination total={feedback.length} postsPerPage={postsPerPage} handleOnPage={handleOnPage} currentPage={currentPage} />

      </div>
    </div>
  );
};

export default ProductFeedbacks;

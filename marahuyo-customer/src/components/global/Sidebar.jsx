import { BiPurchaseTagAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { MdOutlineAccountBox } from "react-icons/md";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const Sidebar = (props) => {
  const [userData, setUserData] = useState({
    id: "",
    firstname: "",
    picture: null,
  });

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/sidebar/${id}`);
        const user = res.data[0];
        setUserData({
          id: user.id,
          firstname: user.firstname,
          picture: user.picture,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserDetails();
  }, [id]);

  const handleProfileClick = (e) => {
    window.location.href = `/profile/${id}`;
  };

  const handleAddressClick = (e) => {
    window.location.href = `/address/${id}`;
  };

  const handlechangePassClick = (e) => {
    window.location.href = `/change_pass/${id}`;
  };

  return (
    <div class="basis-1/2 mr-5 sm:hidden md:block">
      <div className="bg-white h-full drop-shadow-xl rounded-md py-10">
        <div className="flex items-center justify-start lg:ml-10 md:ml-4 mb-3">
          {userData.picture ? (
            <img
              className="rounded-full w-[6rem] h-[6rem]"
              src={userData.picture}
              alt=""
            />
          ) : (
            <FaUserCircle size={45} className="w-[6rem] h-[6rem]" />
          )}

          <div className="lg:ml-4 md:ml-2">
            <h1 className="font-bold text-lg">{userData.firstname}</h1>
            <div className="flex justify-center">
              <button className="mr-1">
                <FiEdit />
              </button>
              <p>Edit Profile</p>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div className="lg:ml-[5rem] md:ml-[3rem]">
            <div className="flex justify-start items-center mt-5">
              <MdOutlineAccountBox style={{ fontSize: 28 }} />
              <h1 className="ml-2">My Account</h1>
            </div>
            <ul className="ml-9">
              <li className="my-5">
                <button className="text-gray-500" onClick={handleProfileClick}>
                  Profile
                </button>
              </li>
              <li className="my-5">
                <button className="text-gray-500" onClick={handleAddressClick}>
                  Address
                </button>
              </li>
              <li className="my-5">
                <button
                  className="text-gray-500"
                  onClick={handlechangePassClick}
                >
                  Change Password
                </button>
              </li>
            </ul>
          </div>
          <div className="flex justify-start items-center lg:ml-[5rem] md:ml-[3rem]">
            <BiPurchaseTagAlt style={{ fontSize: 28 }} />
            <h1 className="ml-2">My Purchase</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

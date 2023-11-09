import { FaFacebook, FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="flex flex-col w-full bg-gray-400 bottom-0" id="about">
        <div className="mx-auto mt-5 sm:flex flex-col md:flex-row">
          <div className="flex mx-5 mb-10">
            <div className="mr-5">
              <h1 className="font-bold mb-3">CUSTOMER SERVICE</h1>
              <h1>Help Centre</h1>
              <h1>MARAHUYO Cares PH</h1>
              <h1>Payment Methods</h1>
              <h1>Order Tracking</h1>
              <h1>Contact Us</h1>
            </div>
            <div className="ml-5">
              <h1 className="font-bold mb-3">ABOUT MARAHUYO</h1>
              <h1>About Us</h1>
              <h1>MARAHUYO Blog</h1>
              <h1>MARAHUYO Careers</h1>
              <h1>MARAHUYO Policies</h1>
              <h1>Privacy Policies</h1>
              <h1>Media Contact</h1>
            </div>
          </div>
          <div className="flex mx-5 mb-10">
            <div className="mr-10">
              <h1 className="font-bold mb-3">PAYMENT</h1>
              <div className="flex">
                <div className=" p-1 drop-shadow-xl">
                  <img
                    className="m-auto"
                    srcSet="./../assets/imgs/maya.png"
                    width={"50px"}
                    alt=""
                  />
                </div>
                <div className="ml-2  p-1 drop-shadow-xl">
                  <img
                    className="m-auto"
                    srcSet="./../assets/imgs/gcash.png"
                    width={"50px"}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="ml-10">
              <h1 className="font-bold mb-3">FOLLLOW US</h1>
              <div className="flex">
                <FaFacebook className="relative top-1" />
                <h1 className="ml-2">Facebook</h1>
              </div>
              <div className="flex">
                <FaInstagramSquare className="relative top-1" />
                <h1 className="ml-2">Instagram</h1>
              </div>
              <div className="flex">
                <FaTwitterSquare className="relative top-1" />
                <h1 className="ml-2">Twitter</h1>
              </div>
            </div>
          </div>
        </div>
        <h1 className="mx-auto mt-5 mb-5">
          @ 2023 MARAHUYO. All Rights Reserved
        </h1>
      </footer>
    </>
  );
};

export default Footer;

const AboutUs = () => {
    return (
      <>
        <div className="flex flex-col mb-5" id="about">
          <div
            className="bg-cover bg-center h-2 bg-gray-500 flex flex-col"
            style={{ backgroundImage: `url("/assets/imgs/border.png")` }}
          ></div>
          <div className="my-5 mx-auto w-11/12 flex md:flex-row sm:flex-col-reverse justify-center items-center">
            <div className="w-11/12">
              <h1 className="font-bold my-5 text-5xl sm:text-center md:text-left">MARAHUYO ✨</h1>
              <p className="text-justify text-lg">
                The MARAHUYO system is a platform designed to facilitate the sale
                of merchandise by student organizations in TUP-Manila, a
                university located in Manila, Philippines. The system is intended
                to provide a centralized online platform where these organizations
                can sell their merchandise, making it easier for students to find
                and purchase items from their favorite organizations. 
              </p>
              <p className="text-justify mt-3 text-lg">
              By using the
                MARAHUYO system, student organizations can reach a wider audience
                and generate more revenue, which can be used to support their
                activities and events. The platform may also provide features such
                as inventory management, payment processing, and order tracking,
                which can help streamline the sales process and improve the
                overall user experience for both the organizations and their
                customers.
              </p>
            </div>
            <div className="w-9/12 ml-5">
              <img
                srcSet="/assets/imgs/LoginLogo.png"
                alt=""
                width="100%"
              />
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default AboutUs;
  
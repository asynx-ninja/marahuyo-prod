import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ProductGallery = () => {
  const location = useLocation();
  const prod_name = location.hash.split("#")[1]; // GET PRODUCT ID FROM PARAMETERS (URL)

  const [img, setImg] = useState("");
  const [gallery, setGallery] = useState({});

  // CONVERT OBJECT GALLERY TO GET ID AND IMAGE NAME
  const image = Object.entries(gallery).map((item, i) => ({
    id: gallery[i].image_id,
    url: gallery[i].image_url,
  }));

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/get_gallery/` + prod_name
        ); // GET ID AND IMAGE FROM DATABASE
        setGallery(res.data);
        setImg(res.data[0].image_url); // GET DEFAULT IMAGE
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prod_name]);

  // console.log(image)

  const handleOnMouseOver = (e) => {
    const data = image.find((obj) => obj.id === parseInt(e.target.id));
    data === undefined ? setImg(image[0].url) : setImg(data.url);
  };

  return (
    <div className="grid gap-4 w-full">
      <div>
        <img className="h-full max-w-full w-full rounded-lg" src={img} alt="" />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {image.map((item, i) => (
          <button
            onMouseOver={handleOnMouseOver}
            value={i}
            key={i}
            className="h-full max-w-full"
          >
            <img
              id={item.id}
              className="h-auto max-w-full rounded-lg"
              src={item.url}
              alt=""
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;

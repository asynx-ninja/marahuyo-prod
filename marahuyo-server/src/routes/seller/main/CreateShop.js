import multer from "multer";
import cloudinary from "cloudinary";

const CreateShop = (app, db) => {
  const storage = multer.diskStorage({});
  const upload = multer({
    storage: storage,
  });

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  app.post("/insert_shop_details/:id", (req, res) => {
    const data = req.body;
    const id = req.params.id;

    const q =
      "INSERT INTO shop_info (user_id, shop_name, shop_desc, shop_phone, shop_logo, shop_banner) VALUES (?);";
    const values = [id, data.shopname, data.desc, data.number, null, null];
    console.log(values);
    db.query(q, [values], (err, data) => {
      return err ? res.json(err) : res.json("Successfully created!");
    });
  });

  const cpUpload = upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]);
  
  app.put("/insert_shop_image/:id", cpUpload, async (req, res) => {
    try {
      const obj = Object.assign({}, req.files)
      const id = req.params.id;

      const q =
        "UPDATE shop_info SET shop_logo = ?, shop_banner = ? WHERE user_id = ?";

      const upload_logo = await cloudinary.v2.uploader.upload(obj.logo[0].path, {
        folder: "logo",
      });

      const upload_banner = await cloudinary.v2.uploader.upload(obj.banner[0].path, {
        folder: "banner",
      });
     

      const value = [upload_logo.secure_url, upload_banner.secure_url, id];
      db.query(q, [...value], (err, data) => {
        // returning error response
        if (err) {
          return res.json(err);
        }
        console.log(data)
        // returning the data
        return res.json("Successfully Updated");
      });
    } catch (err) {
      res.json(err);
    }
  });

  app.get("/get_shop_details/:id", (req, res) => {
    const q = "SELECT CASE WHEN EXISTS (SELECT * FROM shop_info WHERE user_id = ?)THEN 1 ELSE 0 END AS VALUE";
    const id = req.params.id;
    console.log(id)
    db.query(q, [id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });
};

export default CreateShop;

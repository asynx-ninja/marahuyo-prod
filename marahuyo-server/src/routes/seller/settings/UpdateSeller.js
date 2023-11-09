import multer from "multer";
import cloudinary from "cloudinary";

const UpdateSeller = (app, db) => {
  const storage = multer.diskStorage({});
  const upload = multer({
    storage: storage,
  });

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  app.put("/update_seller_details/:id", (req, res) => {
    const q =
      "UPDATE user_details SET `firstname` = ?, `lastname` = ?, `number` = ?, `birthday` = ?, `age` = ? WHERE user_id = ?";
    const updateValues = [
      req.body.firstname,
      req.body.lastname,
      req.body.number,
      req.body.birthday,
      req.body.age,
      req.params.id,
    ];

    db.query(q, [...updateValues], (updateErr) => {
      if (updateErr) {
        return res.json(updateErr);
      }

      return res.json("Successfully updated user profile");
    });
  });

  app.put("/update_seller_image/:id", upload.single("picture"), async (req, res) => {
    try {
      console.log(req.file.path);
      const id = req.params.id;
      const q = "UPDATE user_details SET `picture` = ? WHERE user_id = ?";
      const upload = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "users",
      });
      const values = [upload.secure_url, id];

      db.query(q, [...values], (err, data) => {
        return err ? res.json(err) : res.json("Successfully updated!");
      });
    } catch (err) {
      res.json(err);
    }
  });


  app.put("/delete_image/:id", upload.single("picture"), async (req, res) => {
    const data = req.body;
    const lastURL = data.picture.split("/");
    const url = lastURL[7]+"/"+lastURL[8].split(".")[0]
    console.log(url);


    try {
     
        console.log("deleted");
        await cloudinary.v2.uploader.destroy(
         url,
          (error, result) => {
            console.log(result); // { result: 'ok' }
          }
        );

      const id = req.params.id;
      const q = "UPDATE user_details SET `picture` = NULL WHERE user_id = ?";

      // Upload the new profile picture

      db.query(q, id, (err, data) => {
        return err ? res.json(err) : res.json("Successfully updated!");
      });
    } catch (error) {
      // console.error(error);
     console.log(error)
    }
  });
};

export default UpdateSeller;

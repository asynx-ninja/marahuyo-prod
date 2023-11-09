import multer from "multer";
import cloudinary from "cloudinary";

const UpdateShop = (app, db) => {
  const storage = multer.diskStorage({});
  const upload = multer({
    storage: storage,
  });

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  app.get("/get_shop_all_details1/:id", (req, res) => {
    const q = "SELECT * FROM shop_info WHERE `user_id` = ?";
    const id = [req.params.id];
    // console.log(id);
    db.query(q, id, (err, data) => {
      err ? res.json(err) : res.json(data);
    });
  });

  app.get("/get_seller_all_details1/:id", (req, res) => {
    const q =
      " SELECT  A.*, B.email FROM user_details as A INNER JOIN user_credentials as B ON A.user_id = B.user_id  WHERE A.user_id = ?";
    const id = [req.params.id];
    // console.log(id);
    db.query(q, id, (err, data) => {
      err ? res.json(err) : res.json(data);
    });
  });

  app.put("/update_shop_details/:id", (req, res) => {
    // const data = req.body.obj;
    const id = req.params.id;
    const data = req.body;
    const q =
      "UPDATE shop_info SET `shop_name` =?, `shop_desc` =?, `shop_phone` =? WHERE user_id =?;";
    const values = [data.shopname, data.desc, data.number, id];
    console.log(values);
    db.query(q, [...values], (err, data) => {
      return err ? res.json(err) : res.json("Successfully created!");
    });
  });

  app.get("/getAddress/:id", (req, res) => {
    const id = req.params.id;

    const q = "SELECT * FROM user_address WHERE `user_id` = ?";

    db.query(q, id, (err, data) => {
      err ? res.json(err) : res.json(data);
    });
  });

  app.put("/delete_shop_logo/:id", upload.single("logo"), async (req, res) => {
    const data = req.body;
    const lastURL = data.logo.split("/");
    const url = lastURL[7]+"/"+lastURL[8].split(".")[0]
    console.log(url);
    try {
       console.log("deleted logo");
        await cloudinary.v2.uploader.destroy(
         url,
          (error, result) => {
            console.log(result); // { result: 'ok' }
          }
        );

      const id = req.params.id;
      const q =
      "UPDATE shop_info SET `shop_logo` = NULL WHERE shop_id = ?";

      // Upload the new profile picture

      db.query(q, id, (err, data) => {
        return err ? res.json(err) : res.json("Successfully updated!");
      });
    } catch (error) {
      // console.error(error);
     console.log(error)
    }
  });

  app.put("/delete_shop_banner/:id", upload.single("banner"), async (req, res) => {
    const data = req.body;
    const lastURL = data.banner.split("/");
    const url = lastURL[7]+"/"+lastURL[8].split(".")[0]
    console.log(url);


    try {
     
        console.log("deleted banner");
        await cloudinary.v2.uploader.destroy(
         url,
          (error, result) => {
            console.log(result); // { result: 'ok' }
          }
        );

      const id = req.params.id;
      const q =
      "UPDATE shop_info SET `shop_banner` = NULL WHERE shop_id = ?";

      // Upload the new profile picture

      db.query(q, id, (err, data) => {
        return err ? res.json(err) : res.json("Successfully updated!");
      });
    } catch (error) {
      // console.error(error);
     console.log(error)
    }
  });

  app.put("/update_shop_logo/:id", upload.single("logo"), async (req, res) => {
    try{
      console.log(req.file.path)
        const id = req.params.id;
        const q =
        "UPDATE shop_info SET `shop_logo` = ? WHERE user_id = ?";
        console.log("inserted logo");
        const upload = await cloudinary.v2.uploader.upload(req.file.path, {folder: 'logo'});
        const values = [upload.secure_url, id];

        db.query(q, [...values], (err, data) => {
            return err ? res.json(err) : res.json("Successfully updated!")
        });
    }catch(err){
        res.json(err)
    }
})

app.put("/update_shop_banner/:id", upload.single("banner"), async (req, res) => {
  try{
      const id = req.params.id;
      const q =
      "UPDATE shop_info SET `shop_banner` = ? WHERE user_id = ?";
      console.log("inserted banner");
      const upload = await cloudinary.v2.uploader.upload(req.file.path, {folder: 'banner'});
      const values = [upload.secure_url, id];

      db.query(q, [...values], (err, data) => {
        return err ? res.json(err) : res.json("Successfully updated!");
      });

    } catch (err) {
      res.json(err);
    }
  });

  app.put(
    "/update_shop_banner/:id",
    upload.single("banner"),
    async (req, res) => {
      try {
        const id = req.params.id;
        const q = "UPDATE shop_info SET `shop_banner` = ? WHERE shop_id = ?";
        const upload = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "banner",
        });
        const values = [upload.secure_url, id];

        db.query(q, [...values], (err, data) => {
          return err ? res.json(err) : res.json("Successfully updated!");
        });
      } catch (err) {
        res.json(err);
      }
    }
  );

  app.post("/insertAddress/:id", (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const q =
      "INSERT INTO user_address (`fullName`, `phoneNumber`, `address_line`, `brgy`, `city`, `province`, `region`, `default`, `user_id`) VALUES (?);";

    const values = [
      data.fullName,
      data.phoneNumber,
      data.address_line,
      data.brgy,
      data.city,
      data.province,
      data.region,
      "",
      id,
    ];
    console.log(values);
    db.query(q, [values], (err, data) => {
      return err ? res.json(err) : res.json("Successfully created!");
    });
  });

  app.put("/updateAddress/:id", (req, res) => {
    const data = req.body;
    const id = req.params.id;

    const q =
      "UPDATE user_address SET `fullName` = ?, `phoneNumber` = ?, `address_line` = ?, `brgy` = ?, `city` = ?, `province` = ?, `region` = ?, `default` = ? WHERE user_id = ?;";

    const values = [
      data.fullName,
      data.phoneNumber,
      data.address_line,
      data.brgy,
      data.city,
      data.province,
      data.region,
      "",
      data.address_id,
    ];
    console.log("update " + values);
    db.query(q, [...values, id], (err, data) => {
      return err ? res.json(err) : res.json("Successfully created!");
    });
  });
};

export default UpdateShop;

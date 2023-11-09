import multer from "multer";
import cloudinary from "cloudinary";

const EditProduct = (app, db) => {
  const storage = multer.diskStorage({});
  const upload = multer({
    storage: storage,
  });

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  app.get("/get_spec_prod/:id", (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM products WHERE prod_id = ?";

    db.query(q, [id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.get("/get_spec_cat/:id", (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM prod_category WHERE prod_id = ?";

    db.query(q, [id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.get("/get_spec_img/:id", (req, res) => {
    const id = req.params.id;
    const q =
      "SELECT * FROM prod_image WHERE prod_id = ? ORDER BY img_lbl DESC;";

    db.query(q, [id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.get("/get_spec_size/:id", (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM prod_size WHERE prod_id = ?;";

    db.query(q, [id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.get("/get_spec_var/:id", (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM prod_variant WHERE prod_id = ?";

    db.query(q, [id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.put("/update_products/", (req, res) => {
    const merch = req.body.merch;
    const prod_id = req.body.prod_id;

    const q =
      "UPDATE products SET `prod_name` = ?, `prod_desc` = ?, `prod_price` = ?, `prod_stocks` = ? WHERE `prod_id` = ?";
    const values = [merch.name, merch.desc, merch.price, merch.stocks, prod_id];

    db.query(q, [...values], (err, data) => {
      return err ? res.json(err) : res.json("SUCCESSFULLY UPDATED");
    });
  });

  app.put("/update_category/", (req, res) => {
    const merch = req.body.merch;
    const prod_id = req.body.prod_id;

    const q =
      "UPDATE prod_category SET `category_name` = ? WHERE `prod_id` = ?";
    const values = [merch.category, prod_id];

    db.query(q, [...values], (err, data) => {
      return err ? res.json(err) : res.json("SUCCESSFULLY UPDATED");
    });
  });

  app.post("/insert_variants_up/", (req, res) => {
    const q = "INSERT INTO prod_variant (`variant_color`,`prod_id`) VALUES (?)";
    const element = req.body.element;
    const prod_id = req.body.prod_id;
    const values = [element, prod_id];

    //console.log(values);

    db.query(q, [values], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.post("/insert_sizes_up/", (req, res) => {
    const q = "INSERT INTO prod_size (`size_name`,`prod_id`) VALUES (?)";
    const element = req.body.element;
    const prod_id = req.body.prod_id;
    const values = [element, prod_id];

    //console.log(values);

    db.query(q, [values], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.post("/insert_prod_images_str/", (req, res) => {
    const element = req.body.element;
    const prod_id = req.body.prod_id;
    const idx = req.body.idx;

    const q =
      "INSERT INTO prod_image (`image_url`, `prod_id`, `img_lbl`) VALUES (?)";

    const values = [element, prod_id, idx];

    db.query(q, [values], (err, data) => {
      return err ? res.json(err) : res.json("Successfully inserted!");
    });
  });

  app.post(
    "/insert_prod_images_file/",
    upload.single("image"),
    async (req, res) => {
      try {
        const prod_id = req.body.prod_id;
        const path = req.file.path;

        const q =
          "INSERT INTO prod_image (`image_url`, `prod_id`, `img_lbl`) VALUES (?)";

        const upload = await cloudinary.v2.uploader.upload(path, {
          folder: "items",
        });

        const values = [upload.secure_url, prod_id, 0];

        db.query(q, [values], (err, data) => {
          return err ? res.json(err) : res.json("Successfully inserted!");
        });
      } catch (err) {
        res.json(err);
      }
    }
  );

  app.delete("/delete_product/:id", (req, res) => {
    const prod_id = req.params.id;

    const q = "DELETE FROM products WHERE prod_id = ?";

    db.query(q, [prod_id], (err, data) => {
      return err ? res.json(err) : res.json("SUCCESSFULLY DELETED");
    });
  });

  app.delete("/delete_variant/:id", (req, res) => {
    const prod_id = req.params.id;

    const q = "DELETE FROM prod_variant WHERE prod_id = ?";

    db.query(q, [prod_id], (err, data) => {
      return err ? res.json(err) : res.json("SUCCESSFULLY DELETED");
    });
  });

  app.delete("/delete_category/:id", (req, res) => {
    const prod_id = req.params.id;

    const q = "DELETE FROM prod_category WHERE prod_id = ?";

    db.query(q, [prod_id], (err, data) => {
      return err ? res.json(err) : res.json("SUCCESSFULLY DELETED");
    });
  });

  app.delete("/delete_sizes/:id", (req, res) => {
    const prod_id = req.params.id;

    const q = "DELETE FROM prod_size WHERE prod_id = ?";

    db.query(q, [prod_id], (err, data) => {
      return err ? res.json(err) : res.json("SUCCESSFULLY DELETED");
    });
  });

  app.delete("/delete_images/:id", (req, res) => {
    const prod_id = req.params.id;

    const q = "DELETE FROM prod_image WHERE prod_id = ?";

    db.query(q, [prod_id], (err, data) => {
      return err ? res.json(err) : res.json("SUCCESSFULLY DELETED");
    });
  });
};

export default EditProduct;

import multer from "multer";
import cloudinary from "cloudinary";

const AddProduct = (app, db) => {
    const storage = multer.diskStorage({});
  const upload = multer({
    storage: storage,
  });

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

    app.get("/get_max_prod_id/", (req, res) => {
        const q = "SELECT MAX(prod_id) AS prod_id FROM products";
    
        db.query(q, (err, data) => {
          return err ? res.json(err) : res.json(data);
        });
      });
    
      app.get("/get_shop_id/:id", (req, res) => {
        const q = "SELECT shop_id FROM shop_info WHERE user_id = ?;";
        const id = req.params.id;
    
        db.query(q, [id], (err, data) => {
          return err ? res.json(err) : res.json(data);
        });
      });
    
      app.post("/insert_products/", (req, res) => {
        const q =
          "INSERT INTO products (`shop_id`,`prod_name`,`prod_desc`, `prod_price`, `prod_stocks`) VALUES (?)";
        const merch = req.body.merch;
        const obj = req.body.obj;
    
        const values = [
          obj.shop_id,
          merch.name,
          merch.desc,
          merch.price,
          merch.stocks,
        ];
    
        //console.log(values);
    
        db.query(q, [values], (err, data) => {
          return err ? res.json(err) : res.json(data);
        });
      });
    
      app.post("/insert_category/", (req, res) => {
        const q =
          "INSERT INTO prod_category (`category_name`,`prod_id`) VALUES (?)";
        const merch = req.body.merch;
        const obj = req.body.obj;
    
        const values = [merch.category, obj.max_id === 1 ? obj.max_id : obj.max_id + 1];
    
        //console.log(values);
    
        db.query(q, [values], (err, data) => {
          return err ? res.json(err) : res.json(data);
        });
      });
    
      app.post("/insert_variants/", (req, res) => {
        const q = "INSERT INTO prod_variant (`variant_color`,`prod_id`) VALUES (?)";
        const element = req.body.element;
        const obj = req.body.obj;
        const values = [element, obj.max_id === 1 ? obj.max_id : obj.max_id + 1];
    
        //console.log(values);
    
        db.query(q, [values], (err, data) => {
          return err ? res.json(err) : res.json(data);
        });
      });
    
      app.post("/insert_sizes/", (req, res) => {
        const q = "INSERT INTO prod_size (`size_name`,`prod_id`) VALUES (?)";
        const element = req.body.element;
        const obj = req.body.obj;
        const values = [element, obj.max_id === 1 ? obj.max_id : obj.max_id + 1];
    
        //console.log(values);
    
        db.query(q, [values], (err, data) => {
          return err ? res.json(err) : res.json(data);
        });
      });
    
      app.post("/insert_prod_images/", upload.single("image"), async (req, res) => {
        try {
          const max_id = req.body.max_id;
          const val = req.body.val;
          const path = req.file.path;
    
          console.log(max_id);
          console.log(val);
          console.log(path);
          
          const q = "INSERT INTO prod_image (`image_url`, `prod_id`, `img_lbl`) VALUES (?)";
          const upload = await cloudinary.v2.uploader.upload(path, {
            folder: "items",
          });
    
          const values = [upload.secure_url, max_id === "1" ? max_id : Number(max_id) + 1, val];

          db.query(q, [values], (err, data) => {
            return err ? res.json(err) : res.json("Successfully updated!");
          });
        } catch (err) {
          res.json(err);
        }
      });
}

export default AddProduct;
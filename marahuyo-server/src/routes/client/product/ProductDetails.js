const ProductDetails = (app, db) => {
  // GET
  app.get("/get_product/:prod_name", (req, res) => {
    const name = req.params.prod_name;

    // Create query
    const q =
      "SELECT DISTINCT products.*, prod_category.category_id, prod_category.category_name, prod_image.image_url FROM products JOIN prod_category ON products.prod_id = prod_category.prod_id JOIN prod_image ON products.prod_id = prod_image.prod_id WHERE prod_image.img_lbl = 1 AND products.prod_name = ?";

    // console.log(id);

    // running the query
    // err = error, data = data
    db.query(q, [name], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.get("/get_shopInfo/:shop_id", (req, res) => {
    const id = req.params.shop_id;

    // Create query
    const q = "SELECT shop_id, shop_name FROM shop_info WHERE shop_id = ?";

    // running the query
    // err = error, data = data
    db.query(q, [id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.get("/all_cart/:id", (req, res) => {
    const id = req.params.id;

    // Create query
    const q =
      "SELECT cart.*, products.prod_price FROM cart JOIN products ON cart.prod_id = products.prod_id JOIN prod_image ON cart.prod_id = prod_image.prod_id  WHERE cart.user_id = ?";

    // running the query
    // err = error, data = data
    db.query(q, [id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  // POST
  app.post("/insert_cart/", (req, res) => {
    const product = req.body.productDetails;
    const data = req.body.productChoice;

    const variant = data.variant === 0 ? null : data.variant
    const size = data.variant === 0 ? null : data.size

    const total_price = product.price * data.quantity;

    // console.log(data)
    // console.log(product)
    const value = [
      product.user_id,
      product.prod_id,
      data.quantity,
      total_price,
      variant,
      size,
      product.category_id,
    ];

    // console.log(value)

    const q =
      "INSERT INTO cart (`user_id`, `prod_id`, `prod_qty`, `prod_total_price`, `prod_variant_id`, `prod_size_id`, `prod_category_id`) VALUES (?);";

    // running the query
    // err = error, data = data
    db.query(q, [value], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  // PUT
  app.put("/update_cart/", (req, res) => {
    const product = req.body.productDetails;

    // console.log(product.prod_total_price)
    // console.log(product)
    const value = [
      product.prod_qty,
      product.prod_total_price,
      product.cart_id
    ];

    // console.log(value)

    const q =
      "UPDATE cart SET prod_qty = ?, prod_total_price = ? WHERE cart_id = ?";

    // running the query
    // err = error, data = data
    db.query(q, [...value], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });
};

export default ProductDetails;

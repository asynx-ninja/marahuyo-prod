const Cart = (app, db) => {
  // GETTING PRODUCTS FROM DATABASE
  app.get("/get_all_cart/:id", (req, res) => {
    const id = req.params.id;

    // Create query
    const q =
      "SELECT cart.*, products.prod_name, products.prod_price, products.prod_stocks, prod_image.image_url FROM cart JOIN products ON cart.prod_id = products.prod_id JOIN prod_image ON cart.prod_id = prod_image.prod_id  WHERE prod_image.img_lbl = 1 AND cart.prod_id = prod_image.prod_id AND cart.user_id = ?";

    // running the query
    // err = error, data = data
    db.query(q, [id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.get("/get_size/", (req, res) => {
    // Create query
    const q = "SELECT size_id, size_name FROM marahuyo.prod_size";

    // running the query
    // err = error, data = data
    db.query(q, (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.get("/get_variant/", (req, res) => {
    // Create query
    const q = "SELECT * FROM marahuyo.prod_variant";

    // running the query
    // err = error, data = data
    db.query(q, (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.delete("/delete_cart/:cart_id/:user_id", (req, res) => {
    const cart = req.params.cart_id;
    const user = req.params.user_id;

    // console.log(cart, user)

    // Create query
    const q = "DELETE FROM cart WHERE user_id = ? AND cart_id = ?";

    // running the query
    // err = error, data = data
    db.query(q, [user, cart], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.put("/update_cart/:cart_id", (req, res) => {
    const cartId = req.params.cart_id;
    const updatedItem = req.body;

    // Create query
    const q = "UPDATE cart SET prod_qty = ?, prod_total_price = ? WHERE cart_id = ?";

    // running the query
    // err = error, data = data
    db.query(q, [updatedItem.prod_qty, updatedItem.prod_total_price, cartId], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

};

export default Cart;

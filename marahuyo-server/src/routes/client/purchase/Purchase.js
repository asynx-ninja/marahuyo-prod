const Purchase = (app, db) => {
  const getDate = () => {
    const date = new Date();

    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let hour = String(date.getHours());
    let minutes = String(date.getMinutes());
    let seconds = String(date.getSeconds());

    let currentDate = `${year}-${month}-${day}T${hour}:${minutes}:${seconds}`;

    return currentDate;
  };

  // GET
  app.get("/get_purchases/:id/:status", (req, res) => {
    const values = req.params.id;
    const status = req.params.status;

    // Create query
    const q =
      "SELECT products.prod_id, products.prod_name, products.prod_price, order_item.product_qty, prod_image.image_url, order_item.prod_size_id, order_item.prod_variant_id, marahuyo.order.status_id, order_status.status_name, marahuyo.order.order_id FROM order_item JOIN products ON products.prod_id = order_item.prod_id JOIN prod_image ON prod_image.prod_id = products.prod_id JOIN marahuyo.order ON marahuyo.order.order_id = order_item.order_id JOIN order_status ON order_status.status_id = marahuyo.order.status_id WHERE prod_image.img_lbl AND order_status.status_name = ? AND marahuyo.order.user_id = ? ORDER BY marahuyo.order.order_date DESC";

    // running the query
    // err = error, data = data
    db.query(q, [status, values], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.get("/get_order_id/:id", (req, res) => {
    const values = req.params.id;

    // Create query
    const q = "SELECT * FROM marahuyo.order WHERE user_id = ?";

    // running the query
    // err = error, data = data
    db.query(q, [values], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.get("/get_order_item", (req, res) => {
    const values = req.params.id;

    // Create query
    const q = "SELECT * FROM order_item";

    // running the query
    // err = error, data = data
    db.query(q, [values], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  // PUT
  app.put("/cancel_purchase/:id", (req, res) => {
    const id = req.params.id;
    const cancel = 5;

    // Create query
    const q =
      "UPDATE marahuyo.order SET status_id = ? WHERE marahuyo.order.order_id = ?";

    // running the query
    // err = error, data = data
    db.query(q, [cancel, id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  // DELETE
  app.delete("/delete_purchase/:order_id/:prod_id", (req, res) => {
    const order_id = req.params.order_id;
    const prod_id = req.params.prod_id;

    // Create query
    const q =
      "DELETE FROM order_item WHERE order_item.order_id = ? AND order_item.prod_id = ?";

    // running the query
    // err = error, data = data
    db.query(q, [order_id, prod_id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.delete("/delete_order/:order_id", (req, res) => {
    const order_id = req.params.order_id;

    // Create query
    const q = "DELETE FROM marahuyo.order WHERE marahuyo.order.order_id = ?";

    // running the query
    // err = error, data = data
    db.query(q, [order_id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.post("/send_feedback/:user_id/:prod_id/:stars/:comment", (req, res) => {
    const id = req.params.user_id;
    const prod_id = req.params.prod_id;
    const feedback = req.params.comment;
    const ratings = req.params.stars;
    const date = getDate()

    const values = [Number(id), Number(prod_id), feedback, Number(ratings), date];

    console.log(values);

    // Create query
    const q =
      "INSERT INTO product_feedback (`user_id`, `prod_id`, `feedback_desc`, `ratings`, `date`) VALUES (?)";

    // running the query
    // err = error, data = data
    db.query(q, [values], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });
};

export default Purchase;

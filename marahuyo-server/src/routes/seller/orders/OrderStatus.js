const OrderStatus = (app, db) => {

  app.get("/get_topay_orders/:id", (req, res) => {
    const { id } = req.params;
    const q = "SELECT A.firstname, A.lastname, B.product_qty, C.prod_name, C.prod_price, D.order_id, D.order_total, D.order_date, E.status_name FROM user_details AS A INNER JOIN marahuyo.order AS D ON A.user_id = D.user_id INNER JOIN order_item AS B  ON B.order_id = D.order_id INNER JOIN products AS C ON C.prod_id = B.prod_id INNER JOIN order_status AS E ON E.status_id = D.status_id WHERE E.status_id = 1 AND C.shop_id = ? ORDER BY D.order_date DESC ";
    db.query(q, [id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });
  app.get("/get_toship_orders/:id", (req, res) => {
    const { id } = req.params;
    const q = "SELECT A.firstname, A.lastname, B.product_qty, C.prod_name, C.prod_price, D.order_id, D.order_total, D.order_date, E.status_name FROM user_details AS A INNER JOIN marahuyo.order AS D ON A.user_id = D.user_id INNER JOIN order_item AS B  ON B.order_id = D.order_id INNER JOIN products AS C ON C.prod_id = B.prod_id INNER JOIN order_status AS E ON E.status_id = D.status_id WHERE E.status_id = 2 AND C.shop_id = ? ORDER BY D.order_date DESC";
    db.query(q, [id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });
  app.get("/get_toreceive_orders/:id", (req, res) => {
    const { id } = req.params;
    const q = "SELECT A.firstname, A.lastname, B.product_qty, C.prod_name, C.prod_price, D.order_id, D.order_total, D.order_date, E.status_name FROM user_details AS A INNER JOIN marahuyo.order AS D ON A.user_id = D.user_id INNER JOIN order_item AS B  ON B.order_id = D.order_id INNER JOIN products AS C ON C.prod_id = B.prod_id INNER JOIN order_status AS E ON E.status_id = D.status_id WHERE E.status_id = 3 AND C.shop_id = ? ORDER BY D.order_date DESC";
    db.query(q, [id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });
  app.get("/get_completed_orders/:id", (req, res) => {
    const { id } = req.params;
    const q = "SELECT A.firstname, A.lastname, B.product_qty, C.prod_name, C.prod_price, D.order_id, D.order_total, D.order_date, E.status_name FROM user_details AS A INNER JOIN marahuyo.order AS D ON A.user_id = D.user_id INNER JOIN order_item AS B  ON B.order_id = D.order_id INNER JOIN products AS C ON C.prod_id = B.prod_id INNER JOIN order_status AS E ON E.status_id = D.status_id WHERE E.status_id = 4 AND C.shop_id = ? ORDER BY D.order_date DESC";
    db.query(q, [id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });
  app.get("/get_cancelled_orders/:id", (req, res) => {
    const { id } = req.params;
    const q = "SELECT A.firstname, A.lastname, B.product_qty, C.prod_name, C.prod_price, D.order_id, D.order_total, D.order_date, E.status_name FROM user_details AS A INNER JOIN marahuyo.order AS D ON A.user_id = D.user_id INNER JOIN order_item AS B  ON B.order_id = D.order_id INNER JOIN products AS C ON C.prod_id = B.prod_id INNER JOIN order_status AS E ON E.status_id = D.status_id WHERE E.status_id = 5 AND C.shop_id = ? ORDER BY D.order_date DESC";
    db.query(q, [id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });
  app.get("/get_return_orders/:id", (req, res) => {
    const { id } = req.params;
    const q = "SELECT A.firstname, A.lastname, B.product_qty, C.prod_name, C.prod_price, D.order_id, D.order_total, D.order_date, E.status_name FROM user_details AS A INNER JOIN marahuyo.order AS D ON A.user_id = D.user_id INNER JOIN order_item AS B  ON B.order_id = D.order_id INNER JOIN products AS C ON C.prod_id = B.prod_id INNER JOIN order_status AS E ON E.status_id = D.status_id WHERE E.status_id = 6 AND C.shop_id = ? ORDER BY D.order_date DESC";
    db.query(q, [id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.put("/set_status/", (req, res) => {
    const order_id = req.body.order_id;
    const status_name = req.body.status_name

    let status_id = 0;
    switch (status_name) {
      case "TOPAY":
        status_id = 1
        break;
      case "TOSHIP":
        status_id = 2
        break;
      case "TORECEIVE":
        status_id = 3
        break;
      case "COMPLETED":
        status_id = 4
        break;
      case "CANCELLED":
        status_id = 5
        break;
      case "RETURN":
        status_id = 6
        break;
    };
    const value = [status_id, order_id];
    console.log(value)
    const q =
      "UPDATE marahuyo.order SET `status_id` = ? WHERE order_id = ?;";

    db.query(q, [...value], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

};

export default OrderStatus;

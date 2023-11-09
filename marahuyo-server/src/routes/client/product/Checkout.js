const Checkout = (app, db) => {
  const getDate = () => {
    const date = new Date();

    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let hour = String(date.getHours());
    let minutes = String(date.getMinutes());
    let seconds = String(date.getSeconds());

    let currentDate = `${year}-${month}-${day}T${hour}:${minutes}:${seconds}`;

    return currentDate;
  }


  // GET
  app.get("/get_user_address/:id", (req, res) => {
    const id = req.params.id

    const q = "SELECT address_id, user_address.default, fullName, phoneNumber, address_line, brgy, city, province, region FROM user_address WHERE user_id = ?";
    db.query(q, [id], (err, data) => {
      err ? res.json(err) : res.json(data)
    })
  })

  app.get("/get_user_data/:id", (req, res) => {
    const id = req.params.id

    const q = "SELECT * FROM user_details WHERE user_id = ?";
    db.query(q, [id], (err, data) => {
      err ? res.json(err) : res.json(data)
    })
  })

  app.get("/get_order/:id", (req, res) => {
    const id = req.params.id;

    // Create query
    const q =
      "SELECT order_id FROM marahuyo.order WHERE marahuyo.order.user_id = ? ORDER BY order_id DESC LIMIT 1";

    // running the query
    // err = error, data = data
    db.query(q, [id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });



  // POST
  app.post("/insert_order_item/:id", (req, res) => {
    const selectedItem = req.body.selectedItems;
    const order_id = req.params.id

    const variant = selectedItem.prod_variant_id === 0 ? null : selectedItem.prod_variant_id
    const size = selectedItem.prod_size_id === 0 ? null : selectedItem.prod_size_id

    // console.log(selectedItem)
    // console.log(product)
    const value = [
      order_id,
      selectedItem.prod_id,
      selectedItem.prod_qty,
      selectedItem.prod_price,
      variant,
      size,
    ];

    // console.log(value)

    const q =
      "INSERT INTO marahuyo.order_item (`order_id`, `prod_id`, `product_qty`, `product_price`, `prod_variant_id`, `prod_size_id`) VALUES (?)";

    // running the query
    // err = error, data = data
    db.query(q, [value], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });

  });

  app.post("/insert_order/:id/:payment", (req, res) => {
    const id = req.params.id
    const payment = req.params.payment
    const order_sub_total = req.body.orderSubTotal;
    const total_order = req.body.orderTotal;
    const date = getDate()
    const tax = 0.20

    const order_subtotal = tax + order_sub_total;

    // console.log(selectedItems)
    // console.log(product)

    const value = [
      id,
      1,
      date,
      order_subtotal,
      tax,
      total_order,
      payment
    ];

    // console.log(value)

    const q =
      "INSERT INTO marahuyo.order (`user_id`, `status_id`, `order_date`, `order_subtotal`, `taxes`, `order_total`, `payment_method`) VALUES (?)";

    // running the query
    // err = error, data = data
    db.query(q, [value], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  // PUT
  app.put("/update_default_add/:address_id/:user_id", (req, res) => {
    const address_id = req.params.address_id;
    const user_id = req.params.user_id

    // Create query
    const q = 'UPDATE user_address SET `default` = CASE WHEN address_id = ? THEN "default" ELSE NULL END WHERE user_id = ?';

    // running the query
    // err = error, data = data
    db.query(q, [address_id, user_id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });
}

export default Checkout;
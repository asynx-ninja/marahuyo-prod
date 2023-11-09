const Store = (app, db) => {
  // GETTING PRODUCTS FROM DATABASE
  app.get("/get_shopDetails/:shop_name", (req, res) => {
    const name = req.params.shop_name;

    // Create query
    const q = "SELECT * FROM shop_info WHERE shop_name = ?";

    // running the query
    // err = error, data = data
    db.query(q, [name], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });
};

export default Store;

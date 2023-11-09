const Category = (app, db) => {
  // GETTING PRODUCTS FROM DATABASE
  app.get("/get_all_categories", (req, res) => {
    // Create query
    const q =
      "SELECT DISTINCT category_name FROM marahuyo.prod_category JOIN products ON prod_category.prod_id = products.prod_id";

    // running the query
    // err = error, data = data
    db.query(q, (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.get("/get_shop_categories/:shop_name", (req, res) => {
    const name = req.params.shop_name;

    // Create query
    const q =
      "SELECT DISTINCT category_name FROM marahuyo.prod_category JOIN products ON prod_category.prod_id = products.prod_id JOIN shop_info ON shop_info.shop_id = products.shop_id WHERE shop_info.shop_name = ?";

    // running the query
    // err = error, data = data
    db.query(q, [name], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });
};

export default Category;

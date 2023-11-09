const CategorizedItem = (app, db) => {
  // GETTING PRODUCTS FROM DATABASE
  app.get("/get_all_shop_products/:shop_name", (req, res) => {
    const name = req.params.shop_name;

    // Create query
    const q =
      "SELECT products.*, prod_image.image_url, shop_info.shop_name FROM shop_info JOIN products ON shop_info.shop_id = products.shop_id JOIN prod_image ON products.prod_id = prod_image.prod_id WHERE prod_image.img_lbl = 1 AND shop_info.shop_name = ? ORDER BY RAND ()";

    // running the query
    // err = error, data = data
    db.query(q, [name], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.get("/get_categorized_prod/:category_name/:shop_name", (req, res) => {
    const category = req.params.category_name;
    const name = req.params.shop_name;

    // Create query
    const q =
      "SELECT products.*, prod_image.image_url, category_name, shop_info.shop_name FROM shop_info JOIN products ON products.shop_id = shop_info.shop_id JOIN prod_image ON products.prod_id = prod_image.prod_id JOIN prod_category ON products.prod_id = prod_category.prod_id WHERE prod_image.img_lbl = 1 AND prod_category.category_name = ? AND shop_info.shop_name = ? ORDER BY RAND ()";

    // running the query
    // err = error, data = data
    db.query(q, [category, name], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });
};

export default CategorizedItem;

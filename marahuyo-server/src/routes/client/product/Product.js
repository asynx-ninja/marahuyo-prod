const Product = (app, db) => {
  // GETTING PRODUCTS FROM DATABASE
  app.get("/get_all_products", (req, res) => {
    // Create query
    const q =
      "SELECT products.*, prod_image.image_url FROM products JOIN prod_image ON products.prod_id = prod_image.prod_id WHERE prod_image.img_lbl = 1 ORDER BY RAND ()";

    // running the query
    // err = error, data = data
    db.query(q, (err, data) => {
      // console.log(data)
      return err ? res.json(err) : res.json(data);
    });
  });

  app.get("/get_prod_categorized/:prod_category", (req, res) => {
    const category = req.params.prod_category;
    // Create query
    const q =
      "SELECT products.*, prod_image.image_url FROM products JOIN prod_image ON products.prod_id = prod_image.prod_id JOIN prod_category ON products.prod_id = prod_category.prod_id WHERE prod_image.img_lbl = 1 AND prod_category.category_name = ? ORDER BY RAND ()";

    // running the query
    // err = error, data = data
    db.query(q, [category], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });
};

export default Product;

const Variants = (app, db) => {
  // GETTING PRODUCTS FROM DATABASE
  app.get("/get_variants/:prod_name", (req, res) => {
    const name = req.params.prod_name;

    // Create query
    const q =
      "SELECT variant_id, variant_color FROM prod_variant JOIN products ON prod_variant.prod_id = products.prod_id WHERE prod_name = ?";

    // running the query
    // err = error, data = data
    db.query(q, [name], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });
};

export default Variants;

const Size = (app, db) => {
  // GETTING PRODUCTS FROM DATABASE
  app.get("/get_size/:prod_name", (req, res) => {
    const name = req.params.prod_name;

    // Create query
    const q =
      "SELECT size_id, size_name FROM prod_size JOIN products ON prod_size.prod_id = products.prod_id WHERE prod_name = ?";

    // running the query
    // err = error, data = data
    db.query(q, [name], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });
};

export default Size;

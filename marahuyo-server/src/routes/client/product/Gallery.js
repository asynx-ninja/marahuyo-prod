const Gallery = (app, db) => {
  // GETTING PRODUCTS FROM DATABASE
  app.get("/get_gallery/:prod_name", (req, res) => {
    const name = req.params.prod_name;

    // Create query
    const q =
      "SELECT image_id, image_url FROM prod_image JOIN products ON prod_image.prod_id = products.prod_id WHERE prod_name = ?";

    // running the query
    // err = error, data = data
    db.query(q, [name], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });
};

export default Gallery;

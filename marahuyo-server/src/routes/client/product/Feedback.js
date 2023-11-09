const Feedback = (app, db) => {
  // GETTING PRODUCTS FROM DATABASE
  app.get("/get_feedback/:prod_name", (req, res) => {
    const name = req.params.prod_name;

    // Create query
    const q =
      "SELECT product_feedback.*, user_details.firstname, user_details.lastname, user_details.picture FROM marahuyo.product_feedback JOIN products ON product_feedback.prod_id = products.prod_id JOIN user_details ON product_feedback.user_id = user_details.user_id WHERE products.prod_name = ?";

    // running the query
    // err = error, data = data
    db.query(q, [name], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.get("/get_feedback_count/:prod_name", (req, res) => {
    const name = req.params.prod_name;

    // Create query
    const q =
      "SELECT COUNT(product_feedback.feedback_id) FROM marahuyo.product_feedback JOIN products ON product_feedback.prod_id = products.prod_id WHERE products.prod_name = ?";

    // running the query
    // err = error, data = data
    db.query(q, [name], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.get("/get_rating_average/:prod_name", (req, res) => {
    const name = req.params.prod_name;

    // Create query
    const q =
      "SELECT AVG(product_feedback.ratings) FROM marahuyo.product_feedback JOIN products ON product_feedback.prod_id = products.prod_id JOIN user_details ON product_feedback.user_id = user_details.user_id WHERE products.prod_name = ?";

    // running the query
    // err = error, data = data
    db.query(q, [name], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.get("/get_sort_feedback/:prod_name/:hash_star", (req, res) => {
    const name = req.params.prod_name;
    const star = req.params.hash_star;

    // Create query
    const q =
      "SELECT product_feedback.*, user_details.firstname, user_details.lastname, user_details.picture FROM marahuyo.product_feedback JOIN products ON product_feedback.prod_id = products.prod_id JOIN user_details ON product_feedback.user_id = user_details.user_id WHERE products.prod_name = ? AND product_feedback.ratings = ?";

    // running the query
    // err = error, data = data
    db.query(q, [name, star], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });
};

export default Feedback;

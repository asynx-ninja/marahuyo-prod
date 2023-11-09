

const Inventory = (app, db) => {
  

  app.get("/get_products/:id", (req, res) => {
    const q =
      "SELECT A.* FROM products A INNER JOIN shop_info B ON A.shop_id = B.shop_id WHERE B.user_id = ?;";
    const id = req.params.id;

    db.query(q, [id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  
};

export default Inventory;

const Sidebar = (app, db) => {
  app.get("/sidebar/:id", (req, res) => {
    const q =
      "SELECT user_id, firstname, picture FROM user_details WHERE user_id = ?";
    const id = req.params.id;

    db.query(q, [id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });
};

export default Sidebar;

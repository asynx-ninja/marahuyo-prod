const ChangePass = (app, db) => {
  app.get("/get_oldPass/:id", (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM user_credentials WHERE user_id = ?";
    db.query(q, [id], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.put("/change_password/:id", (req, res) => {
    const { id } = req.params;
    const value = [req.body.hash, id];

    const updateQ =
      "UPDATE user_credentials SET password = ? WHERE user_id = ?;";

    db.query(updateQ, [...value], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });
};

export default ChangePass;

const Header = (app, db) => {
  app.get("/get_loggedin_user/:id", (req, res) => {
    const q =
      "SELECT user_details.firstname, user_credentials.email, user_details.picture FROM user_details JOIN user_credentials ON user_details.user_id = user_credentials.user_id WHERE user_details.user_id = ?";
    const id = req.params.id;

    db.query(q, [id], (err, data) => {
        return err ? res.json(err) : res.json(data);
    });
  });
};

export default Header;

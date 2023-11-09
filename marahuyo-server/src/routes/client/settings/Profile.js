
const Profile = (app, db) => {
  app.get("/get_user_id/:id", (req, res) => {
    const id = req.params.id;

    // Query the database to fetch the user details based on the userId
    const q =
      "SELECT user_details.`user_id`, user_details.`firstname`, user_details.`lastname`, user_details.`number`, user_details.`age`,  DATE_FORMAT(user_details.`birthday`, '%Y-%m-%d') AS `birthday`, user_details.`picture`, user_credentials.`email` FROM marahuyo.user_details AS user_details INNER JOIN marahuyo.user_credentials AS user_credentials ON user_details.`user_id` = user_credentials.`user_id` WHERE user_details.`user_id` = ?";

    db.query(q, [id], (err, data) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json(data);
      }
    });
  });

  app.put("/edit_profile/:id", (req, res) => {
    const updateQ =
      "UPDATE user_details SET `firstname` = ?, `lastname` = ?, `number` = ?, `birthday` = ?, `age` = ? WHERE `user_id` = ?";
    const updateValues = [
      req.body.firstname,
      req.body.lastname,
      req.body.number,
      req.body.birthday,
      req.body.age,
      req.params.id,
    ];

    db.query(updateQ, [...updateValues], (updateErr) => {
      if (updateErr) {
        return res.json(updateErr);
      }

      return res.json("Successfully updated user profile");
    });
  });
};

export default Profile;

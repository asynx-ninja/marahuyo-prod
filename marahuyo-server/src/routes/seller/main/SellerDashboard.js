const Dashboard = (app, db) => {
  app.get("/get_shop_all_details/:id", (req, res) => {
    const id = req.params.id;
    // const q = " SELECT  A., B.email FROM user_details as A INNER JOIN user_credentials as B ON A.user_id = B.user_id  WHERE A.user_id = ?";
    const q =
      "SELECT A.*, B.email, C.* FROM user_details as A INNER JOIN user_credentials as B ON A.user_id = B.user_id  INNER JOIN  shop_info as C ON C.user_id = B.user_id WHERE A.user_id = ?";
    const value = [id];
    db.query(q, [value], (err, data) => {
      // returning error response
      if (err) {
        return res.json(err);
      }

      // returning the data
      return res.json(data);
    });
  });
};
export default Dashboard;

const PrintOrders = (app, db) => {
    app.get("/get_shop_data/:id", (req, res) => {
        const { id } = req.params;
        const q = "SELECT shop_info.shop_name, user_credentials.email FROM marahuyo.shop_info JOIN user_credentials ON user_credentials.user_id = shop_info.user_id WHERE shop_info.shop_id = ?";
        db.query(q, [id], (err, data) => {
          return err ? res.json(err) : res.json(data);
        });
      });
      
}

export default PrintOrders;
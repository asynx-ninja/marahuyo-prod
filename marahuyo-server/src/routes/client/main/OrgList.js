const OrgList = (app, db) => {
    // GETTING PRODUCTS FROM DATABASE
    app.get("/get_all_orgs/", (req, res) => {
  
      // Create query
      const q = "SELECT * FROM marahuyo.shop_info;";
  
      // running the query
      // err = error, data = data
      db.query(q, (err, data) => {
        return err ? res.json(err) : res.json(data);
      });
    });
  };
  
  export default OrgList;
  
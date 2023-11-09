const EditAdd = (app, db) => {
  app.get("/get_addressId/:addressId", (req, res) => {
    const addressId = req.params.addressId;

    const query = `SELECT fullName, phoneNumber, address_line, brgy, city, province, region FROM user_address WHERE address_id = ?`;
    db.query(query, [addressId], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });

  app.put("/edit_address/:addressId", (req, res) => {
    const { addressId } = req.params;

    const q =
      "UPDATE user_address SET fullName = ?, phoneNumber = ?, address_line = ?, brgy = ?, city = ?, province = ?, region = ? WHERE address_id = ?;";
    const values = [
      req.body.fullName,
      req.body.phoneNumber,
      req.body.address_line,
      req.body.barangay,
      req.body.city,
      req.body.province,
      req.body.region,
      addressId,
    ];

    db.query(q, values, (err, data) => {
      if (err) {
        console.error("Error updating address:", err);
        res.status(500).json({ error: "Failed to update address" });
      } else {
        res.json({ message: "Address updated successfully" });
      }
    });
  });
};

export default EditAdd;

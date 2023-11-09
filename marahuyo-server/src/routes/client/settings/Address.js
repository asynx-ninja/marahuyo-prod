const Address = (app, db) => {
  // Get user addresses
  app.get("/get_address/:id", (req, res) => {
    const { id } = req.params;

    db.query(
      "SELECT user_address.address_id, user_address.fullName, user_address.phoneNumber, user_address.address_line, user_address.brgy, user_address.city, user_address.province, user_address.region, user_address.default FROM user_details INNER JOIN user_address ON user_details.user_id = user_address.user_id WHERE user_details.user_id = ?",
      [id],
      (err, results) => {
        if (err) {
          console.error("Error retrieving addresses:", err);
          res.status(500).json({ error: "Failed to retrieve addresses" });
        } else {
          res.json(results);
        }
      }
    );
  });

  app.post("/save_address/:id", (req, res) => {
    const q =
      "INSERT INTO user_address (`fullName`, `phoneNumber`, `address_line`, `brgy`, `city`, `province`, `region`, `user_id`) VALUES (?);";
    const values = [
      req.body.fullName,
      req.body.phoneNumber,
      req.body.address_line,
      req.body.brgy,
      req.body.city,
      req.body.province,
      req.body.region,
      req.params.id,
    ];
    db.query(q, [values], (err, data) => {
      err
        ? res.json(err)
        : res.json("Client Details has been successfully executed.");
    });
  });

  app.delete("/delete_address/:addressId", (req, res) => {
    const { addressId } = req.params;

    db.query(
      "DELETE FROM user_address WHERE address_id = ?",
      [addressId],
      (err, results) => {
        if (err) {
          console.error("Error deleting address:", err);
          res.status(500).json({ error: "Failed to delete address" });
        } else {
          res.json({ message: "Address deleted successfully" });
        }
      }
    );
  });

  app.put("/set_default_address/:addressId/:id", (req, res) => {
    const q =
      'UPDATE user_address SET `default` = CASE WHEN address_id = ? THEN "default" ELSE NULL END WHERE user_id = ?';
    const values = [
      req.params.addressId, // Use req.params.addressId to get the addressId from the URL
      req.params.id, // Use req.params.addressId again for the WHERE clause
    ];

    db.query(q, [...values], (err, data) => {
      return err ? res.json(err) : res.json(data);
    });
  });
};

export default Address;

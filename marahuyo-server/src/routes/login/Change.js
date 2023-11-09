const Change = (app, db) => {
    app.put("/change_pass/:id", (req, res) => {
        const q = "SELECT * FROM user_credentials WHERE `user_id` = ?;";
        const id= [req.params.id];
    
        db.query(q, [id], (err, data) => {
            if (err) 
                return res.json(err);
            
            const client = data[0];
            if (!client) 
                return res.json("Client not found");
    
            if (req.body.newPassword !== req.body.confirmNewPassword) {
                return res.json("Passwords do not match");
            }

            const updateQ = "UPDATE user_credentials SET `password` = ? WHERE `user_id` = ?;";
            const updateValues = [req.body.newPassword, req.params.id];
    
            db.query(updateQ, updateValues, (updateErr, updateData) => {
                return err ? res.json(updateErr) : res.json(updateData)
            });
        });
    });
}

export default Change;
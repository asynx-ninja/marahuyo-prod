const Code = (app, db) => {
    // GETTING DETAILS FROM DATABASE
    app.get("/get_forgot_pass/:id", (req, res) => {
        const values = req.params.id;

        // Create query
        const q = "SELECT user_credentials.email, user_forgot_pass.forgot_id, user_forgot_pass.code, user_forgot_pass.date FROM user_credentials RIGHT JOIN user_forgot_pass ON user_credentials.user_id = user_forgot_pass.user_id WHERE user_credentials.user_id = ?";

        // running the query
        // err = error, data = data
        db.query(q, [values], (err, data) => {
            return err ? res.json(err) : res.json(data);
        });
    });
}

export default Code;
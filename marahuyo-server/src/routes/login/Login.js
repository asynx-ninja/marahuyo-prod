const Login = (app, db) => {
    // RETAIN
    app.get("/get_user_credentials/:email", (req,res) => {
        const q = "SELECT * FROM user_credentials WHERE `email` = ?";
        const email = [req.params.email];
        db.query(q, [email], (err, data) => {
            err ? res.json(err) : res.json(data)
        })
    })
}

export default Login;
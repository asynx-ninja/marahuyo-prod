const Register = (app, db) => {
    // GET
    app.get("/get_last_id", (req,res) => {
        const q = "SELECT MAX(user_id) AS id FROM user_details";
        
        db.query(q, (err, data) => {
            return err ? res.json(err) : res.json(data)
        })
    })
    
    // INSERT DATA
    app.post("/insert_user_credentials/", (req,res) => {
        const data = req.body.obj;
        const pass = req.body.encryptedPass;
        const q = "INSERT INTO user_credentials (`user_id`, `email`, `password`, `user_type`) VALUES (?);"
        const values = [
            data.id + 1,
            data.email, 
            pass,
            data.usertype
        ]

        db.query(q, [values], (err, data) => {
            return err ? res.json(err) : res.json("Successfully created!")
        })
    })

    app.post("/insert_user_details/", (req,res) => { 
        const q = "INSERT INTO user_details (`firstname`, `lastname`, `number`, `birthday`, `age`, `picture`) VALUES (?);"
        const values = [
            req.body.firstname, 
            req.body.lastname,
            req.body.number,
            req.body.birthday,
            req.body.age,
            null
        ]

        db.query(q, [values], (err, data) => {
            return err ? res.json(err) : res.json("Client Details has been successfully executed.")
        })
    })
}

export default Register;
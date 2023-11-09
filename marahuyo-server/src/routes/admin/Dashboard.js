const Dashboard = (app, db) => {
    app.get("/get_admin_info/:id", (req, res) => {
        const id = req.params.id
        const q = "SELECT A.email, B.firstname, B.lastname, B.number, B.birthday, B.age, B.picture FROM user_credentials A INNER JOIN user_details B ON A.user_id = B.user_id WHERE A.user_id = ?"
        
        db.query(q, [id], (err,data) => {
            return err ? res.json(err) : res.json(data)
        })
    })

    app.get("/get_count_admin/", (req, res) => {
        const q = "SELECT COUNT(user_id) as CTR FROM user_credentials WHERE user_type = 'admin'"
        
        db.query(q, (err,data) => {
            return err ? res.json(err) : res.json(data)
        })
    })

    app.get("/get_count_customer/", (req, res) => {
        const q = "SELECT COUNT(user_id) as CTR FROM user_credentials WHERE user_type = 'customer'"
        
        db.query(q, (err,data) => {
            return err ? res.json(err) : res.json(data)
        })
    })

    app.get("/get_count_seller/", (req, res) => {
        const q = "SELECT COUNT(user_id) as CTR FROM user_credentials WHERE user_type = 'seller'"
        
        db.query(q, (err,data) => {
            return err ? res.json(err) : res.json(data)
        })
    })
}

export default Dashboard;
import multer from "multer"
import cloudinary from "cloudinary"

const Users = (app, db) => {
    const storage = multer.diskStorage({});
    const upload = multer({
        storage: storage,
    });

    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    app.get("/get_users_info/", (req, res) => {
        const q = "SELECT A.user_id, A.email, A.user_type, B.firstname, B.lastname, B.number, B.birthday, B.age, B.picture FROM user_credentials A INNER JOIN user_details B ON A.user_id = B.user_id"
        
        db.query(q, (err,data) => {
            
            return err ? res.json(err) : res.json(data)
        })
    })

    app.get("/get_specific_info/:id", (req, res) => {
        const id = req.params.id
        const q = "SELECT A.user_id, A.email, A.user_type, B.firstname, B.lastname, B.number, B.birthday, B.age, B.picture FROM user_credentials A INNER JOIN user_details B ON A.user_id = B.user_id WHERE A.user_id = ?"
        
        db.query(q, [id], (err,data) => {
            
            return err ? res.json(err) : res.json(data)
        })
    })

    app.put("/update_user_info/:id", (req, res) => {
        const id = req.params.id;
        const data = req.body;
        const q = "UPDATE user_details SET `firstname` = ?, `lastname` = ?, `number` = ?, `birthday` = ?, `age` = ? WHERE user_id = ?"
        const values = [
            data.firstname,
            data.lastname,
            data.number,
            data.birthday,
            data.age,
            id
        ]

        db.query(q, [...values], (err,data) => {
            return err ? res.json(err) : res.json("Update successfully")
        })
    })

    app.delete("/delete_acc/:id", (req, res) => {
        const id = req.params.id;
        const q = "DELETE FROM user_credentials WHERE user_id = ?";
        const q1 = "DELETE FROM user_details WHERE user_id = ?";

        db.query(q, id, (err,data) => {
            db.query(q1, id, (err,data) => {
                
                return err ? res.json(err) : res.json("Update successfully")
            })
        })
    })

    app.put("/updateImage/:id", upload.single("image"), async (req, res) => {
        try{
            const id = req.params.id;
            const q = "UPDATE user_details SET `picture` = ? WHERE user_id = ?"
            const upload = await cloudinary.v2.uploader.upload(req.file.path, {folder: 'users'});
            const values = [upload.secure_url, id];
    
            db.query(q, [...values], (err, data) => {
                return err ? res.json(err) : res.json("Successfully updated!")
            });
        }catch(err){
            res.json(err)
        }
    })
}

export default Users;
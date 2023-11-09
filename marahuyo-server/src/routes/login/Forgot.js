const Forgot = (app, db, hbs, nodemailer) => {
    const id = process.cwd()
    const view_url = id + "\\src\\views\\"
    const asset_url = id + "\\src\\assets\\imgs\\"

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MARAHUYO_GMAIL_USER,
            pass: process.env.MARAHUYO_GMAIL_PASS,
        },
    });

    const handlebarOptions = {
        viewEngine: {
            extName: ".handlebars",
            partialsDir: view_url,
            defaultLayout: false,
        },
        viewPath: view_url,
        extName: ".handlebars",
    }

    // FUNCTION TO GENERATE 6 DIGITS CODE
    const generateOtp = () => {
        let otp = "";

        var minm = 100000;
        var maxm = 999999;
        otp = Math.floor(Math.random() * (maxm - minm + 1)) + minm;

        return Number(otp);
    }

    const getDate = () => {
        const date = new Date();

        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');
        let hour = String(date.getHours());
        let minutes = String(date.getMinutes());
        let seconds = String(date.getSeconds());

        let currentDate = `${year}-${month}-${day}T${hour}:${minutes}:${seconds}`;

        return currentDate;
    }

    const sendEmail = async (email, otp) => {
        try {
            const mail_configs = {
                from: process.env.MARAHUYO_GMAIL_USER,
                to: email,
                subject: "Password Reset Request",
                template: 'Code',
                context: {
                    code: otp,
                    email: email
                },
                attachments: [
                    {
                        filename: "LoginLogo.png",
                        path: `${asset_url}LoginLogo.png`,
                        cid: "logo1"
                    },
                    {
                        filename: "TUPLogo.png",
                        path: `${asset_url}TUPLogo.png`,
                        cid: "logo2"
                    }
                ]
            };

            transporter.use('compile', hbs(handlebarOptions))
            const info = await transporter.sendMail(mail_configs);
            return { Message: "Email sent successfully" };
        } catch (error) {
          console.log(error);
          throw { message: `An error has occurred` };
        }
    };
    
    app.get("/get_user_account", (req, res) => {
        // Create query
        const q = "SELECT `user_id`, `email` FROM user_credentials";
    
        // running the query
        // err = error, data = data
        db.query(q, (err, data) => {
            return err ? res.json(err) : res.json(data);
        });
    });

    app.get("/get_forgot_credentials/:id", (req, res) => {
        const id = req.params.id;

        const q1 = "SELECT forgot_id FROM user_forgot_pass WHERE user_id = ?";
        
        db.query(q1, [id], (err, data) => {
            
            return err ? res.json(err) : res.json(data);
        })
    });


    app.post("/insert_forgot_credentials", (req,res) => {
        const q = "INSERT INTO user_forgot_pass (`user_id`, `code`, `date`) VALUES (?)";
        const otp = generateOtp(6);
        const date = getDate();

        const values = [
            req.body.user_id,
            otp,
            date
        ]

        db.query(q, [values], (err, data) => {
            return err ? res.json(err) : res.json("Successfully Inserted!");
        });
        
        sendEmail(req.body.email, otp)
            .then((response) => res.send(response.message))
            .catch((error) => res.status(500).send(error.message));
    });

    // UPDATE DATA
    app.put("/update_forgot_credentials/:id", (req,res) => {
        
        const q = "UPDATE user_forgot_pass SET `code` = ?, `date` = ? WHERE forgot_id = ?";
        const id = req.params.id;
        const otp = generateOtp(6);
        const date = getDate();
        const values = [
            otp,
            date,
            id
        ]

        db.query(q, [...values], (err, data) => {
            return err ? res.json(err) : res.json("Successfully updated!");
        });

        sendEmail(req.body.email, otp)
            .then((response) => res.send(response.message))
            .catch((error) => res.status(500).send(error.message));
    });
}

export default Forgot;
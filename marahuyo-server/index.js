import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv"
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import Route from "./src/routes/Route.js";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     port: process.env.SERVER_PORT,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
// });

const db = mysql.createConnection({
  host: process.env.LOCAL_HOST,
  user: process.env.LOCAL_USER,
  password: process.env.LOCAL_PASSWORD,
  database: process.env.LOCAL_DATABASE,
});

// STARTER
app.get("/", (req, res) => {
    res.json("Hello! This is the backend!");
});


// app.listen(process.env.SERVER_PORT, () => {
//     console.log(`Listening to ${process.env.SERVER_PORT}!`);
// });

app.listen(process.env.LOCAL_PORT, () => {
  console.log(`Listening to ${process.env.LOCAL_PORT}!`);
});

Route(app, db, hbs, nodemailer);




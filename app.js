import express from "express";
import mysql from "mysql2";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

dotenv.config(); 

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// API to add school
app.post("/api/schools",  (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;

  const sql = `INSERT INTO schools (name, address, city, state, contact,  email_id)
               VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [name, address, city, state, contact,  email_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "School added successfully!" });
  });
});

// API to get schools
app.get("/api/schools", (req, res) => {
  db.query("SELECT * FROM schools", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));

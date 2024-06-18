const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Verbindung zur ersten Datenbank (signup)
const dbSignup = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

// Verbindung zur zweiten Datenbank (Uebungsdatenbank)
const dbExercises = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Uebungsdatenbank",
});

// Endpoint für die Benutzerregistrierung
app.post("/signup", (req, res) => {
  const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password];
  dbSignup.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

// Endpoint für die Benutzeranmeldung
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
  dbSignup.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json({ message: "Error" });
    }
    if (data.length > 0) {
      return res.json({ message: "Success", userId: data[0].id });
    } else {
      return res.json({ message: "Fail" });
    }
  });
});

// Endpoint zum Abrufen der Übungen basierend auf der Kategorie
app.get("/exercises/:category", (req, res) => {
  const category = req.params.category;
  const sql = "SELECT ID, NAME FROM Uebungen WHERE Kategorie = ?";
  dbExercises.query(sql, [category], (err, data) => {
    if (err) {
      console.error("Error fetching exercises:", err);
      return res.status(500).json("Internal server error");
    }
    return res.json(data);
  });
});

// Endpoint zum Speichern der ausgewählten Übungen eines Benutzers
app.post("/user-exercises", (req, res) => {
  const { userId, category, exercises } = req.body;

  const insertQuery =
    "INSERT INTO user_exercises (user_id, category, exercise_id) VALUES ?";
  const values = exercises.map((exercise) => [userId, category, exercise.ID]);

  dbExercises.query(insertQuery, [values], (err, result) => {
    if (err) {
      console.error("Error saving exercises:", err);
      return res.status(500).json("Internal server error");
    }
    return res.json("Exercises saved successfully!");
  });
});

app.listen(8081, () => {
  console.log("Server running on port 8081");
});

/*
  Autor: Noah Burren
  Datum: 26.06.2024
  Version: 1
  Beschreibung: Serververbindungen für Login, Übungen und Kalender
*/

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors()); // Erlaubt Cross-Origin Requests (CORS)
app.use(express.json()); // Middleware für das Parsen von JSON-Daten

// Verbindung zur MySQL-Datenbank für Anmeldungen
const dbSignup = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

// Verbindung zur MySQL-Datenbank für Übungsdaten
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
      console.error("Error inserting user:", err);
      return res.status(500).json("Internal server error");
    }
    return res.json(data);
  });
});

// Endpoint für den Benutzerlogin
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
  dbSignup.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.json({ message: "Error" });
    }
    if (data.length > 0) {
      return res.json({ message: "Success", userId: data[0].id });
    } else {
      return res.json({ message: "Fail" });
    }
  });
});

// Endpoint für Übungen nach Kategorie abrufen
app.get("/exercises/:category", (req, res) => {
  const category = req.params.category;
  const sql = "SELECT ID, NAME FROM Uebungen WHERE Kategorie = ?";
  dbExercises.query(sql, [category], (err, data) => {
    if (err) {
      console.error("Error fetching exercises:", err);
      return res.status(500).json("Internal server error");
    }
    return res.json(data); // Erfolgreiche Antwort mit Übungsdaten
  });
});

// Endpoint für Benutzerübungen speichern
app.post("/user-exercises", (req, res) => {
  const { userId, category, exercises } = req.body;

  // DELETE-Query für vorherige Einträge des Benutzers in dieser Kategorie
  const deleteQuery =
    "DELETE FROM user_exercises WHERE user_id = ? AND category = ?";
  dbExercises.query(
    deleteQuery,
    [userId, category],
    (deleteErr, deleteResult) => {
      if (deleteErr) {
        console.error("Error deleting exercises:", deleteErr);
        return res.status(500).json("Internal server error");
      }

      // INSERT-Query für neue Einträge der Benutzerübungen
      const insertQuery =
        "INSERT INTO user_exercises (user_id, category, exercise_id) VALUES ?";
      const values = exercises.map((exercise) => [
        userId,
        category,
        exercise.ID,
      ]);

      // Batch-Insert der Übungen
      dbExercises.query(insertQuery, [values], (insertErr, insertResult) => {
        if (insertErr) {
          console.error("Error saving exercises:", insertErr);
          return res.status(500).json("Internal server error");
        }
        return res.json("Exercises saved successfully!");
      });
    }
  );
});

// Endpoint für Benutzerübungen in einer Kategorie löschen
app.delete("/user-exercises/:category", (req, res) => {
  const { userId } = req.body;
  const category = req.params.category;

  // DELETE-Query für Benutzerübungen in einer Kategorie
  const deleteExercisesQuery =
    "DELETE FROM user_exercises WHERE user_id = ? AND category = ?";
  dbExercises.query(deleteExercisesQuery, [userId, category], (err, result) => {
    if (err) {
      console.error("Error deleting user exercises:", err);
      return res.status(500).json("Internal server error");
    }

    // DELETE-Query für Kalendereinträge des Benutzers in dieser Kategorie
    const deleteCalendarQuery =
      "DELETE FROM user_calendar WHERE user_id = ? AND category = ?";
    dbExercises.query(
      deleteCalendarQuery,
      [userId, category],
      (calendarErr, calendarResult) => {
        if (calendarErr) {
          console.error("Error deleting calendar entry:", calendarErr);
          return res.status(500).json("Internal server error");
        }
        return res.json(
          "User exercises and calendar entry deleted successfully!"
        );
      }
    );
  });
});

// Endpoint für Benutzerübungen nach Benutzer-ID abrufen
app.get("/user-exercises", (req, res) => {
  const userId = req.query.userId;
  const sql = `
    SELECT ue.category, ue.exercise_id, u.NAME
    FROM user_exercises ue
    JOIN Uebungen u ON ue.exercise_id = u.ID
    WHERE ue.user_id = ?
  `;
  dbExercises.query(sql, [userId], (err, data) => {
    if (err) {
      console.error("Error fetching user exercises:", err);
      return res.status(500).json("Internal server error");
    }

    // Gruppieren der Übungen nach Kategorie für die Antwort
    const exercisesByCategory = data.reduce((acc, exercise) => {
      if (!acc[exercise.category]) {
        acc[exercise.category] = [];
      }
      acc[exercise.category].push({
        ID: exercise.exercise_id,
        NAME: exercise.NAME,
      });
      return acc;
    }, {});

    return res.json(exercisesByCategory); // Erfolgreiche Antwort mit gruppierten Übungen
  });
});

// Endpoint für Benutzerkalendereinträge speichern
app.post("/user-calendar", (req, res) => {
  const { userId, day, category } = req.body;

  // DELETE-Query für vorherige Kalendereinträge des Benutzers an diesem Tag
  const deleteQuery = "DELETE FROM user_calendar WHERE user_id = ? AND day = ?";
  dbExercises.query(deleteQuery, [userId, day], (deleteErr, deleteResult) => {
    if (deleteErr) {
      console.error("Error deleting calendar entry:", deleteErr);
      return res.status(500).json("Internal server error");
    }

    // INSERT-Query für neuen Kalendereintrag des Benutzers
    const insertQuery =
      "INSERT INTO user_calendar (user_id, day, category) VALUES (?, ?, ?)";
    dbExercises.query(
      insertQuery,
      [userId, day, category],
      (insertErr, insertResult) => {
        if (insertErr) {
          console.error("Error saving calendar entry:", insertErr);
          return res.status(500).json("Internal server error");
        }
        return res.json("Calendar entry saved successfully!");
      }
    );
  });
});

// Endpoint für Benutzerkalendereinträge nach Benutzer-ID abrufen
app.get("/user-calendar", (req, res) => {
  const userId = req.query.userId;
  const sql = "SELECT day, category FROM user_calendar WHERE user_id = ?";
  dbExercises.query(sql, [userId], (err, data) => {
    if (err) {
      console.error("Error fetching calendar entries:", err);
      return res.status(500).json("Internal server error");
    }
    return res.json(data); // Erfolgreiche Antwort mit Kalendereinträgen
  });
});

// Server starten und auf Port 8081 lauschen
app.listen(8081, () => {
  console.log("Server running on port 8081");
});

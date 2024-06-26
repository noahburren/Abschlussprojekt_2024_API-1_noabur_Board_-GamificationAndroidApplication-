/*
  Autor: Noah Burren
  Datum: 26.06.2024
  Version: 1
  Beschreibung: Übungsauswahl
*/

import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import der useParams- und useNavigate-Hooks für die Verwendung von URL-Parametern und Navigation
import axios from "axios"; // Import von axios für HTTP-Anfragen
import { AuthContext } from "./AuthContext"; // Import des AuthContext für Benutzerinformationen
import "bootstrap/dist/css/bootstrap.min.css"; // Import von Bootstrap CSS für Styling

const Exercises = () => {
  const { category } = useParams(); // Extrahiert den Parameter "category" aus der URL
  const [exercises, setExercises] = useState([]); // Zustand für die geladenen Übungen der aktuellen Kategorie
  const [selectedExercises, setSelectedExercises] = useState([]); // Zustand für ausgewählte Übungen
  const [selectedDay, setSelectedDay] = useState(""); // Zustand für den ausgewählten Tag
  const { userId } = useContext(AuthContext); // Zugriff auf userId aus dem AuthContext für Authentifizierung
  const navigate = useNavigate(); // Hook zum Navigieren zwischen Seiten

  const daysOfWeek = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag",
  ]; // Array mit Wochentagen für die Auswahl

  // Effekt zum Abrufen der Übungen für die aktuelle Kategorie
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/exercises/${category}`
        ); // GET-Anfrage an die API für Übungen der aktuellen Kategorie
        setExercises(response.data); // Setzt den Zustand exercises mit den erhaltenen Daten
      } catch (error) {
        console.error("Fehler beim Laden der Übungen:", error); // Konsolenausgabe bei Fehler
        alert("Fehler beim Laden der Übungen."); // Fehlermeldung für Benutzer
      }
    };

    fetchExercises(); // Ruft die Funktion zum Laden der Übungen auf
  }, [category]); // Abhängigkeitsarray stellt sicher, dass der Effekt bei Änderungen von category ausgeführt wird

  // Funktion zum Auswählen bzw. Abwählen einer Übung
  const handleSelectExercise = (exercise) => {
    setSelectedExercises((prev) =>
      prev.includes(exercise)
        ? prev.filter((e) => e !== exercise)
        : [...prev, exercise]
    ); // Aktualisiert den Zustand selectedExercises entsprechend der Auswahl
  };

  // Funktion zum Speichern der ausgewählten Übungen für einen Tag
  const handleSaveExercises = async () => {
    if (!selectedDay) {
      alert("Bitte wählen Sie einen Tag aus."); // Benutzerhinweis, falls kein Tag ausgewählt wurde
      return;
    }

    try {
      await axios.post("http://localhost:8081/user-exercises", {
        userId,
        category,
        exercises: selectedExercises,
      }); // POST-Anfrage zum Speichern der ausgewählten Übungen eines Benutzers
      await axios.post("http://localhost:8081/user-calendar", {
        userId,
        day: selectedDay,
        category,
      }); // POST-Anfrage zum Speichern des ausgewählten Tags im Kalender
      alert("Übungen und Tag erfolgreich gespeichert!"); // Erfolgsmeldung für den Benutzer
    } catch (error) {
      console.error("Fehler beim Speichern der Übungen oder des Tages:", error); // Konsolenausgabe bei Fehlern
      alert("Fehler beim Speichern der Übungen oder des Tages."); // Fehlermeldung für Benutzer
    }
  };

  // Funktion zum Löschen aller gespeicherten Übungen einer Kategorie
  const handleDeleteExercises = async () => {
    try {
      await axios.delete(`http://localhost:8081/user-exercises/${category}`, {
        data: { userId },
      }); // DELETE-Anfrage zum Löschen der Übungen einer Kategorie für einen Benutzer
      alert("Übungen erfolgreich gelöscht!"); // Erfolgsmeldung für den Benutzer
      setSelectedExercises([]); // Leert die Auswahl der ausgewählten Übungen
    } catch (error) {
      console.error("Fehler beim Löschen der Übungen:", error); // Konsolenausgabe bei Fehlern
      alert("Fehler beim Löschen der Übungen."); // Fehlermeldung für Benutzer
    }
  };

  // Funktion zum Navigieren zurück zur Home-Seite
  const handleNavigateToHome = () => {
    navigate("/home"); // Navigiert zur Home-Seite
  };

  return (
    <div className="bg-primary min-vh-100 py-4">
      <div className="container bg-white p-3 rounded col-12 col-md-10 col-lg-8 overflow-auto">
        <h1 className="text-center mb-4">Übungen für {category}</h1>
        <ul className="list-group mb-4">
          {exercises.map((exercise) => (
            <li
              key={exercise.ID}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <label className="mb-0">
                <input
                  type="checkbox"
                  checked={selectedExercises.includes(exercise)}
                  onChange={() => handleSelectExercise(exercise)}
                />{" "}
                <span className="ml-2">{exercise.NAME}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className="mb-4">
          <label htmlFor="daySelect" className="form-label">
            Wählen Sie einen Tag
          </label>
          <select
            id="daySelect"
            className="form-select"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            <option value="">Tag auswählen</option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-success btn-block"
            onClick={handleSaveExercises}
          >
            Übungen speichern
          </button>
          <button
            className="btn btn-danger btn-block"
            onClick={handleDeleteExercises}
          >
            Alle Übungen löschen
          </button>
        </div>
        <button
          className="btn btn-primary btn-block mt-3"
          onClick={handleNavigateToHome}
        >
          Zurück zu deinen Übungen
        </button>
      </div>
    </div>
  );
};

export default Exercises;

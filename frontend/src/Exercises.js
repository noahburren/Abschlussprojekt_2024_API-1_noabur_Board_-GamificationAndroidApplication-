import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Exercises = () => {
  const { category } = useParams(); // Holt die Kategorie aus den URL-Parametern
  const [exercises, setExercises] = useState([]); // State für die Liste der Übungen
  const [selectedExercises, setSelectedExercises] = useState([]); // State für ausgewählte Übungen
  const [selectedDay, setSelectedDay] = useState(""); // State für ausgewählten Tag
  const { userId } = useContext(AuthContext); // Holt die userId aus dem AuthContext
  const navigate = useNavigate(); // Hook zum Navigieren in React Router

  const daysOfWeek = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag",
  ]; // Liste der Wochentage

  useEffect(() => {
    // Effekt, der beim Laden der Komponente ausgeführt wird
    const fetchExercises = async () => {
      // Funktion zum Abrufen der Übungen aus der API
      try {
        const response = await axios.get(
          `http://localhost:8081/exercises/${category}`
        ); // GET-Anfrage an die API, um Übungen zu erhalten
        setExercises(response.data); // Setzt die empfangenen Übungen im State
      } catch (error) {
        console.error("Fehler beim Laden der Übungen:", error); // Fehlerbehandlung bei fehlgeschlagenem Laden der Übungen
        alert("Fehler beim Laden der Übungen."); // Benachrichtigung über Fehler
      }
    };

    fetchExercises(); // Ruft die Funktion zum Laden der Übungen auf
  }, [category]); // Abhängigkeit: Änderung der Kategorie führt erneutes Laden der Übungen aus

  const handleSelectExercise = (exercise) => {
    // Funktion zum Auswählen/Abwählen einer Übung
    setSelectedExercises((prev) =>
      prev.includes(exercise)
        ? prev.filter((e) => e !== exercise)
        : [...prev, exercise]
    ); // Wenn Übung bereits ausgewählt, entferne sie aus der Liste, sonst füge sie hinzu
  };

  const handleSaveExercises = async () => {
    // Funktion zum Speichern der ausgewählten Übungen und des Tages
    if (!selectedDay) {
      alert("Bitte wählen Sie einen Tag aus."); // Validierung: Tag muss ausgewählt sein
      return;
    }

    try {
      await axios.post("http://localhost:8081/user-exercises", {
        userId,
        category,
        exercises: selectedExercises,
      }); // POST-Anfrage zum Speichern der Übungen des Benutzers
      await axios.post("http://localhost:8081/user-calendar", {
        userId,
        day: selectedDay,
        category,
      }); // POST-Anfrage zum Speichern des ausgewählten Tages im Kalender
      alert("Übungen und Tag erfolgreich gespeichert!"); // Erfolgreiche Benachrichtigung
    } catch (error) {
      console.error("Fehler beim Speichern der Übungen oder des Tages:", error); // Fehlerbehandlung bei Speicherfehlern
      alert("Fehler beim Speichern der Übungen oder des Tages."); // Benachrichtigung über Fehler
    }
  };

  const handleDeleteExercises = async () => {
    // Funktion zum Löschen aller gespeicherten Übungen einer Kategorie
    try {
      await axios.delete(`http://localhost:8081/user-exercises/${category}`, {
        data: { userId },
      }); // DELETE-Anfrage zum Löschen der Benutzerübungen
      alert("Übungen erfolgreich gelöscht!"); // Erfolgreiche Benachrichtigung
      setSelectedExercises([]); // Leert die Liste der ausgewählten Übungen nach dem Löschen
    } catch (error) {
      console.error("Fehler beim Löschen der Übungen:", error); // Fehlerbehandlung beim Löschen
      alert("Fehler beim Löschen der Übungen."); // Benachrichtigung über Fehler
    }
  };

  const handleNavigateToHome = () => {
    navigate("/home"); // Navigiert zurück zur Startseite
  };

  return (
    <div className="bg-primary min-vh-100 py-4">
      <div className="container bg-white p-3 rounded col-12 col-md-10 col-lg-8 overflow-auto">
        <h1 className="text-center mb-4">Übungen für {category}</h1>{" "}
        {/* Überschrift mit Kategorie */}
        <ul className="list-group mb-4">
          {exercises.map(
            (
              exercise // Liste der Übungen
            ) => (
              <li
                key={exercise.ID} // Eindeutiger Schlüssel für jedes Listenelement
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <label className="mb-0">
                  <input
                    type="checkbox"
                    checked={selectedExercises.includes(exercise)}
                    onChange={() => handleSelectExercise(exercise)}
                  />{" "}
                  {/* Checkbox zum Auswählen der Übung */}
                  <span className="ml-2">{exercise.NAME}</span>{" "}
                  {/* Anzeige des Übungsnamens */}
                </label>
              </li>
            )
          )}
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
            <option value="">Tag auswählen</option> {/* Standardoption */}
            {daysOfWeek.map(
              (
                day // Optionen für jeden Wochentag
              ) => (
                <option key={day} value={day}>
                  {day}
                </option>
              )
            )}
          </select>
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-success" onClick={handleSaveExercises}>
            Übungen speichern
          </button>{" "}
          {/* Button zum Speichern der Übungen */}
          <button className="btn btn-danger" onClick={handleDeleteExercises}>
            Alle Übungen löschen
          </button>{" "}
          {/* Button zum Löschen aller Übungen */}
        </div>
        <button className="btn btn-primary mt-3" onClick={handleNavigateToHome}>
          Zurück zu deinen Übungen
        </button>{" "}
        {/* Button zum Zurücknavigieren zur Startseite */}
      </div>
    </div>
  );
};

export default Exercises;

import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import der useNavigate-Hook für Navigation
import axios from "axios"; // Import von axios für HTTP-Anfragen
import { AuthContext } from "./AuthContext"; // Import des AuthContext für Benutzerinformationen
import "bootstrap/dist/css/bootstrap.min.css"; // Import von Bootstrap CSS für Styling

const Home = () => {
  const navigate = useNavigate(); // Hook zum Navigieren zwischen Seiten
  const { userId, logout } = useContext(AuthContext); // Zugriff auf userId und logout-Funktion aus dem AuthContext
  const [userExercises, setUserExercises] = useState(null); // Zustand für Benutzerübungen
  const [selectedCategory, setSelectedCategory] = useState(null); // Zustand für ausgewählte Muskelgruppe

  const muscleGroups = ["Beine", "Brust", "Rücken", "Arme"]; // Array mit Muskelgruppen

  // Funktion zum Behandeln des Klicks auf eine Muskelgruppe
  const handleCategoryClick = (category) => {
    navigate(`/exercises/${category}`); // Navigiert zur Seite mit Übungen für die ausgewählte Muskelgruppe
  };

  // Effekt zum Abrufen der Benutzerübungen, wenn sich userId oder selectedCategory ändert
  useEffect(() => {
    if (selectedCategory !== null) {
      // Überprüft, ob eine Muskelgruppe ausgewählt wurde
      axios
        .get(`http://localhost:8081/user-exercises`, { params: { userId } }) // GET-Anfrage an die API mit userId als Parameter
        .then((response) => {
          setUserExercises(response.data); // Setzt den Zustand userExercises mit den abgerufenen Daten
        })
        .catch((error) => {
          console.error("Fehler beim Abrufen der Benutzerübungen:", error); // Fehlermeldung, falls das Abrufen fehlschlägt
        });
    }
  }, [userId, selectedCategory]); // Abhängigkeitsarray stellt sicher, dass der Effekt bei Änderungen von userId oder selectedCategory ausgeführt wird

  // Funktion zum Anzeigen der Übungen für eine bestimmte Muskelgruppe
  const handleShowExercises = (category) => {
    setSelectedCategory(category); // Setzt den Zustand selectedCategory auf die ausgewählte Muskelgruppe
  };

  // Funktion zum Ausloggen des Benutzers
  const handleLogout = () => {
    logout(); // Ruft die logout-Funktion aus dem AuthContext auf
    navigate("/"); // Navigiert zurück zur Startseite nach dem Ausloggen
  };

  // Funktion zum Navigieren zur Wochenkalender-Seite
  const handleNavigateToCalendar = () => {
    navigate("/weekly-calendar"); // Navigiert zur Wochenkalender-Seite
  };

  return (
    <div className="bg-primary min-vh-100 py-4">
      <div className="container bg-white p-3 rounded">
        <h1 className="text-center mb-4">Wähle eine Muskelgruppe</h1>
        <button className="btn btn-danger mb-3" onClick={handleLogout}>
          Logout
        </button>
        <ul className="list-group mb-4">
          {muscleGroups.map((group) => (
            <li
              key={group}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <button
                className="btn btn-primary btn-block" // Stylisierung des Buttons mit Bootstrap-Klassen
                onClick={() => handleCategoryClick(group)} // Klick-Handler für die Muskelgruppenauswahl
              >
                {group}
              </button>
            </li>
          ))}
        </ul>

        <h2 className="text-center mb-3">Deine Übungen</h2>
        {muscleGroups.map((category) => (
          <div key={category} className="mb-4">
            <div className="card">
              <div className="card-header">
                <h3>{category}</h3>
              </div>
              <div className="card-body">
                <ul className="list-group">
                  {selectedCategory === category && userExercises !== null ? ( // Bedingte Anzeige der Übungen für die ausgewählte Muskelgruppe
                    userExercises[category] &&
                    userExercises[category].length > 0 ? (
                      userExercises[category].map((exercise) => (
                        <li
                          key={exercise.ID}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          {exercise.NAME} {/* Anzeige des Übungsnamens */}
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item">
                        Keine Übung dieser Kategorie vorhanden
                      </li>
                    )
                  ) : (
                    <li className="list-group-item"></li>
                  )}
                </ul>
              </div>
            </div>
            <button
              className="btn btn-success btn-block mt-2" // Button zum Anzeigen der Übungen für die ausgewählte Muskelgruppe
              onClick={() => handleShowExercises(category)}
            >
              Zeige Übungen für {category}
            </button>
          </div>
        ))}
        <button
          className="btn btn-primary btn-block mt-3" // Button zum Navigieren zur Wochenkalender-Seite
          onClick={handleNavigateToCalendar}
        >
          Zum Wochenkalender
        </button>
      </div>
    </div>
  );
};

export default Home;

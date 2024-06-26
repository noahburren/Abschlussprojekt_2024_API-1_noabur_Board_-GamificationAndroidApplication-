/*
  Autor: Noah Burren
  Datum: 26.06.2024
  Version: 1
  Beschreibung: Wochenkalender
*/

import React, { useEffect, useState, useContext } from "react";
import axios from "axios"; // Import von axios für HTTP-Anfragen
import { useNavigate } from "react-router-dom"; // Import der useNavigate-Hook für die Navigation
import { AuthContext } from "./AuthContext"; // Import des AuthContext für Benutzerinformationen
import "bootstrap/dist/css/bootstrap.min.css"; // Import von Bootstrap CSS für Styling

const WeeklyCalendar = () => {
  const { userId } = useContext(AuthContext); // Zugriff auf userId aus dem AuthContext
  const [weeklyCategories, setWeeklyCategories] = useState({}); // Zustand für die wöchentlichen Kategorien
  const navigate = useNavigate(); // Hook zum Navigieren zwischen Seiten

  const daysOfWeek = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag",
  ]; // Array mit Wochentagen für die Anzeige im Kalender

  // Effekt zum Abrufen der wöchentlichen Kategorien basierend auf userId
  useEffect(() => {
    const fetchWeeklyCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/user-calendar",
          {
            params: { userId }, // Sendet userId als Parameter in der GET-Anfrage
          }
        );
        const data = response.data.reduce((acc, entry) => {
          acc[entry.day] = entry.category; // Reduziert die empfangenen Daten zu einem Objekt mit Tagen als Schlüssel und Kategorien als Werte
          return acc;
        }, {});
        setWeeklyCategories(data); // Setzt den Zustand weeklyCategories mit den empfangenen Daten
      } catch (error) {
        console.error(
          "Fehler beim Abrufen der wöchentlichen Kategorien:",
          error
        ); // Konsolenausgabe bei Fehlern
      }
    };

    fetchWeeklyCategories(); // Ruft die Funktion zum Abrufen der wöchentlichen Kategorien auf
  }, [userId]); // Abhängigkeitsarray stellt sicher, dass der Effekt bei Änderungen von userId ausgeführt wird

  // Funktion zum Navigieren zurück zur Home-Seite
  const handleNavigateBack = () => {
    navigate("/home"); // Navigiert zur Home-Seite
  };

  return (
    <div className="bg-primary min-vh-100 py-4">
      <div className="container bg-white p-3 rounded">
        <h1 className="text-center mb-4">Wochenkalender</h1>
        <button className="btn btn-primary mb-3" onClick={handleNavigateBack}>
          Zurück zum Home
        </button>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="col">
              <div className="card">
                <div className="card-header">
                  <h3>{day}</h3>
                </div>
                <div className="card-body">
                  <ul className="list-group">
                    {weeklyCategories[day] ? (
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        {weeklyCategories[day]}{" "}
                      </li>
                    ) : (
                      <li className="list-group-item">Keine Übungen geplant</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendar;

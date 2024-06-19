import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const WeeklyCalendar = () => {
  const { userId } = useContext(AuthContext);
  const [weeklyCategories, setWeeklyCategories] = useState({}); // Objekt für wöchentliche Kategorien
  const navigate = useNavigate();

  const daysOfWeek = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag",
  ];

  useEffect(() => {
    const fetchWeeklyCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/user-calendar",
          {
            params: { userId },
          }
        );
        const data = response.data.reduce((acc, entry) => {
          acc[entry.day] = entry.category; // Mapping der Daten in ein Objekt mit Tagen als Schlüssel
          return acc;
        }, {});
        setWeeklyCategories(data); // Setzen der wöchentlichen Kategorien im State
      } catch (error) {
        console.error("Error fetching weekly categories:", error);
      }
    };

    fetchWeeklyCategories(); // Datenabfrage beim Laden der Komponente
  }, [userId]); // Abhängigkeit von userId für die Datenabfrage

  const handleNavigateBack = () => {
    navigate("/home"); // Navigieren zur Home-Seite
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
                        {weeklyCategories[day]}
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

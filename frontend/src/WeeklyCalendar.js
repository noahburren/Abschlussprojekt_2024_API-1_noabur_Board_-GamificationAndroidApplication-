import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const WeeklyCalendar = () => {
  const navigate = useNavigate();

  // Dummy data for the weekly calendar
  const daysOfWeek = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag",
  ];
  const exercises = {
    Montag: [],
    Dienstag: [],
    Mittwoch: [],
    Donnerstag: [],
    Freitag: [],
    Samstag: [],
    Sonntag: [],
  };

  const handleNavigateBack = () => {
    navigate("/home");
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
                    {exercises[day].length > 0 ? (
                      exercises[day].map((exercise, idx) => (
                        <li
                          key={idx}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          {exercise}
                        </li>
                      ))
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

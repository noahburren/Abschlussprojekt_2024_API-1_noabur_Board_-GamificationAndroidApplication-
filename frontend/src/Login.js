// Login.js

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import der benötigten Hooks aus react-router-dom
import Validation from "./LoginValidation"; // Import der Validierungsfunktion
import axios from "axios"; // Import von axios für HTTP-Anfragen
import "bootstrap/dist/css/bootstrap.min.css"; // Import von Bootstrap CSS für das Styling
import { AuthContext } from "./AuthContext"; // Import des AuthContext für die Authentifizierung

function Login() {
  // State-Hooks für das Formular und die Fehlerbehandlung
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Hook für die Navigation
  const [errors, setErrors] = useState({}); // State für Validierungsfehler
  const { login } = useContext(AuthContext); // Verwendung des AuthContext für die Authentifizierung

  // Funktion zum Aktualisieren des Formularwerts bei Benutzereingabe
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // Funktion zum Verarbeiten des Formularabsendens
  const handleSubmit = (event) => {
    event.preventDefault(); // Verhindert das Standardverhalten des Formularabsendens

    const validationErrors = Validation(values); // Validierung der Eingabedaten
    setErrors(validationErrors); // Setzen von Validierungsfehlern im State

    // Wenn keine Validierungsfehler vorliegen, sende HTTP-POST-Anfrage an den Server
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:8081/login", values) // POST-Anfrage an die Login-Route
        .then((res) => {
          if (res.data.message === "Success") {
            login({ userId: res.data.userId }); // Authentifizierung: Benutzer-ID im Context speichern
            navigate("/home"); // Navigation zur Startseite nach erfolgreicher Anmeldung
          } else {
            alert("Kein Account gefunden"); // Benachrichtigung bei nicht erfolgreichem Login
          }
        })
        .catch((err) => console.log(err)); // Fehlerbehandlung für HTTP-Anfrage
    }
  };

  // JSX für die Darstellung des Login-Formulars
  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign-In</h2>
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Formular mit onSubmit-Handler */}
          <div>
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Email eingeben"
              name="email"
              onChange={handleInput} // onChange-Handler für E-Mail-Eingabe
              className="form-control rounded-0"
            />
            {errors.email && (
              <span className="text-danger"> {errors.email}</span>
            )}{" "}
            {/* Anzeige von Validierungsfehlern für E-Mail */}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Passwort</strong>
            </label>
            <input
              type="password"
              placeholder="Passwort eingeben"
              name="password"
              onChange={handleInput} // onChange-Handler für Passworteingabe
              className="form-control rounded-0"
            />
            {errors.password && (
              <span className="text-danger"> {errors.password}</span>
            )}{" "}
            {/* Anzeige von Validierungsfehlern für Passwort */}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Log in
          </button>{" "}
          {/* Button zum Einloggen */}
          <p></p>
          <Link
            to="/signup"
            className="btn btn-default w-100 bg-light rounded-0 text-decoration-none"
          >
            Account erstellen
          </Link>{" "}
          {/* Link zum Erstellen eines neuen Accounts */}
        </form>
      </div>
    </div>
  );
}

export default Login; // Export der Login-Komponente

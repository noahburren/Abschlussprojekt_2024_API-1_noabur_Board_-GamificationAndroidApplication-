/*
  Autor: Noah Burren
  Datum: 26.06.2024
  Version: 1
  Beschreibung: 404 Not Found Seite
*/

import React from "react";
import { Link } from "react-router-dom";

// 404-Komponente
const NotFound = () => {
  return (
    <div className="bg-primary min-vh-100 py-4">
      <div className="container bg-white p-3 rounded text-center">
        <h1 className="mb-4">404 - Seite nicht gefunden</h1>
        <p className="mb-4">
          Die von Ihnen angeforderte Seite existiert nicht.
        </p>
        <Link to="/" className="btn btn-primary">
          Zurück zur Login-Seite
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

// AuthContext.js

import React, { createContext, useState, useEffect } from "react";

// Erstellt ein Context-Objekt für die Authentifizierung
export const AuthContext = createContext();

// AuthProvider-Komponente, die den AuthContext bereitstellt
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Zustand für den eingeloggten Benutzer

  // Effekt beim Laden der Komponente, um den Benutzer aus dem localStorage wiederherzustellen
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Lädt den Benutzer aus dem localStorage
    if (storedUser) {
      setUser(storedUser); // Setzt den Benutzer im Zustand, falls im localStorage gefunden
    }
  }, []);

  // Funktion zum Einloggen eines Benutzers
  const login = (userData) => {
    setUser(userData); // Setzt den Benutzer im Zustand
    localStorage.setItem("user", JSON.stringify(userData)); // Speichert den Benutzer im localStorage
  };

  // Funktion zum Ausloggen eines Benutzers
  const logout = () => {
    setUser(null); // Entfernt den Benutzer aus dem Zustand
    localStorage.removeItem("user"); // Entfernt den Benutzer aus dem localStorage
  };

  // Gibt den AuthContext.Provider mit Werten für userId, login- und logout-Funktion zurück
  return (
    <AuthContext.Provider value={{ userId: user?.userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

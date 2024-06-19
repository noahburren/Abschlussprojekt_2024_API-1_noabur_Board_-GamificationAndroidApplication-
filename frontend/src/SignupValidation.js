function Validation(values) {
  let errors = {}; // Initialisiert ein leeres Objekt für Fehlermeldungen

  // Definiert Regular Expressions für E-Mail und Passwort
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  // Validierung des Namens
  if (values.name === "") {
    errors.name = "Name darf nicht leer sein";
  } else {
    errors.name = ""; // Setzt den Fehler für den Namen zurück, falls kein Fehler vorliegt
  }

  // Validierung der E-Mail
  if (values.email === "") {
    errors.email = "Email darf nicht leer sein";
  } else if (!email_pattern.test(values.email)) {
    errors.email = "Ungültige Email";
  } else {
    errors.email = ""; // Setzt den Fehler für die E-Mail zurück, falls kein Fehler vorliegt
  }

  // Validierung des Passworts
  if (values.password === "") {
    errors.password = "Passwort darf nicht leer sein";
  } else if (values.password.length < 8) {
    errors.password = "Passwort muss mindestens 8 Zeichen lang sein";
  } else if (!/\d/.test(values.password)) {
    errors.password = "Passwort muss mindestens eine Zahl enthalten";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password =
      "Passwort muss mindestens einen Grossbuchstaben enthalten";
  } else if (!password_pattern.test(values.password)) {
    errors.password = "Ungültiges Passwort";
  } else {
    errors.password = ""; // Setzt den Fehler für das Passwort zurück, falls kein Fehler vorliegt
  }

  return errors; // Gibt das Objekt mit den Validierungsfehlern zurück
}

export default Validation; // Exportiert die Validierungsfunktion

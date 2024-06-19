function Validation(values) {
  let errors = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (!values.email) {
    errors.email = "Email darf nicht leer sein";
  } else if (!email_pattern.test(values.email)) {
    errors.email = "Ungültige Email";
  }

  if (!values.password) {
    errors.password = "Passwort darf nicht leer sein";
  } else if (values.password.length < 8) {
    errors.password = "Passwort muss mindestens 8 Zeichen lang sein";
  } else if (!/\d/.test(values.password)) {
    errors.password = "Passwort muss mindestens eine Zahl enthalten";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "Passwort muss mindestens einen Großbuchstaben enthalten";
  } else if (!password_pattern.test(values.password)) {
    errors.password = "Passwort entspricht nicht den Vorgaben";
  }

  return errors;
}

export default Validation;

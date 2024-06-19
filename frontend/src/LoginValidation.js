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
    errors.password = "Password darf nicht leer sein";
  } else if (!password_pattern.test(values.password)) {
    errors.password = "Passwort ungültig";
  }

  return errors;
}

export default Validation;

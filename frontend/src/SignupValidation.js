function Validation(values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values.name === "") {
    error.name = "Name darf nicht leer sein";
  } else {
    error.name = "";
  }

  if (values.email === "") {
    error.email = "Email darf nicht leer sein";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Ungültige Email";
  } else {
    error.email = "";
  }

  if (values.password === "") {
    error.password = "Password darf nicht leer sein";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Ungültiges Password";
  } else {
    error.password = "";
  }
  return error;
}

export default Validation;

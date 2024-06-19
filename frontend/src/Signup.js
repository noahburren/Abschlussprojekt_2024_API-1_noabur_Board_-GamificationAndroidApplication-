import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import axios from "axios";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "", // Neues Feld für die Passwortbestätigung
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validierung der Eingaben
    setErrors(Validation(values));

    // Überprüfen, ob Passwort und Bestätigung übereinstimmen
    if (values.password !== values.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    // Wenn alle Validierungen erfolgreich sind, Post-Anfrage senden
    if (
      !errors.name &&
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword
    ) {
      axios
        .post("http://localhost:8081/signup", {
          name: values.name,
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign-Up</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Name eingeben"
              name="name"
              value={values.name}
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.name && <span className="text-danger"> {errors.name}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Email eingeben"
              name="email"
              value={values.email}
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.email && (
              <span className="text-danger"> {errors.email}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Passwort</strong>
            </label>
            <input
              type="password"
              placeholder="Passwort eingeben"
              name="password"
              value={values.password}
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.password && (
              <span className="text-danger"> {errors.password}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword">
              <strong>Passwort bestätigen</strong>
            </label>
            <input
              type="password"
              placeholder="Passwort bestätigen"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.confirmPassword && (
              <span className="text-danger"> {errors.confirmPassword}</span>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Sign up
          </button>
          <p></p>
          <Link
            to="/"
            className="btn btn-default w-100 bg-light rounded-0 text-decoration-none"
          >
            Du hast bereits einen Account?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;

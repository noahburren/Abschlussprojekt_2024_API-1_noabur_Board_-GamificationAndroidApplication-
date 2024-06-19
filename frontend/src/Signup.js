import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import axios from "axios";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // Überprüfen, ob es keine Validierungsfehler gibt
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:8081/signup", values)
        .then((res) => {
          navigate("/"); // Nach erfolgreicher Registrierung zur Login-Seite navigieren
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign-Up</h2>
        <form onSubmit={handleSubmit}>
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

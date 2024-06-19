// Login.js
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "./AuthContext"; // Import des AuthContext

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext); // AuthContext verwenden

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:8081/login", values)
        .then((res) => {
          if (res.data.message === "Success") {
            login({ userId: res.data.userId }); // Benutzer-ID im AuthContext speichern
            navigate("/home");
          } else {
            alert("Kein Account gefunden");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign-In</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Email eingeben"
              name="email"
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
              placeholder="Password eingeben"
              name="password"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.password && (
              <span className="text-danger"> {errors.password}</span>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Log in
          </button>
          <p></p>
          <Link
            to="/signup"
            className="btn btn-default w-100 bg-light rounded-0 text-decoration-none"
          >
            Account erstellen
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;

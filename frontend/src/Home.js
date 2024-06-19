import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const navigate = useNavigate();
  const { userId, logout } = useContext(AuthContext);
  const [userExercises, setUserExercises] = useState(null); // Initialize as null
  const [selectedCategory, setSelectedCategory] = useState(null);

  const muscleGroups = ["Beine", "Brust", "Rücken", "Arme"];

  const handleCategoryClick = (category) => {
    navigate(`/exercises/${category}`);
  };

  useEffect(() => {
    if (selectedCategory !== null) {
      // Check against null explicitly
      axios
        .get(`http://localhost:8081/user-exercises`, { params: { userId } })
        .then((response) => {
          setUserExercises(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user exercises:", error);
        });
    }
  }, [userId, selectedCategory]);

  const handleShowExercises = (category) => {
    setSelectedCategory(category);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-primary min-vh-100 py-4">
      {" "}
      {/* Added py-4 for padding */}
      <div className="container bg-white p-3 rounded">
        <h1 className="text-center mb-4">Wähle eine Muskelgruppe</h1>
        <button className="btn btn-danger mb-3" onClick={handleLogout}>
          Logout
        </button>
        <ul className="list-group mb-4">
          {muscleGroups.map((group) => (
            <li
              key={group}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <button
                className="btn btn-primary"
                onClick={() => handleCategoryClick(group)}
              >
                {group}
              </button>
            </li>
          ))}
        </ul>

        <h2 className="text-center mb-3">Deine Übungen</h2>
        {muscleGroups.map((category) => (
          <div key={category} className="mb-4">
            <div className="card">
              <div className="card-header">
                <h3>{category}</h3>
              </div>
              <div className="card-body">
                <ul className="list-group">
                  {selectedCategory === category && userExercises !== null ? (
                    userExercises[category] &&
                    userExercises[category].length > 0 ? (
                      userExercises[category].map((exercise) => (
                        <li
                          key={exercise.ID}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          {exercise.NAME}
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item">
                        Keine Übung dieser Kategorie vorhanden
                      </li>
                    )
                  ) : (
                    <li className="list-group-item"></li>
                  )}
                </ul>
              </div>
            </div>
            <button
              className="btn btn-success mt-2"
              onClick={() => handleShowExercises(category)}
            >
              Zeige Übungen für {category}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

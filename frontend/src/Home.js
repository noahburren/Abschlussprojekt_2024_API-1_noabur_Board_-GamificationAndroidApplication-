import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext"; // Stelle sicher, dass AuthContext importiert ist

const Home = () => {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext); // Holen Sie sich userId aus dem AuthContext
  const [userExercises, setUserExercises] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null); // Initialisiere selectedCategory mit null

  const muscleGroups = ["Beine", "Brust", "Rücken", "Arme"];

  const handleCategoryClick = (category) => {
    navigate(`/exercises/${category}`);
  };

  useEffect(() => {
    if (selectedCategory) {
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
    setSelectedCategory(category); // Setzen Sie die ausgewählte Kategorie, um Übungen anzuzeigen
  };

  return (
    <div>
      <h1>Wähle eine Muskelgruppe</h1>
      <ul>
        {muscleGroups.map((group) => (
          <button key={group} onClick={() => handleCategoryClick(group)}>
            {group}
          </button>
        ))}
      </ul>

      <h2>Deine Übungen</h2>
      {muscleGroups.map((category) => (
        <div key={category}>
          <div>
            <h3>{category}</h3>
            <ul>
              {selectedCategory === category &&
              userExercises[category] &&
              userExercises[category].length > 0
                ? userExercises[category].map((exercise) => (
                    <li key={exercise.ID}>{exercise.NAME}</li>
                  ))
                : selectedCategory === category && (
                    <li>Keine Übung dieser Kategorie vorhanden</li>
                  )}
            </ul>
          </div>
          <button onClick={() => handleShowExercises(category)}>
            Zeige Übungen für {category}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;

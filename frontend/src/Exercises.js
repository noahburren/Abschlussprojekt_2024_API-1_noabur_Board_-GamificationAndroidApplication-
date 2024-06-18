// Exercises.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Neue Zeile: Import für useNavigate

const Exercises = () => {
  const { category } = useParams();
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const userId = 1; // Beispiel-Benutzer-ID. Mit der tatsächlichen Benutzer-ID aus deinem Authentifizierungssystem ersetzen.
  const navigate = useNavigate(); // Neue Zeile: useNavigate Hook für die Navigation

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/exercises/${category}`
        );
        setExercises(response.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, [category]);

  const handleSelectExercise = (exercise) => {
    setSelectedExercises((prev) =>
      prev.includes(exercise)
        ? prev.filter((e) => e !== exercise)
        : [...prev, exercise]
    );
  };

  const handleSaveExercises = async () => {
    try {
      await axios.post("http://localhost:8081/user-exercises", {
        userId,
        category,
        exercises: selectedExercises,
      });
      alert("Exercises saved successfully!");
    } catch (error) {
      console.error("Error saving exercises:", error);
      alert("Error saving exercises.");
    }
  };

  const handleDeleteExercises = async () => {
    try {
      await axios.delete(`http://localhost:8081/user-exercises/${category}`, {
        data: { userId },
      });
      alert("Exercises deleted successfully!");
      setSelectedExercises([]); // Clear selected exercises state
    } catch (error) {
      console.error("Error deleting exercises:", error);
      alert("Error deleting exercises.");
    }
  };

  const handleNavigateToHome = () => {
    navigate("/home"); // Navigiere zur "/home"-Route
  };

  return (
    <div>
      <h1>Übungen für {category}</h1>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.ID}>
            <label>
              <input
                type="checkbox"
                checked={selectedExercises.includes(exercise)}
                onChange={() => handleSelectExercise(exercise)}
              />
              {exercise.NAME}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSaveExercises}>Save Exercises</button>
      <button onClick={handleDeleteExercises}>Delete All Exercises</button>
      <button onClick={handleNavigateToHome}>Zurück zu Home</button>{" "}
      {/* Neuer Button zur Navigation zur Home-Seite */}
    </div>
  );
};

export default Exercises;

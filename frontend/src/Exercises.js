import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Exercises = () => {
  const { category } = useParams();
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

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
      setSelectedExercises([]);
    } catch (error) {
      console.error("Error deleting exercises:", error);
      alert("Error deleting exercises.");
    }
  };

  const handleNavigateToHome = () => {
    navigate("/home");
  };

  return (
    <div className="bg-primary min-vh-100 py-4">
      <div className="container bg-white p-3 rounded col-12 col-md-10 col-lg-8 overflow-auto">
        <h1 className="text-center mb-4">Übungen für {category}</h1>
        <ul className="list-group mb-4">
          {exercises.map((exercise) => (
            <li
              key={exercise.ID}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <label className="mb-0">
                <input
                  type="checkbox"
                  checked={selectedExercises.includes(exercise)}
                  onChange={() => handleSelectExercise(exercise)}
                />
                <span className="ml-2">{exercise.NAME}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-between">
          <button className="btn btn-success" onClick={handleSaveExercises}>
            Übungen speichern
          </button>
          <button className="btn btn-danger" onClick={handleDeleteExercises}>
            Alle Übungen löschen
          </button>
        </div>
        <button className="btn btn-primary mt-3" onClick={handleNavigateToHome}>
          Zurück zu Home
        </button>
      </div>
    </div>
  );
};

export default Exercises;

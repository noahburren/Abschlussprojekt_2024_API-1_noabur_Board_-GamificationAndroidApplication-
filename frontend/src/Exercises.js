import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Exercises = () => {
  const { category } = useParams();
  const [exercises, setExercises] = useState([]);

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

  return (
    <div>
      <h1>Übungen für {category}</h1>
      <ul>
        {exercises.map((exercise, index) => (
          <li key={index}>{exercise.NAME}</li>
        ))}
      </ul>
    </div>
  );
};

export default Exercises;

import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const muscleGroups = ["Beine", "Brust", "Rücken", "Arme"];

  const handleCategoryClick = (category) => {
    navigate(`/exercises/${category}`);
  };

  return (
    <div>
      <h1>Wähle eine Muskelgruppe</h1>
      <ul>
        {muscleGroups.map((group) => (
          <li
            key={group}
            onClick={() => handleCategoryClick(group)}
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
            }}
          >
            {group}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Exercises from "./Exercises";
import WeeklyCalendar from "./WeeklyCalendar"; // Import für den Wochenkalender
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/exercises/:category" element={<Exercises />} />
            <Route path="/weekly-calendar" element={<WeeklyCalendar />} />{" "}
            {/* Route für den Wochenkalender */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

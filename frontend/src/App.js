import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Link importieren
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Exercises from "./Exercises";
import WeeklyCalendar from "./WeeklyCalendar";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { AuthProvider } from "./AuthContext";
import NotFound from "./NotFound";

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
            <Route path="/weekly-calendar" element={<WeeklyCalendar />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

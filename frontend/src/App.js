import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Exercises from "./Exercises";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { AuthProvider } from "./AuthContext"; // Import des AuthProvider

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* AuthProvider um BrowserRouter gewickelt */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/exercises/:category" element={<Exercises />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

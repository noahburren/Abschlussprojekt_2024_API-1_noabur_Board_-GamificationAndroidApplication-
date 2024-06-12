import React from "react";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Home from "./Home";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

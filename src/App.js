import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Profil from "./Profil";
import RezultateMedicale from "./RezultateMedicale";
import Prescriptii from "./Prescriptii";
import Programari from "./Programari";
import HomePage from "./HomePage";

import IstoricMedicalPacienti from "./IstoricMedicalPacienti";
import Pacienti from "./Pacienti";
import Login from "./Login";
import Register from "./Register";

export default function App() {
  const role = "doctor"; // sau "pacient"

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Profil" element={<Profil />} />
        <Route path="/RezultateMedicale" element={<RezultateMedicale />} />
        <Route path="/Prescriptii" element={<Prescriptii />} />
        <Route path="/Programari" element={<Programari />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        {role === "doctor" && (
          <Route
            path="/IstoricMedicalPacienti"
            element={<IstoricMedicalPacienti />}
          />
        )}
        {role === "doctor" && <Route path="/Pacienti" element={<Pacienti />} />}
      </Routes>
    </Router>
  );
}

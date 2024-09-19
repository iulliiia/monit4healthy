import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HeaderSidebar.css";

export default function HeaderSidebar({ role, nume, prenume }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function toggleSidebar() {
    setSidebarOpen((prevState) => !prevState);
  }

  return (
    <div>
      <header className="header">
        <div className="header-login">
          <div className="menu-role">
            <button className="menu-btn" onClick={toggleSidebar}>
              &#9776;
            </button>
            {role === "pacient" && (
              <p>
                Pacient {nume} {prenume}
              </p>
            )}
            {role === "doctor" && (
              <p>
                Dr. {nume} {prenume}
              </p>
            )}
          </div>
          <div className="login-buttons">
            <Link to="/Login">Login</Link>
            <Link to="/Register">Register</Link>
          </div>
        </div>
      </header>

      <div className="header-sidebar-container">
        <aside
          className={`sidebar ${sidebarOpen ? "visible" : ""}`}
          id="sidebar"
        >
          <h2 className="sidebar-title">HealthPortal</h2>
          <ul className="sidebar-menu">
            <li>
              <Link to="/HomePage">Home</Link>
            </li>
            <li>
              <Link to="/Profil">Profile</Link>
            </li>

            <li>
              <Link to="/RezultateMedicale">Medical Results</Link>
            </li>
            {/* {role === "pacient" && (
              <li>
                <Link to="/istoric-medical">Medical History</Link>
              </li>
            )}
            {role === "doctor" && (
              <li>
                <Link to="/istoric-medical-pacienti">
                  Patient's medical history
                </Link>
              </li>
            )} */}
            <li>
              <Link to="/Prescriptii">Prescriptions</Link>
            </li>
            <li>
              <Link to="/Programari">Calendar</Link>
            </li>
            {role === "doctor" && (
              <li>
                <Link to="/Pacienti">Patients</Link>
              </li>
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import "./register.css";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [cnp, setCnp] = useState("");
  const [role, setRole] = useState("pacient");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // Calculate age based on CNP
  const calculateAge = (cnp) => {
    if (cnp.length === 13) {
      const yearPrefix =
        cnp[0] === "1" || cnp[0] === "2"
          ? "19"
          : cnp[0] === "3" || cnp[0] === "4"
          ? "18"
          : cnp[0] === "5" || cnp[0] === "6"
          ? "20"
          : "19";

      const year = parseInt(yearPrefix + cnp.substring(1, 3));
      const month = parseInt(cnp.substring(3, 5));
      const day = parseInt(cnp.substring(5, 7));

      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }

      return calculatedAge;
    }
    return "";
  };

  // Update age whenever CNP changes
  useEffect(() => {
    setAge(calculateAge(cnp));
  }, [cnp]);

  const validateForm = () => {
    if (!age || isNaN(age)) {
      alert("CNP invalid sau vârsta nu a fost calculată corect.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Perform form submission logic here
      console.log({
        email,
        username,
        password,
        confirmPassword,
        age,
        cnp,
        role,
        address,
        phone,
      });
    }
  };

  return (
    <div className="body-register-class">
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <h1>CREATE ACCOUNT</h1>
          <div className="input-box-register">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-box-register">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box-register">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="input-box-register">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="input-box-register">
            <input
              id="cnp"
              type="number"
              placeholder="Enter Cod Numeric Personal (CNP)"
              value={cnp}
              onChange={(e) => setCnp(e.target.value)}
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box-register">
            <input
              id="varsta"
              type="number"
              placeholder="Age"
              disabled
              value={age}
            />
            <i className="bx bxs-user"></i>
          </div>

          <div className="input-box-register">
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="pacient">Pacient</option>
              <option value="doctor">Doctor</option>
            </select>
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box-register">
            <input
              id="adresa"
              type="text"
              placeholder="Adress: street, number"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box-register">
            <input
              id="telefon"
              type="number"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <button type="submit" className="btn">
            Register
          </button>
          <div className="register-link">
            <p>
              Already have an account? <NavLink to="/Login">Login</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

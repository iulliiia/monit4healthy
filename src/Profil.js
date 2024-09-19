import React, { useState } from "react";
import HeaderSidebar from "./HeaderSidebar";
import "./profil.css";

export default function Profil() {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // State for expand/collapse
  const [profile, setProfile] = useState({
    lastName: "Caprariu",
    firstName: "Iulia",
    age: 60,
    address: "Tineretului 2A, Bucharest",
    phone: "+40-712-345-678",
    cnp: "1234567890123",
    cnp_info: {
      gender: "M",
      birthDay: 15,
      birthMonth: 6,
      birthYear: 1993,
      county: "Bucharest",
      uniqueNumber: "123",
      controlDigit: "1",
    },
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });

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

  // Function to extract CNP info
  const extractCNPInfo = (cnp) => {
    if (cnp.length === 13) {
      const sexDigit = cnp[0];
      const yearPrefix =
        sexDigit === "1" || sexDigit === "2"
          ? "19"
          : sexDigit === "3" || sexDigit === "4"
          ? "18"
          : sexDigit === "5" || sexDigit === "6"
          ? "20"
          : "19";
      const year = yearPrefix + cnp.substring(1, 3);
      const month = parseInt(cnp.substring(3, 5), 10);
      const day = parseInt(cnp.substring(5, 7), 10);

      // Validate month and day
      if (month < 1 || month > 12 || day < 1 || day > 31)
        return profile.cnp_info;

      // Determine gender
      const gender = ["1", "3", "5", "7"].includes(sexDigit) ? "M" : "F";

      // Determine county
      const regions = {
        "01": "Alba",
        "02": "Arad",
        "03": "Arges",
        "04": "Bacau",
        "05": "Bihor",
        "06": "Bistrita-Nasaud",
        "07": "Botosani",
        "08": "Brasov",
        "09": "Braila",
        10: "Buzau",
        11: "Caras-Severin",
        12: "Cluj",
        13: "Constanta",
        14: "Covasna",
        15: "Dambovita",
        16: "Dolj",
        17: "Galati",
        18: "Gorj",
        19: "Harghita",
        20: "Hunedoara",
        21: "Ialomita",
        22: "Iasi",
        23: "Ilfov",
        24: "Maramures",
        25: "Mehedinti",
        26: "Mures",
        27: "Neamt",
        28: "Olt",
        29: "Prahova",
        30: "Satu Mare",
        31: "Salaj",
        32: "Sibiu",
        33: "Suceava",
        34: "Teleorman",
        35: "Timis",
        36: "Tulcea",
        37: "Vaslui",
        38: "Valcea",
        39: "Vrancea",
        40: "Bucharest",
        41: "Bucharest - Sector 1",
        42: "Bucharest - Sector 2",
        43: "Bucharest - Sector 3",
        44: "Bucharest - Sector 4",
        45: "Bucharest - Sector 5",
        46: "Bucharest - Sector 6",
        51: "Calarasi",
        52: "Giurgiu",
      };
      const regionCode = cnp.substring(7, 9); // Fix to get correct index range
      const county = regions[regionCode] || "Unknown";

      const uniqueNumber = cnp.substring(9, 12);
      const controlDigit = cnp[12];

      return {
        gender,
        birthDay: day,
        birthMonth: month,
        birthYear: parseInt(year, 10),
        county,
        uniqueNumber,
        controlDigit,
      };
    }
    return profile.cnp_info;
  };

  const handleEditClick = () => {
    setIsExpanded(true);
    setTempProfile({ ...profile });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({
      ...prev,
      [name]: value,
      age: name === "cnp" ? calculateAge(value) : prev.age,
      cnp_info: name === "cnp" ? extractCNPInfo(value) : prev.cnp_info,
    }));
  };

  const handleSave = () => {
    setProfile({ ...tempProfile });
    setIsEditing(false);
    setIsExpanded(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsExpanded(false);
  };

  return (
    <div>
      <HeaderSidebar role="doctor" nume={"Caprariu"} prenume={"Iulia"} />
      <div className="profile-page">
        <h1>Your Info</h1>
        <div className={`profile-info ${isExpanded ? "open" : ""}`}>
          <p>
            <strong>Last Name:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={tempProfile.lastName}
                onChange={handleChange}
              />
            ) : (
              profile.lastName
            )}
          </p>
          <p>
            <strong>First Name:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={tempProfile.firstName}
                onChange={handleChange}
              />
            ) : (
              profile.firstName
            )}
          </p>
          <p>
            <strong>Age:</strong>{" "}
            {isEditing ? (
              <input
                type="number"
                name="age"
                value={tempProfile.age}
                onChange={handleChange}
                disabled
              />
            ) : (
              profile.age
            )}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={tempProfile.address}
                onChange={handleChange}
              />
            ) : (
              profile.address
            )}
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={tempProfile.phone}
                onChange={handleChange}
              />
            ) : (
              profile.phone
            )}
          </p>
          <p>
            <strong>CNP:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="cnp"
                value={tempProfile.cnp}
                onChange={handleChange}
              />
            ) : (
              profile.cnp
            )}
          </p>
        </div>
        <div className="profile-card-actions">
          <button onClick={isEditing ? handleCancel : handleEditClick}>
            {isEditing ? "Cancel" : "Edit"}
          </button>
          {isEditing && <button onClick={handleSave}>Save</button>}
        </div>
        <div className="cnp-info">
          <h2>CNP Information</h2>
          <p>
            <strong>Gender:</strong> {profile.cnp_info.gender}
          </p>
          <p>
            <strong>Birth Date:</strong> {profile.cnp_info.birthDay}/
            {profile.cnp_info.birthMonth}/{profile.cnp_info.birthYear}
          </p>
          <p>
            <strong>County:</strong> {profile.cnp_info.county}
          </p>
          <p>
            <strong>Unique Number:</strong> {profile.cnp_info.uniqueNumber}
          </p>
          <p>
            <strong>Control Digit:</strong> {profile.cnp_info.controlDigit}
          </p>
        </div>
      </div>
    </div>
  );
}

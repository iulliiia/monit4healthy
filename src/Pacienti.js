import "./pacienti.css";
import HeaderSidebar from "./HeaderSidebar";
import React, { useState, useEffect } from "react";

const getStatus = (lastActive) => {
  return (new Date() - new Date(lastActive)) / 1000 < 10 ? "online" : "offline";
};

const PatientList = ({
  patients,
  selectedPatients,
  onPatientSelect,
  onSubmit,
}) => {
  return (
    <div className="pacienti-profile-card">
      <h2>Patient List</h2>
      <form onSubmit={onSubmit}>
        <ul>
          {patients.map((patient) => (
            <li key={patient.id}>
              <label>
                <input
                  type="checkbox"
                  name="patients"
                  value={patient.id}
                  checked={selectedPatients.includes(patient.id)}
                  onChange={() => onPatientSelect(patient.id)}
                />
                {patient.nume} {patient.prenume} - {patient.email}
              </label>
            </li>
          ))}
        </ul>
        <button type="submit" className="pacienti-btn">
          Update
        </button>
      </form>
    </div>
  );
};

const MonitoredPatients = ({ monitoredPatients }) => {
  const [statuses, setStatuses] = useState(
    monitoredPatients.reduce((acc, patient) => {
      acc[patient.id] = getStatus(patient.last_active);
      return acc;
    }, {})
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStatuses((prevStatuses) => {
        const updatedStatuses = { ...prevStatuses };
        monitoredPatients.forEach((patient) => {
          updatedStatuses[patient.id] = getStatus(patient.last_active);
        });
        return updatedStatuses;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, [monitoredPatients]);

  return (
    <div className="pacienti-profile-card">
      <h3>Monitored Patients</h3>
      <ul id="monitored_patients_list">
        {monitoredPatients.map((patient) => (
          <li key={patient.id} id={`patient_${patient.id}`}>
            {patient.nume} {patient.prenume} - {patient.email}{" "}
            <span className={`pacienti-status ${statuses[patient.id]}`}></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Pacienti() {
  const [patients, setPatients] = useState([
    {
      id: 1,
      nume: "Popescu",
      prenume: "Ion",
      email: "ion.popescu@example.com",
      last_active: new Date(),
    },
    {
      id: 2,
      nume: "Caprariu",
      prenume: "Iulia",
      email: "iulia.caprariu@example.com",
      last_active: new Date(),
    },
    {
      id: 3,
      nume: "Dumitrache",
      prenume: "Flavian",
      email: "flavian.dumitrache@example.com",
      last_active: new Date(),
    },
    {
      id: 4,
      nume: "Ionescu",
      prenume: "Maria",
      email: "maria.ionescu@example.com",
      last_active: new Date(),
    },
  ]);
  const [monitoredPatients, setMonitoredPatients] = useState([
    {
      id: 1,
      nume: "Popescu",
      prenume: "Ion",
      email: "ion.popescu@example.com",
      last_active: new Date(),
    },
  ]);

  const [selectedPatients, setSelectedPatients] = useState(
    patients
      .filter((patient) => patient.id_doctor === 1)
      .map((patient) => patient.id)
  );

  const handlePatientSelect = (patientId) => {
    setSelectedPatients((prevSelected) =>
      prevSelected.includes(patientId)
        ? prevSelected.filter((id) => id !== patientId)
        : [...prevSelected, patientId]
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedMonitoredPatients = patients
      .filter((patient) => selectedPatients.includes(patient.id))
      .map((patient) => ({
        ...patient,
        last_active: new Date(),
      }));

    setMonitoredPatients(updatedMonitoredPatients);

    console.log("Selected patients:", selectedPatients);
    console.log("Updated monitored patients:", updatedMonitoredPatients);
  };

  return (
    <div>
      <HeaderSidebar role={"doctor"} nume={"Caprariu"} prenume={"Iulia"} />
      <div className="pacienti-main-content">
        <PatientList
          patients={patients}
          selectedPatients={selectedPatients}
          onPatientSelect={handlePatientSelect}
          onSubmit={handleFormSubmit}
        />
        <MonitoredPatients monitoredPatients={monitoredPatients} />
      </div>
    </div>
  );
}

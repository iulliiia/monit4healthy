import React, { useState } from "react";
import HeaderSidebar from "./HeaderSidebar";
import ChatBox from "./Chatbox";
import "./HomePage.css";

export default function HomePage() {
  const [activeCards, setActiveCards] = useState([false, false, false]);

  const toggleCard = (index) => {
    setActiveCards((prevState) => {
      const newActiveCards = [...prevState];
      newActiveCards[index] = !newActiveCards[index];
      return newActiveCards;
    });
  };

  const patients = [
    "Iulia CAPRARIU",
    "Flavaian DUMITRACHE",
    "Andrei POPESCU",
    "Ionel IONUT",
    "Maria IONESCU",
  ];

  return (
    <div className="homepage">
      <HeaderSidebar role={"doctor"} nume={"Caprariu"} prenume={"Iulia"} />
      <div className="welcome-container">
        <div className="welcome-text">Welcome to Monit4Healthy!</div>
      </div>
      <div className="info-cards">
        <div
          className={`card ${activeCards[0] ? "active" : ""}`}
          onClick={() => toggleCard(0)}
        >
          <div className="card-title">Medical BlackBox</div>
          {activeCards[0] && (
            <div className="card-description">
              The Medical BlackBox is an advanced device designed to monitor and
              record vital signs continuously. It integrates various sensors,
              including ECG (Electrocardiogram) sensors, blood pressure sensors,
              and pulse oximeters, to provide a comprehensive overview of a
              patient's health status. The data collected is analyzed in
              real-time to detect abnormalities and potential health risks.
            </div>
          )}
        </div>
        <div
          className={`card ${activeCards[1] ? "active" : ""}`}
          onClick={() => toggleCard(1)}
        >
          <div className="card-title">Uric Acid Blackbox</div>
          {activeCards[1] && (
            <div className="card-description">
              The Uric Acid BlackBox is designed for real-time monitoring of
              uric acid levels in the body. This device continuously tracks uric
              acid concentrations and provides instant feedback on changes in
              levels. By delivering real-time insights, it helps users manage
              and understand their uric acid levels effectively, aiding in the
              prevention and management of conditions like gout and kidney
              stones.
            </div>
          )}
        </div>
        <div
          className={`card ${activeCards[2] ? "active" : ""}`}
          onClick={() => toggleCard(2)}
        >
          <div className="card-title">Gait Band System</div>
          {activeCards[2] && (
            <div className="card-description">
              The Gait Band System is a wearable device that tracks and analyzes
              gait patterns to assess mobility and detect issues like imbalance
              or irregular movements. It includes accelerometers, gyroscopes,
              and pressure sensors that work together to provide detailed
              insights into walking patterns, aiding in early detection of
              neurological or musculoskeletal disorders.
            </div>
          )}
        </div>
      </div>
      <ChatBox patients={patients} />
    </div>
  );
}

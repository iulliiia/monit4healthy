import React, { useState } from "react";
import HeaderSidebar from "./HeaderSidebar";
import "./programari.css";

const hours = [
  "08:00-09:30",
  "09:30-11:00",
  "11:00-12:30",
  "12:30-14:00",
  "14:00-15:30",
  "15:30-17:00",
  "17:00-18:30",
];

const patients = [
  "Iulia CAPRARIU",
  "Flavaian DUMITRACHE",
  "Andrei POPESCU",
  "Ionel IONUT",
  "Maria IONESCU",
];

function Programari() {
  const [appointments, setAppointments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekOffset, setWeekOffset] = useState(0);

  const addAppointment = () => {
    if (selectedCell && selectedPatient && appointmentType) {
      const { dayIndex, hour } = selectedCell;
      const newAppointment = {
        id: `${dayIndex}-${hour}-${weekOffset}`,
        day: getWeekStartDate(currentDate, dayIndex),
        hour,
        patient: selectedPatient,
        type: appointmentType,
        weekOffset,
      };
      setAppointments([...appointments, newAppointment]);
      closeModal();
    }
  };

  const openModal = (dayIndex, hour) => {
    setSelectedCell({ dayIndex, hour });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCell(null);
    setSelectedPatient("");
    setAppointmentType("");
  };

  const openEditModal = (appointment) => {
    setAppointmentToEdit(appointment);
    setSelectedPatient(appointment.patient);
    setAppointmentType(appointment.type);
    setEditModalVisible(true);
    setIsEditing(false);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    setAppointmentToEdit(null);
    setIsEditing(false);
  };

  const saveAppointmentChanges = () => {
    if (appointmentToEdit) {
      const updatedAppointments = appointments.map((app) =>
        app.id === appointmentToEdit.id
          ? { ...app, patient: selectedPatient, type: appointmentType }
          : app
      );
      setAppointments(updatedAppointments);
      closeEditModal();
    }
  };

  const deleteAppointment = () => {
    if (appointmentToEdit) {
      const updatedAppointments = appointments.filter(
        (app) => app.id !== appointmentToEdit.id
      );
      setAppointments(updatedAppointments);
      closeEditModal();
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const getWeekStartDate = (date, dayIndex = 0) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff + dayIndex);
    return start;
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction * 7);
    setCurrentDate(newDate);
    setWeekOffset(weekOffset + direction);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "numeric",
    });
  };

  const isCurrentWeek = () => {
    return weekOffset === 0;
  };

  const resetToCurrentWeek = () => {
    setCurrentDate(new Date());
    setWeekOffset(0);
  };

  return (
    <div className="timetable-page">
      <HeaderSidebar role={"doctor"} nume={"Caprariu"} prenume={"Iulia"} />

      <div className="timetable-container">
        <div className="timetable-wrapper">
          <div className="timetable-header-row">
            <div className="timetable-header-day"></div>
            {hours.map((h) => (
              <div key={h} className="timetable-hour-header">
                {h}
              </div>
            ))}
          </div>
          {Array.from({ length: 7 }).map((_, dayIndex) => (
            <div key={dayIndex} className="timetable-row">
              <div className="timetable-day-cell">
                {formatDate(getWeekStartDate(currentDate, dayIndex))}
              </div>
              {hours.map((h) => {
                const appointment = appointments.find(
                  (app) =>
                    app.hour === h &&
                    app.day.getTime() ===
                      getWeekStartDate(currentDate, dayIndex).getTime() &&
                    app.weekOffset === weekOffset
                );
                return appointment ? (
                  <TimetableCell
                    key={appointment.id}
                    appointment={appointment}
                    onClick={() => openEditModal(appointment)}
                  />
                ) : (
                  <TimeTableEmptyCell
                    key={`${dayIndex}-${h}`}
                    onClick={() => openModal(dayIndex, h)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="navigation-buttons">
        <button onClick={() => navigateWeek(-1)}>Previous Week</button>
        {!isCurrentWeek() ? (
          <button className="return-button" onClick={resetToCurrentWeek}>
            Current Week
          </button>
        ) : null}
        <button onClick={() => navigateWeek(1)}>Next Week</button>
      </div>

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="modal-close" onClick={closeModal}>
              &times;
            </span>
            <h3>Add Appointment</h3>
            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
            >
              <option value="">Select patient</option>
              {patients.map((patient, index) => (
                <option key={index} value={patient}>
                  {patient}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value)}
              placeholder="Enter appointment type"
            />
            <button onClick={addAppointment}>Add Appointment</button>
          </div>
        </div>
      )}

      {editModalVisible && appointmentToEdit && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="modal-close" onClick={closeEditModal}>
              &times;
            </span>
            <h3>Appointment Details</h3>
            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              disabled={!isEditing}
            >
              <option value="">Select patient</option>
              {patients.map((patient, index) => (
                <option key={index} value={patient}>
                  {patient}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value)}
              placeholder="Enter appointment type"
              disabled={!isEditing}
            />
            <div className="modal-buttons">
              <button
                onClick={isEditing ? saveAppointmentChanges : toggleEditMode}
              >
                {isEditing ? "Save Changes" : "Edit"}
              </button>
              <button className="delete-button" onClick={deleteAppointment}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TimetableCell({ appointment, onClick }) {
  return (
    <div className="timetable-cell" onClick={onClick}>
      <p>{appointment.patient}</p>
    </div>
  );
}

function TimeTableEmptyCell({ onClick }) {
  return <div className="timetable-empty-cell" onClick={onClick}></div>;
}

export default Programari;

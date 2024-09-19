import "./prescriptii.css";
import HeaderSidebar from "./HeaderSidebar";
import { useState } from "react";
import jsPDF from "jspdf"; //For exporting the prescription as pdf

export default function Prescriptii() {
  const [formData, setFormData] = useState({
    serial_number: "",
    issue_date: "",
    first_name: "",
    last_name: "",
    cid: "",
    diagnose_code: "",
  });

  const [medications, setMedications] = useState([]);
  const [medicationData, setMedicationData] = useState({
    medication_name: "",
    quantity: "",
    unit_price: "",
    total_price: "",
  });

  const [isMedicationFormVisible, setMedicationFormVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMedicationChange = (e) => {
    const { name, value } = e.target;
    const newMedicationData = { ...medicationData, [name]: value };

    if (name === "quantity" || name === "unit_price") {
      const quantity = parseFloat(newMedicationData.quantity) || 0;
      const unit_price = parseFloat(newMedicationData.unit_price) || 0;
      newMedicationData.total_price = (quantity * unit_price).toFixed(2);
    }

    setMedicationData(newMedicationData);
  };

  const toggleMedicationForm = () => {
    setMedicationFormVisible(!isMedicationFormVisible);
  };

  const handleAddMedication = () => {
    if (
      medicationData.medication_name &&
      medicationData.quantity &&
      medicationData.unit_price
    ) {
      setMedications([...medications, { ...medicationData }]);
      setMedicationData({
        medication_name: "",
        quantity: "",
        unit_price: "",
        total_price: "",
      });
    } else {
      alert("All fields must be filled out before adding the medication.");
    }
  };

  const handleDeleteMedication = (index) => {
    const updatedMedications = medications.filter((_, i) => i !== index);
    setMedications(updatedMedications);
  };

  const calculateTotalPrice = () => {
    return medications
      .reduce((total, med) => total + parseFloat(med.total_price || 0), 0)
      .toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const doc = new jsPDF();

    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("Medical Prescription", 14, 20);

    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    let yPosition = 30;

    doc.text(`Serial Number: ${formData.serial_number}`, 14, yPosition);
    yPosition += 10;
    doc.text(`Issue Date: ${formData.issue_date}`, 14, yPosition);
    yPosition += 10;
    doc.text(`First Name: ${formData.first_name}`, 14, yPosition);
    yPosition += 10;
    doc.text(`Last Name: ${formData.last_name}`, 14, yPosition);
    yPosition += 10;
    doc.text(`CID: ${formData.cid}`, 14, yPosition);
    yPosition += 10;
    doc.text(`Diagnose Code: ${formData.diagnose_code}`, 14, yPosition);

    yPosition += 20;
    doc.setDrawColor(0, 0, 0);
    doc.line(14, yPosition, 195, yPosition);
    yPosition += 10;

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Prescribed Medications", 14, yPosition);

    yPosition += 10;
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");

    medications.forEach((med) => {
      doc.text(
        `${med.medication_name}, ${med.quantity} Units - Total Price: ${med.total_price}`,
        14,
        yPosition
      );
      yPosition += 10;
    });

    yPosition += 10;
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(
      `Total Medication Price: ${calculateTotalPrice()} RON`,
      14,
      yPosition
    );

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  };

  return (
    <div>
      <HeaderSidebar role={"doctor"} nume={"Caprariu"} prenume={"Iulia"} />
      <div className="container-prescriptie">
        <div className="forms-container">
          <form className="form-prescriptie" onSubmit={handleSubmit}>
            <h2>Medical Prescription</h2>
            <div className="input-box-prescriptie">
              <label htmlFor="serial_number">Serial Number:</label>
              <input
                type="text"
                id="serial_number"
                name="serial_number"
                value={formData.serial_number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box-prescriptie">
              <label htmlFor="issue_date">Issue Date:</label>
              <input
                type="date"
                id="issue_date"
                name="issue_date"
                value={formData.issue_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box-prescriptie">
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box-prescriptie">
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box-prescriptie">
              <label htmlFor="cid">CID:</label>
              <input
                type="text"
                id="cid"
                name="cid"
                value={formData.cid}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box-prescriptie">
              <label htmlFor="diagnose_code">Diagnose Code:</label>
              <input
                type="text"
                id="diagnose_code"
                name="diagnose_code"
                value={formData.diagnose_code}
                onChange={handleChange}
                required
              />
            </div>

            <div className="medication-section">
              {isMedicationFormVisible && (
                <form className="medication-form">
                  <h3>Prescribed Medications</h3>
                  <div className="input-box-prescriptie">
                    <label htmlFor="medication_name">Commercial Name:</label>
                    <input
                      type="text"
                      id="medication_name"
                      name="medication_name"
                      value={medicationData.medication_name}
                      onChange={handleMedicationChange}
                      required
                    />
                  </div>
                  <div className="input-box-prescriptie">
                    <label htmlFor="quantity">Quantity Dispensed:</label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={medicationData.quantity}
                      onChange={handleMedicationChange}
                      required
                    />
                  </div>
                  <div className="input-box-prescriptie">
                    <label htmlFor="unit_price">Unit Price:</label>
                    <input
                      type="number"
                      step="0.01"
                      id="unit_price"
                      name="unit_price"
                      value={medicationData.unit_price}
                      onChange={handleMedicationChange}
                      required
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleAddMedication}
                    className="btn add-medication-btn"
                  >
                    Add Medication
                  </button>
                </form>
              )}
              <button
                type="button"
                onClick={toggleMedicationForm}
                className="btn toggle-medication-btn"
              >
                {isMedicationFormVisible
                  ? "Close Medication Form"
                  : "Add Medication"}
              </button>
              <div className="medication-list">
                <h3>List of Prescribed Medications</h3>
                <ul>
                  {medications.map((med, index) => (
                    <li key={index}>
                      {med.medication_name}, {med.quantity} Units - Total Price:{" "}
                      {med.total_price}
                      <button
                        type="button"
                        onClick={() => handleDeleteMedication(index)}
                        className="btn delete-medication-btn"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="total-price">
                  <strong>
                    Total Medication Price: {calculateTotalPrice()} RON
                  </strong>
                </div>
              </div>
              <button type="submit" className="btn">
                Submit Prescription
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

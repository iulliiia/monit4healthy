import { useState } from "react";
import "./rezultateMedicale.css"; // Ensure this line is importing your CSS correctly
import HeaderSidebar from "./HeaderSidebar";
import { LineChart } from "@mui/x-charts";

const faqsMedicalBlackbox = [
  { id: "1", title: "Heart Rate (HR)" },
  { id: "2", title: "Blood Oxygen Saturation" },
  { id: "3", title: "Temperature" },
  { id: "4", title: "Galvanic Skin Response (GSR)" },
];

const faqsUricAcid = [{ id: "1", title: "Uric Acid Levels" }];

const faqsGaitBandSystem = [
  { id: "1", title: "Gait Analysis - Step Count" },
  { id: "2", title: "Gait Analysis - Stride Length" },
  { id: "3", title: "Gait Analysis - Cadence" },
];

// Function to generate random data
const generateData = (min, max, decimals = 0) => {
  return (Math.random() * (max - min) + min).toFixed(decimals);
};

// Initial Data
const initialHeartRateData = Array.from({ length: 10 }).map((_, index) => ({
  timestamp: new Date(Date.now() - index * 60000).toLocaleString(),
  heartRate: generateData(60, 100),
  minRef: 60,
  maxRef: 100,
  observations: "Normal",
}));

const initialOxygenSaturationData = Array.from({ length: 10 }).map(
  (_, index) => ({
    timestamp: new Date(Date.now() - index * 60000).toLocaleString(),
    oxygenSaturation: generateData(95, 100),
    minRef: 95,
    maxRef: 100,
    observations: "Normal",
  })
);

const initialTemperatureData = Array.from({ length: 10 }).map((_, index) => ({
  timestamp: new Date(Date.now() - index * 60000).toLocaleString(),
  temperature: generateData(36.5, 37.5, 1),
  minRef: 36.5,
  maxRef: 37.5,
  observations: "Normal",
}));

const initialGSRData = Array.from({ length: 10 }).map((_, index) => ({
  timestamp: new Date(Date.now() - index * 60000).toLocaleString(),
  gsr: generateData(0.5, 3.5, 2),
  minRef: 0.5,
  maxRef: 3.5,
  observations: "Normal",
}));

const initialUricAcidData = Array.from({ length: 10 }).map((_, index) => ({
  timestamp: new Date(Date.now() - index * 60000).toLocaleString(),
  uricAcid: generateData(3.5, 7.5, 1),
  minRef: 3.5,
  maxRef: 7.5,
  observations: "Normal",
}));

const initialGaitData = {
  stepCount: Array.from({ length: 10 }).map((_, index) => ({
    timestamp: new Date(Date.now() - index * 60000).toLocaleString(),
    stepCount: generateData(1000, 5000),
    minRef: 1000,
    maxRef: 5000,
    observations: "Normal",
  })),
  strideLength: Array.from({ length: 10 }).map((_, index) => ({
    timestamp: new Date(Date.now() - index * 60000).toLocaleString(),
    strideLength: generateData(0.5, 1.5, 2),
    minRef: 0.5,
    maxRef: 1.5,
    observations: "Normal",
  })),
  cadence: Array.from({ length: 10 }).map((_, index) => ({
    timestamp: new Date(Date.now() - index * 60000).toLocaleString(),
    cadence: generateData(60, 120),
    minRef: 60,
    maxRef: 120,
    observations: "Normal",
  })),
};

export default function RezultateMedicale() {
  return (
    <div>
      <HeaderSidebar role={"doctor"} nume={"Caprariu"} prenume={"Iulia"} />
      <div className="rezultate-medicale">
        <div className="title-app-content">Medical Blackbox </div>
        <div className="app-content-medical-gait">
          <Accordion data={faqsMedicalBlackbox.slice(0, 2)}>
            <TableHR />
            <TableOxy />
          </Accordion>
          <Accordion data={faqsMedicalBlackbox.slice(2, 4)}>
            <TableTemp />
            <TableGSR />
          </Accordion>
        </div>
        <div className="title-app-content">Uric Acid Blackbox</div>
        <div className="app-content-uric">
          <Accordion data={faqsUricAcid}>
            <TableUricAcid />
          </Accordion>
        </div>
        <div className="title-app-content">Gait Band System</div>
        <div className="app-content-medical-gait">
          <Accordion data={faqsGaitBandSystem.slice(0, 2)}>
            <TableStepCount />
            <TableStrideLength />
          </Accordion>
          <Accordion data={faqsGaitBandSystem.slice(2, 3)}>
            <TableCadence />
          </Accordion>
        </div>
      </div>
    </div>
  );
}

function Accordion({ data, children }) {
  const [curOpen, setCurOpen] = useState(null);

  return (
    <div>
      {data.map((el, index) => (
        <AccordionItem
          curOpen={curOpen}
          onOpen={setCurOpen}
          title={el.title}
          num={el.id}
          key={el.id}
        >
          {Array.isArray(children) ? children[index] : children}
        </AccordionItem>
      ))}
    </div>
  );
}

function AccordionItem({ num, title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className={`item ${isOpen ? "open" : ""}`}>
      <p className="number">{`0${num}`}</p>
      <p className="title">{title}</p>

      {!isOpen ? (
        <div className="icon open" onClick={handleToggle}>
          +
        </div>
      ) : (
        <div className="icon close" onClick={handleToggle}>
          -
        </div>
      )}

      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}

function TableHR() {
  const [heartRateData, setHeartRateData] = useState(initialHeartRateData);
  const [viewMode, setViewMode] = useState("table");

  const handleAddRow = () => {
    const newRow = {
      timestamp: new Date().toLocaleString(),
      heartRate: generateData(60, 100),
      minRef: 60,
      maxRef: 100,
      observations: "Normal",
    };
    setHeartRateData([...heartRateData, newRow]);
  };

  if (viewMode === "chart") {
    return (
      <div className="chart-box">
        <div className={heartRateData.length > 8 ? "chart-wrapper" : ""}>
          <LineChart
            margin={{ right: 120, bottom: 100 }}
            xAxis={[
              {
                labelStyle: {
                  fontSize: 14,
                  transform: `translateY(${
                    5 * Math.abs(Math.sin((Math.PI * 15) / 180))
                  }px)`,
                },
                tickLabelStyle: {
                  angle: 30,
                  textAnchor: "start",
                  fontSize: 12,
                },
                scaleType: "point",
                data: heartRateData
                  .slice()
                  .reverse()
                  .map((heartDataPoint) => heartDataPoint.timestamp),
              },
            ]}
            yAxis={[
              {
                scaleType: "linear",
                domain: [50, 140],
                min: 50,
                max: 140,
              },
            ]}
            series={[
              {
                data: heartRateData
                  .slice()
                  .reverse()
                  .map((heartDataPoint) => Number(heartDataPoint.heartRate)),
              },
            ]}
            height={350}
          />
        </div>
        <div>
          <button
            className="add-measurement"
            onClick={() => setViewMode("table")}
          >
            View Table
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Time Stamp</th>
            <th>Heart Rate</th>
            <th>Min Ref Value</th>
            <th>Max Ref Value</th>
            <th>Observations</th>
          </tr>
        </thead>
        <tbody>
          {heartRateData.map((row, index) => (
            <tr key={index}>
              <td>{row.timestamp}</td>
              <td>{row.heartRate}</td>
              <td>{row.minRef}</td>
              <td>{row.maxRef}</td>
              <td>{row.observations}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-measurement" onClick={handleAddRow}>
        Add Measurement
      </button>
      <button className="add-measurement" onClick={() => setViewMode("chart")}>
        View Chart
      </button>
    </div>
  );
}

function TableOxy() {
  const [oxygenSaturationData, setOxygenSaturationData] = useState(
    initialOxygenSaturationData
  );
  const [viewMode, setViewMode] = useState("table");

  const handleAddRow = (setData, data) => {
    const newRow = {
      timestamp: new Date().toLocaleString(),
      oxygenSaturation: generateData(95, 100),
      minRef: 95,
      maxRef: 100,
      observations: "Normal",
    };
    setData([...data, newRow]);
  };

  if (viewMode === "chart") {
    return (
      <div className="chart-box">
        <div className={oxygenSaturationData.length > 8 ? "chart-wrapper" : ""}>
          <LineChart
            margin={{ right: 120, bottom: 100 }}
            xAxis={[
              {
                labelStyle: {
                  fontSize: 14,
                  transform: `translateY(${
                    5 * Math.abs(Math.sin((Math.PI * 15) / 180))
                  }px)`,
                },
                tickLabelStyle: {
                  angle: 30,
                  textAnchor: "start",
                  fontSize: 12,
                },
                scaleType: "point",
                data: oxygenSaturationData
                  .slice()
                  .reverse()
                  .map((oxyDataPoint) =>
                    new Date(oxyDataPoint.timestamp).toLocaleString()
                  ),
              },
            ]}
            yAxis={[
              {
                scaleType: "linear",
                domain: [90, 100], // Set the y-axis domain here
                min: 90,
                max: 100,
              },
            ]}
            series={[
              {
                data: oxygenSaturationData
                  .slice()
                  .reverse()
                  .map((oxyDataPoint) => Number(oxyDataPoint.oxygenSaturation)),
              },
            ]}
            height={350}
          />
        </div>
        <div>
          <button
            className="add-measurement"
            onClick={() => setViewMode("table")}
          >
            View Table
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Time Stamp</th>
            <th>Oxygen Saturation</th>
            <th>Min Ref Value</th>
            <th>Max Ref Value</th>
            <th>Observations</th>
          </tr>
        </thead>
        <tbody>
          {oxygenSaturationData.map((row, index) => (
            <tr key={index}>
              <td>{row.timestamp}</td>
              <td>{row.oxygenSaturation}</td>
              <td>{row.minRef}</td>
              <td>{row.maxRef}</td>
              <td>{row.observations}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="add-measurement"
        onClick={() =>
          handleAddRow(setOxygenSaturationData, oxygenSaturationData)
        }
      >
        Add Measurement
      </button>
      <button className="add-measurement" onClick={() => setViewMode("chart")}>
        View Chart
      </button>
    </div>
  );
}

function TableTemp() {
  const [temperatureData, setTemperatureData] = useState(
    initialTemperatureData
  );
  const [viewMode, setViewMode] = useState("table");

  const handleAddRow = (setData, data) => {
    const newRow = {
      timestamp: new Date().toLocaleString(),
      temperature: generateData(36.5, 37.5, 1),
      minRef: 36.5,
      maxRef: 37.5,
      observations: "Normal",
    };
    setData([...data, newRow]);
  };

  if (viewMode === "chart") {
    return (
      <div className="chart-box">
        <div className={temperatureData.length > 8 ? "chart-wrapper" : ""}>
          <LineChart
            margin={{ right: 120, bottom: 100 }}
            xAxis={[
              {
                labelStyle: {
                  fontSize: 14,
                  transform: `translateY(${
                    5 * Math.abs(Math.sin((Math.PI * 15) / 180))
                  }px)`,
                },
                tickLabelStyle: {
                  angle: 30,
                  textAnchor: "start",
                  fontSize: 12,
                },
                scaleType: "point",
                data: temperatureData
                  .slice()
                  .reverse()
                  .map((tempDataPoint) =>
                    new Date(tempDataPoint.timestamp).toLocaleString()
                  ),
              },
            ]}
            yAxis={[
              {
                scaleType: "linear",
                domain: [35, 40], // Set the y-axis domain here
                min: 35,
                max: 40,
              },
            ]}
            series={[
              {
                data: temperatureData
                  .slice()
                  .reverse()
                  .map((tempDataPoint) => Number(tempDataPoint.temperature)),
              },
            ]}
            height={350}
          />
        </div>
        <div>
          <button
            className="add-measurement"
            onClick={() => setViewMode("table")}
          >
            View Table
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Time Stamp</th>
            <th>Temperature</th>
            <th>Min Ref Value</th>
            <th>Max Ref Value</th>
            <th>Observations</th>
          </tr>
        </thead>
        <tbody>
          {temperatureData.map((row, index) => (
            <tr key={index}>
              <td>{row.timestamp}</td>
              <td>{row.temperature}</td>
              <td>{row.minRef}</td>
              <td>{row.maxRef}</td>
              <td>{row.observations}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="add-measurement"
        onClick={() => handleAddRow(setTemperatureData, temperatureData)}
      >
        Add Measurement
      </button>
      <button className="add-measurement" onClick={() => setViewMode("chart")}>
        View Chart
      </button>
    </div>
  );
}

function TableGSR() {
  const [gsrData, setGSRData] = useState(initialGSRData);
  const [viewMode, setViewMode] = useState("table");

  const handleAddRow = (setData, data) => {
    const newRow = {
      timestamp: new Date().toLocaleString(),
      gsr: generateData(0.5, 3.5, 2),
      minRef: 0.5,
      maxRef: 3.5,
      observations: "Normal",
    };
    setData([...data, newRow]);
  };

  if (viewMode === "chart") {
    return (
      <div className="chart-box">
        <div className={gsrData.length > 8 ? "chart-wrapper" : ""}>
          <LineChart
            margin={{ right: 120, bottom: 100 }}
            xAxis={[
              {
                labelStyle: {
                  fontSize: 14,
                  transform: `translateY(${
                    5 * Math.abs(Math.sin((Math.PI * 15) / 180))
                  }px)`,
                },
                tickLabelStyle: {
                  angle: 30,
                  textAnchor: "start",
                  fontSize: 12,
                },
                scaleType: "point",
                data: gsrData
                  .slice()
                  .reverse()
                  .map((gsrDataPoint) =>
                    new Date(gsrDataPoint.timestamp).toLocaleString()
                  ),
              },
            ]}
            yAxis={[
              {
                scaleType: "linear",
                domain: [0, 5], // Set the y-axis domain here
                min: 0,
                max: 5,
              },
            ]}
            series={[
              {
                data: gsrData
                  .slice()
                  .reverse()
                  .map((gsrDataPoint) => Number(gsrDataPoint.gsr)),
              },
            ]}
            height={350}
          />
        </div>
        <div>
          <button
            className="add-measurement"
            onClick={() => setViewMode("table")}
          >
            View Table
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Time Stamp</th>
            <th>GSR</th>
            <th>Min Ref Value</th>
            <th>Max Ref Value</th>
            <th>Observations</th>
          </tr>
        </thead>
        <tbody>
          {gsrData.map((row, index) => (
            <tr key={index}>
              <td>{row.timestamp}</td>
              <td>{row.gsr}</td>
              <td>{row.minRef}</td>
              <td>{row.maxRef}</td>
              <td>{row.observations}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="add-measurement"
        onClick={() => handleAddRow(setGSRData, gsrData)}
      >
        Add Measurement
      </button>
      <button className="add-measurement" onClick={() => setViewMode("chart")}>
        View Chart
      </button>
    </div>
  );
}
function TableUricAcid() {
  const [uricAcidData, setUricAcidData] = useState(initialUricAcidData);
  const [viewMode, setViewMode] = useState("table");

  const handleAddRow = () => {
    const newRow = {
      timestamp: new Date().toLocaleString(),
      uricAcid: generateData(3.5, 7.5, 1),
      minRef: 3.5,
      maxRef: 7.5,
      observations: "Normal",
    };
    setUricAcidData([...uricAcidData, newRow]);
  };

  if (viewMode === "chart") {
    return (
      <div className="chart-box">
        <div className={uricAcidData.length > 8 ? "chart-wrapper" : ""}>
          <LineChart
            margin={{ right: 120, bottom: 100 }}
            xAxis={[
              {
                labelStyle: {
                  fontSize: 14,
                  transform: `translateY(${
                    5 * Math.abs(Math.sin((Math.PI * 15) / 180))
                  }px)`,
                },
                tickLabelStyle: {
                  angle: 30,
                  textAnchor: "start",
                  fontSize: 12,
                },
                scaleType: "point",
                data: uricAcidData
                  .slice()
                  .reverse()
                  .map((dataPoint) => dataPoint.timestamp),
              },
            ]}
            yAxis={[
              {
                scaleType: "linear",
                domain: [3, 8],
                min: 3,
                max: 8,
              },
            ]}
            series={[
              {
                data: uricAcidData
                  .slice()
                  .reverse()
                  .map((dataPoint) => Number(dataPoint.uricAcid)),
              },
            ]}
            height={350}
          />
        </div>
        <div>
          <button
            className="add-measurement"
            onClick={() => setViewMode("table")}
          >
            View Table
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Time Stamp</th>
            <th>Uric Acid Level</th>
            <th>Min Ref Value</th>
            <th>Max Ref Value</th>
            <th>Observations</th>
          </tr>
        </thead>
        <tbody>
          {uricAcidData.map((row, index) => (
            <tr key={index}>
              <td>{row.timestamp}</td>
              <td>{row.uricAcid}</td>
              <td>{row.minRef}</td>
              <td>{row.maxRef}</td>
              <td>{row.observations}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-measurement" onClick={handleAddRow}>
        Add Measurement
      </button>
      <button className="add-measurement" onClick={() => setViewMode("chart")}>
        View Chart
      </button>
    </div>
  );
}

function TableStepCount() {
  const [stepCountData, setStepCountData] = useState(initialGaitData.stepCount);
  const [viewMode, setViewMode] = useState("table");

  const handleAddRow = () => {
    const newRow = {
      timestamp: new Date().toLocaleString(),
      stepCount: generateData(1000, 5000),
      minRef: 1000,
      maxRef: 5000,
      observations: "Normal",
    };
    setStepCountData([...stepCountData, newRow]);
  };

  if (viewMode === "chart") {
    return (
      <div className="chart-box">
        <div className={stepCountData.length > 8 ? "chart-wrapper" : ""}>
          <LineChart
            margin={{ right: 120, bottom: 100 }}
            xAxis={[
              {
                labelStyle: {
                  fontSize: 14,
                  transform: `translateY(${
                    5 * Math.abs(Math.sin((Math.PI * 15) / 180))
                  }px)`,
                },
                tickLabelStyle: {
                  angle: 30,
                  textAnchor: "start",
                  fontSize: 12,
                },
                scaleType: "point",
                data: stepCountData
                  .slice()
                  .reverse()
                  .map((dataPoint) => dataPoint.timestamp),
              },
            ]}
            yAxis={[
              {
                scaleType: "linear",
                domain: [0, 6000],
                min: 0,
                max: 6000,
              },
            ]}
            series={[
              {
                data: stepCountData
                  .slice()
                  .reverse()
                  .map((dataPoint) => Number(dataPoint.stepCount)),
              },
            ]}
            height={350}
          />
        </div>
        <div>
          <button
            className="add-measurement"
            onClick={() => setViewMode("table")}
          >
            View Table
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Time Stamp</th>
            <th>Step Count</th>
            <th>Min Ref Value</th>
            <th>Max Ref Value</th>
            <th>Observations</th>
          </tr>
        </thead>
        <tbody>
          {stepCountData.map((row, index) => (
            <tr key={index}>
              <td>{row.timestamp}</td>
              <td>{row.stepCount}</td>
              <td>{row.minRef}</td>
              <td>{row.maxRef}</td>
              <td>{row.observations}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-measurement" onClick={handleAddRow}>
        Add Measurement
      </button>
      <button className="add-measurement" onClick={() => setViewMode("chart")}>
        View Chart
      </button>
    </div>
  );
}
function TableStrideLength() {
  const [strideLengthData, setStrideLengthData] = useState(
    initialGaitData.strideLength
  );
  const [viewMode, setViewMode] = useState("table");

  const handleAddRow = () => {
    const newRow = {
      timestamp: new Date().toLocaleString(),
      strideLength: generateData(0.5, 1.5, 2),
      minRef: 0.5,
      maxRef: 1.5,
      observations: "Normal",
    };
    setStrideLengthData([...strideLengthData, newRow]);
  };

  if (viewMode === "chart") {
    return (
      <div className="chart-box">
        <div className={strideLengthData.length > 8 ? "chart-wrapper" : ""}>
          <LineChart
            margin={{ right: 120, bottom: 100 }}
            xAxis={[
              {
                labelStyle: {
                  fontSize: 14,
                  transform: `translateY(${
                    5 * Math.abs(Math.sin((Math.PI * 15) / 180))
                  }px)`,
                },
                tickLabelStyle: {
                  angle: 30,
                  textAnchor: "start",
                  fontSize: 12,
                },
                scaleType: "point",
                data: strideLengthData
                  .slice()
                  .reverse()
                  .map((dataPoint) => dataPoint.timestamp),
              },
            ]}
            yAxis={[
              {
                scaleType: "linear",
                domain: [0, 2],
                min: 0,
                max: 2,
              },
            ]}
            series={[
              {
                data: strideLengthData
                  .slice()
                  .reverse()
                  .map((dataPoint) => Number(dataPoint.strideLength)),
              },
            ]}
            height={350}
          />
        </div>
        <div>
          <button
            className="add-measurement"
            onClick={() => setViewMode("table")}
          >
            View Table
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Time Stamp</th>
            <th>Stride Length (m)</th>
            <th>Min Ref Value</th>
            <th>Max Ref Value</th>
            <th>Observations</th>
          </tr>
        </thead>
        <tbody>
          {strideLengthData.map((row, index) => (
            <tr key={index}>
              <td>{row.timestamp}</td>
              <td>{row.strideLength}</td>
              <td>{row.minRef}</td>
              <td>{row.maxRef}</td>
              <td>{row.observations}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-measurement" onClick={handleAddRow}>
        Add Measurement
      </button>
      <button className="add-measurement" onClick={() => setViewMode("chart")}>
        View Chart
      </button>
    </div>
  );
}
function TableCadence() {
  const [cadenceData, setCadenceData] = useState(initialGaitData.cadence);
  const [viewMode, setViewMode] = useState("table");

  const handleAddRow = () => {
    const newRow = {
      timestamp: new Date().toLocaleString(),
      cadence: generateData(60, 120),
      minRef: 60,
      maxRef: 120,
      observations: "Normal",
    };
    setCadenceData([...cadenceData, newRow]);
  };

  if (viewMode === "chart") {
    return (
      <div className="chart-box">
        <div className={cadenceData.length > 8 ? "chart-wrapper" : ""}>
          <LineChart
            margin={{ right: 120, bottom: 100 }}
            xAxis={[
              {
                labelStyle: {
                  fontSize: 14,
                  transform: `translateY(${
                    5 * Math.abs(Math.sin((Math.PI * 15) / 180))
                  }px)`,
                },
                tickLabelStyle: {
                  angle: 30,
                  textAnchor: "start",
                  fontSize: 12,
                },
                scaleType: "point",
                data: cadenceData
                  .slice()
                  .reverse()
                  .map((dataPoint) => dataPoint.timestamp),
              },
            ]}
            yAxis={[
              {
                scaleType: "linear",
                domain: [50, 130],
                min: 50,
                max: 130,
              },
            ]}
            series={[
              {
                data: cadenceData
                  .slice()
                  .reverse()
                  .map((dataPoint) => Number(dataPoint.cadence)),
              },
            ]}
            height={350}
          />
        </div>
        <div>
          <button
            className="add-measurement"
            onClick={() => setViewMode("table")}
          >
            View Table
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Time Stamp</th>
            <th>Cadence (steps/min)</th>
            <th>Min Ref Value</th>
            <th>Max Ref Value</th>
            <th>Observations</th>
          </tr>
        </thead>
        <tbody>
          {cadenceData.map((row, index) => (
            <tr key={index}>
              <td>{row.timestamp}</td>
              <td>{row.cadence}</td>
              <td>{row.minRef}</td>
              <td>{row.maxRef}</td>
              <td>{row.observations}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-measurement" onClick={handleAddRow}>
        Add Measurement
      </button>
      <button className="add-measurement" onClick={() => setViewMode("chart")}>
        View Chart
      </button>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './PatientDashboard.css'; // Import CSS file for styling

const PatientDashboard = () => {
  const [patientData, setPatientData] = useState([
    { id: Date.now(), date: '', temperature: 0, systolic: 0, diastolic: 0, sugarLevel: 0 },
  ]);

  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = document.getElementById('healthChart');
    const labels = patientData.map(data => data.date);
    const datasets = [
      {
        label: 'Temperature (°C)',
        data: patientData.map(data => data.temperature),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Systolic BP (mmHg)',
        data: patientData.map(data => data.systolic),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Diastolic BP (mmHg)',
        data: patientData.map(data => data.diastolic),
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      },
      {
        label: 'Sugar Level',
        data: patientData.map(data => data.sugarLevel),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ];

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [patientData]);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    setPatientData(prevState => {
      const newData = [...prevState];
      newData[index][name] = parseFloat(value) || 0;
      return newData;
    });
  };

  const handleDateChange = (event, index) => {
    const { value } = event.target;
    setPatientData(prevState => {
      const newData = [...prevState];
      newData[index].date = value;
      return newData;
    });
  };

  const addEntry = () => {
    setPatientData(prevState => [
      ...prevState,
      { id: Date.now(), date: '', temperature: 0, systolic: 0, diastolic: 0, sugarLevel: 0 },
    ]);
  };

  const deleteEntry = (id) => {
    setPatientData(prevState => prevState.filter(entry => entry.id !== id));
  };

  return (
    <div className="dashboard-container">
      {patientData.map((data, index) => (
        <div className="main-card">
        <div key={data.id} className="card">
          <h3>Date: {data.date}</h3>
          <div className="input-container-date">
            <label htmlFor={`date-${index}`}>Date:</label>
            <input type="date" id={`date-${index}`} name="date" value={data.date} onChange={(e) => handleDateChange(e, index)} />
            <hr />
          </div>
          <div className="input-container">
            <label htmlFor={`temperature-${index}`}>Temperature (°C):</label>
            <input type="number" id={`temperature-${index}`} name="temperature" value={data.temperature} onChange={(e) => handleInputChange(e, index)} />
            <hr />
          </div>
          <div className="input-container">
            <label htmlFor={`systolic-${index}`}>Systolic Blood Pressure (mmHg):</label>
            <input type="number" id={`systolic-${index}`} name="systolic" value={data.systolic} onChange={(e) => handleInputChange(e, index)} />
            <hr />
          </div>
          <div className="input-container">
            <label htmlFor={`diastolic-${index}`}>Diastolic Blood Pressure (mmHg):</label>
            <input type="number" id={`diastolic-${index}`} name="diastolic" value={data.diastolic} onChange={(e) => handleInputChange(e, index)} />
            <hr />
          </div>
          <div className="input-container">
            <label htmlFor={`sugarLevel-${index}`}>Sugar Level:</label>
            <input type="number" id={`sugarLevel-${index}`} name="sugarLevel" value={data.sugarLevel} onChange={(e) => handleInputChange(e, index)} />
            <hr />
          </div>
          <div className="card-button">
          <button className="add-entry-btn" onClick={addEntry}>Add Entry</button>
          <button className="delete-entry-btn" onClick={() => deleteEntry(data.id)}>Delete Entry</button>
          </div>
        </div>
       
        </div>
       
      ))}
       <div className="chart-container">
        <canvas id="healthChart"></canvas>
      </div>
    </div>
  );
}

export default PatientDashboard;

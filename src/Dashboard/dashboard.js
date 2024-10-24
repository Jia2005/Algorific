import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './dashboard.css';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const scores = [50, 60, 70, 85, 90, 95];
  const highestScore = Math.max(...scores);
  const lastScore = scores[scores.length - 1];

  const data = {
    labels: ['Game 1', 'Game 2', 'Game 3', 'Game 4', 'Game 5', 'Game 6'],
    datasets: [
      {
        label: 'Scores',
        data: scores,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'black',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="user-profile">
          <h3>Jia Harisinghani</h3>
        </div>
        <nav>
          <ul>
            <li>Home</li>
            <li>Algorithm</li>
            <li>Profile</li>
          </ul>
        </nav>
        <div className="logout">
          <button>Logout</button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="graph-section">
          <h2 style={{color:'black'}}>Prior Scores</h2>
          <Line data={data} options={options} />
        </div>
       </div>
       <div className="score-info">
          <h3 style={{color:'black'}}>Last Score: {lastScore}</h3>
          <h3 style={{color:'black'}}>Highest Score: {highestScore}</h3>
        </div>
      
    </div>
  );
}

export default Dashboard;

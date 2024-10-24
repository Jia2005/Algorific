import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './dashboard.css';
import { Link } from 'react-router-dom';

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
          <h2 style={{fontWeight:'bold', alignSelf:'top'}}>Jia Harisinghani</h2>
          <hr className="sidebar-divider" />
          <div className="sidebar-menu">
            <ul>
              <li className="center">
                <Link to="/home" style={{color:'black'}}>Home</Link></li>
                <li><Link to="/algo" style={{color:'black'}}>Algorithm</Link></li>
                <li><Link to="/dashboard" style={{color:'black'}}>Dashboard</Link>
              </li>
            </ul>
          </div>
          <div className='log' >
            <button Link to="/" className="logout-button" style={{alignSelf:'left'}}>Logout</button>
          </div>
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

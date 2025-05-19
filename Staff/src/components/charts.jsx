import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

export const BarChart = ({ data }) => {
  return <Bar data={data} options={{ 
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }} />;
};

export const PieChart = ({ data }) => {
  return <Pie data={data} options={{ 
    responsive: true,
    maintainAspectRatio: false 
  }} />;
};
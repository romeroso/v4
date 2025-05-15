import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { MetricType, HealthMetric } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface HealthChartProps {
  data: HealthMetric[];
  type: MetricType;
  chartType?: 'line' | 'bar';
}

const getColorForMetricType = (type: MetricType): string => {
  switch (type) {
    case 'heart-rate':
      return '#FF2D55'; // heart red
    case 'sleep':
      return '#AF52DE'; // sleep purple
    case 'blood-oxygen':
      return '#5AC8FA'; // oxygen blue
    case 'stress':
      return '#FFD60A'; // stress yellow
    case 'hrv':
      return '#FF9500'; // HRV orange
    case 'weight':
      return '#34C759'; // weight green
    default:
      return '#0A84FF'; // default blue
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatDayDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

const HealthChart: React.FC<HealthChartProps> = ({ 
  data,
  type,
  chartType = 'line' 
}) => {
  // Sort data by timestamp
  const sortedData = [...data].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  
  const color = getColorForMetricType(type);
  
  // Format data for chart
  const chartData = {
    labels: sortedData.map(item => 
      type === 'sleep' || type === 'weight' ? formatDayDate(item.timestamp) : formatDate(item.timestamp)
    ),
    datasets: [
      {
        label: type === 'heart-rate' ? 'Heart Rate' 
             : type === 'sleep' ? 'Sleep Duration' 
             : type === 'blood-oxygen' ? 'Blood Oxygen' 
             : type === 'stress' ? 'Stress Level' 
             : type === 'hrv' ? 'Heart Rate Variability' 
             : 'Weight',
        data: sortedData.map(item => item.value),
        borderColor: color,
        backgroundColor: `${color}33`,
        borderWidth: 2,
        pointBackgroundColor: color,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.3,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: '#8E8E93',
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          display: false,
          color: '#3A3A3C'
        }
      },
      y: {
        ticks: {
          color: '#8E8E93'
        },
        grid: {
          color: '#3A3A3C'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#1C1C1E',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        borderColor: '#3A3A3C',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false
      }
    }
  };

  return (
    <div className="h-64 w-full">
      {chartType === 'line' ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <Bar data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default HealthChart;
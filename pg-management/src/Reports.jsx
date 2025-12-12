import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  LineChart,
  Line
} from 'recharts';

const data = [
  { name: 'Jan', bookings: 20, revenue: 3000 },
  { name: 'Feb', bookings: 25, revenue: 3500 },
  { name: 'Mar', bookings: 30, revenue: 4000 },
  { name: 'Apr', bookings: 20, revenue: 3000 },
  { name: 'May', bookings: 28, revenue: 3600 },
  { name: 'Jun', bookings: 35, revenue: 4500 },
  { name: 'Jul', bookings: 45, revenue: 5500 },
  { name: 'Aug', bookings: 25, revenue: 3300 },
];

const styles = {
  charts: {
    display: 'flex',
    flexDirection: 'column',
    gap: '80px',
    padding: '60px',
    backgroundColor: '#17252A', // Background Color
    color: '#DEF2F1', // Text Color
    minHeight: '100vh',
    fontFamily: "'Cinzel Decorative', sans-serif",
  },
  chartContainer: {
    width: '100%',
    height: '320px',
    backgroundColor: 'rgba(23, 37, 42, 0.95)', // Card Background
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(58, 175, 169, 0.2)',
    border: '1px solid #2A3B3E',
  },
  tooltip: {
    backgroundColor: '#2A3B3E',
    border: 'none',
    color: '#DEF2F1',
  },
  legend: {
    color: '#DEF2F1',
  }
};

function Reports() {
  return (
    <div style={styles.charts}>
      {/* Bar Chart */}
      <div style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="#2A3B3E" />
            <XAxis dataKey="name" stroke="#DEF2F1" />
            <YAxis stroke="#DEF2F1" />
            <Tooltip contentStyle={styles.tooltip} />
            <Legend wrapperStyle={styles.legend} />
            <Bar dataKey="bookings" fill="#3AAFA9" />
            <Bar dataKey="revenue" fill="#2B7A78" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#2A3B3E" />
            <XAxis dataKey="name" stroke="#DEF2F1" />
            <YAxis stroke="#DEF2F1" />
            <Tooltip contentStyle={styles.tooltip} />
            <Legend wrapperStyle={styles.legend} />
            <Line type="monotone" dataKey="bookings" stroke="#3AAFA9" strokeWidth={2} />
            <Line type="monotone" dataKey="revenue" stroke="#2B7A78" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Reports;

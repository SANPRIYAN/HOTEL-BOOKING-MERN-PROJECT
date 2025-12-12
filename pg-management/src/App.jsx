import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';
import Login from './Login';
import Signup from './Signup';
import Clientbooking from './Clientbooking';
import Requests from './Requests';
import Reports from './Reports';
import MainContent from './MainContent';
function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} /> {/* This line added */}
        <Route path="/home" element={<Home />} />
        <Route path="/clientbooking" element={<Clientbooking />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/request" element={<Requests />} />
       <Route path="/report" element={<Reports />} />
      
        <Route path="*" element={<Home />} /> {/* Redirect to Home for any unknown routes */}
       
      </Routes>
    </Router>
  );
}

export default App;
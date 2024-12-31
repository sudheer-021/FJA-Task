import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CrudDashboard from './pages/CrudDashboard';
import UserDetails from './pages/UserDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CrudDashboard />} />
        <Route path="/details/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

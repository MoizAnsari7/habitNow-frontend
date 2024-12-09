import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidenav from './components/Sidenav'; // Import the Sidenav component
import HabitsPage from './pages/HabitPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingPage';


function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidenav />
        <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
          <Routes>
            <Route path="/home" element={<  HabitsPage />} />
            <Route path="/timer" element={< ProfilePage />} />
            <Route path="/timer" element={< SettingsPage  />} />
            {/* Add routes for other pages here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appointments from './components/Appointments';
import Doctors from './components/Doctors';
import Patients from './components/Patients';
import Navigation from './components/Navigation'; 
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="container">
                <h1 style={{ color: 'green' }}>KPT - Hospital Management App</h1>
                <Navigation /> 
                <Routes>
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/" element={<Appointments />} />
                    <Route path="/doctors" element={<Doctors />} />
                    <Route path="/patients" element={<Patients />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

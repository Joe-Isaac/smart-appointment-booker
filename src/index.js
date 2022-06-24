import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Patientrecord from './components/Patient__record';
import Doctor from './components/Doctor';
import Schedule from './components/Schedule';
import SpecBooking from './components/Booking';
import Appointment from './components/Appointments';
import PatientBooking from './components/PatientBooking';
import DoctorRecords from './components/DoctorRecords';
import RoomAllocation from './components/RoomAllocation';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
      <Route path="Patient__record" element={<Patientrecord />}/>
      <Route path="Dashboard" element={<Dashboard />}/>
      <Route path="Doctor" element={<Doctor />}/>
      <Route path="Schedule" element={<Schedule />}/>
      <Route path="Booking" element={<SpecBooking />}/>
      <Route path="Appointments" element={<Appointment />}/>
      <Route path="PatientBooking" element={<PatientBooking />}/>
      <Route path="DoctorRecords" element={<DoctorRecords />}/>
      <Route path="RoomAllocation" element={<RoomAllocation />}/>
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

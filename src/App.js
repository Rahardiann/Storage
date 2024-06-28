import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Dashboard, LoginForm } from './pages'; // import halaman-halaman yang diperlukan
import Patient from './pages/patient/patient';
import Stokbarangmentah from './pages/booking/barangmentah';
import Riwayat from './pages/jadwal/riwayat';
import Kategori from './pages/promo/Jadwal';
import Masterbarangjadi from './pages/promo/dentist';
import MasterBarangMentah from './pages/promo/masterbarangmentah';
import Gallery from './pages/galery/galery';
import Jadwal from './pages/promo/Jadwal';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pasien" element={<Patient/>} />
        <Route path="/booking" element={<Stokbarangmentah/>} />
        <Route path="/jadwals" element={<Riwayat/>} />
        <Route path="/jadwal" element={<Kategori/>} />
        <Route path="/dentist" element={<Masterbarangjadi/>} />
        <Route path="/promo" element={<MasterBarangMentah/>} />
        <Route path="/gallery" element={<Gallery/>} />
        <Route path="/jadwal" element={<Jadwal/>} />
      </Routes>
    </Router>
  );
}

export default App


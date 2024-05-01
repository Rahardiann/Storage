import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Dashboard, LoginForm } from './pages'; // import halaman-halaman yang diperlukan
import Patient from './pages/patient/patient';
import Stokbarangmentah from './pages/booking/barangmentah';
import Riwayat from './pages/jadwal/riwayat';
import Kategori from './pages/master/kategori';
import Masterbarangjadi from './pages/master/dentist';
import MasterBarangMentah from './pages/master/masterbarangmentah';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/barangjadi" element={<Patient/>} />
        <Route path="/barangmentah" element={<Stokbarangmentah/>} />
        <Route path="/riwayat" element={<Riwayat/>} />
        <Route path="/master/kategoriBarang" element={<Kategori/>} />
        <Route path="/master/masterBarangjadi" element={<Masterbarangjadi/>} />
        <Route path="/master/masterbarangmentah" element={<MasterBarangMentah/>} />
      </Routes>
    </Router>
  );
}

export default App


import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Dashboard, LoginForm } from './pages'; // import halaman-halaman yang diperlukan
import Stokbarangjadi from './pages/patient/barangjadi';
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
        <Route path="/barangjadi" element={<Stokbarangjadi/>} />
        <Route path="/barangmentah" element={<Stokbarangmentah/>} />
        <Route path="/riwayat" element={<Riwayat/>} />
        <Route path="/Master/KategoriBarang" element={<Kategori/>} />
        <Route path="/Master/MasterBarangjadi" element={<Masterbarangjadi/>} />
        <Route path="/Master/Masterbarangmentah" element={<MasterBarangMentah/>} />
      </Routes>
    </Router>
  );
}

export default App


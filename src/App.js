import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Dashboard, LoginForm } from './pages'; // import halaman-halaman yang diperlukan
import Stokbarangjadi from './pages/barangjadi/barangjadi';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/barangjadi" element={<Stokbarangjadi/>} />
      </Routes>
    </Router>
  );
}

export default App


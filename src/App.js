import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Dashboard, LoginForm} from './pages'
import BarChartComponent from './pages/homepage/dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/home" element={<BarChartComponent/>}/>
      </Routes>
    </Router>
  );
};

export default App


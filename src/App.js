import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Homepage, LoginForm} from './pages'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/home" element={<Homepage/>}/>
      </Routes>
    </Router>
  );
};

export default App


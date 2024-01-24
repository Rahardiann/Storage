import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaBox, FaCubes, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import "../sidebar/sidebar.css"
import Logosidebar from "../../assets/logosidebar.svg"

const Sidebar = () => {
  return (
    <div className="sidebar" style={{ backgroundColor: '#4A55A2' }}>
      <div className="logo-container">
        <img src={Logosidebar} alt="Logo" className="logo" />
      </div>
      <ul className="menu">
        <li>
          <Link to="/dashboard" className="menu-link">
            <FaHome className="icon" /> <span className="text">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/stock-barang-jadi" className="menu-link">
            <FaBox className="icon" /> <span className="text">Stock Barang Jadi</span>
          </Link>
        </li>
        <li>
          <Link to="/stock-barang-mentah" className="menu-link">
            <FaCubes className="icon" /> <span className="text">Stock Barang Mentah</span>
          </Link>
        </li>
        <li>
          <Link to="/riwayat" className="menu-link">
            <FaHistory className="icon" /> <span className="text">Riwayat</span>
          </Link>
        </li>
        <li>
          <Link to="/logout" className="menu-link">
            <FaSignOutAlt className="icon" /> <span className="text">Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar;

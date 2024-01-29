// sidebar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBox, FaCubes, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import Logosidebar from '../../assets/logosidebar.svg';

const Sidebar = () => {
  const [minimized, setMinimized] = useState(false);

  const toggleSidebar = () => {
    setMinimized(!minimized);
  };

  return (
    <div className={`flex flex-col h-screen ${minimized ? 'w-16' : 'w-64'} bg-main transition-all ease-in-out duration-300`}>
      <div className="p-4">
        <img src={Logosidebar} alt="Logo" className={`size-32  w-full ${minimized ? 'mx-auto' : 'mt-8'}`} />
      </div>
      <ul className="flex-grow">
        <li className="my-4">
          <Link to="/dashboard" className={`flex items-center text-white text-base ${minimized ? 'pl-2' : 'pl-4'}`}>
            <FaHome className={`mr-2 ${minimized ? 'ml-3' : 'mr-4'}`} /> {!minimized && <span>Dashboard</span>}
          </Link>
        </li>
        <li className="my-10">
          <Link to="/stock-barang-jadi" className={`flex items-center text-white text-base ${minimized ? 'pl-2' : 'pl-4'}`}>
            <FaBox className={`mr-2 ${minimized ? 'ml-3' : 'mr-4'}`} /> {!minimized && <span>Stock Barang Jadi</span>}
          </Link>
        </li>
        <li className="my-10">
          <Link to="/stock-barang-mentah" className={`flex items-center text-white text-base ${minimized ? 'pl-2' : 'pl-4'}`}>
            <FaCubes className={`mr-2 ${minimized ? 'ml-3' : 'mr-4'}`} /> {!minimized && <span>Stock Barang Mentah</span>}
          </Link>
        </li>
        <li className="my-10">
          <Link to="/riwayat" className={`flex items-center text-white text-base ${minimized ? 'pl-2' : 'pl-4'}`}>
            <FaHistory className={`mr-2 ${minimized ? 'ml-3' : 'mr-4'}`} /> {!minimized && <span>Riwayat</span>}
          </Link>
        </li>
        <li className="my-10">
          <Link to="/logout" className={`flex items-center text-white text-base ${minimized ? 'pl-2' : 'pl-4'}`}>
            <FaSignOutAlt className={`mr-2 ${minimized ? 'ml-3' : 'mr-4'}`} /> {!minimized && <span>Logout</span>}
          </Link>
        </li>
      </ul>
      <div className="p-4">
        <button className="bg-blue-200 text-main btn btn-blue  py-1 rounded" onClick={toggleSidebar}>
          {minimized ? '>' : '<'}
    
        </button>
      </div>
    </div>
  );
};
export default Sidebar;

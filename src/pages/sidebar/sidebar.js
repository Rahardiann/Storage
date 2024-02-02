import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBox, FaCubes, FaHistory, FaSignOutAlt, FaBars } from 'react-icons/fa';
import Logosidebar from '../../assets/logosidebar.svg';

const Sidebar = () => {
  const [minimized, setMinimized] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setMinimized(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`flex flex-col h-screen ${minimized ? 'w-16' : 'w-64'} bg-main transition-all ease-in-out duration-300`}>
      <div className="p-4">
        <img src={Logosidebar} alt="Logo" className={`size-32 w-full ${minimized ? 'mx-auto' : 'mt-8'}`} />
      </div>
      <ul className="flex-grow">
        <li className="my-4">
          <Link to="/dashboard" className={`flex items-center text-white text-base sidebar-item ${minimized ? 'pl-2' : 'pl-4'} hover:text-gray-400`} onClick={() => setMinimized(true)}>
            <FaHome className={`mr-2 ${minimized ? 'ml-3' : 'mr-4'}`} /> {!minimized && <span>Dashboard</span>}
          </Link>
        </li>
        <li className="my-10">
          <Link to="/barangjadi" className={`flex items-center text-white text-base sidebar-item ${minimized ? 'pl-2' : 'pl-4'} hover:text-gray-400`} onClick={() => setMinimized(true)}>
            <FaBox className={`mr-2 ${minimized ? 'ml-3' : 'mr-4'}`} /> {!minimized && <span>Stock Barang Jadi</span>}
          </Link>
        </li>
        <li className="my-10">
          <Link to="/stock-barang-mentah" className={`flex items-center text-white text-base sidebar-item ${minimized ? 'pl-2' : 'pl-4'} hover:text-gray-400`} onClick={() => setMinimized(true)}>
            <FaCubes className={`mr-2 ${minimized ? 'ml-3' : 'mr-4'}`} /> {!minimized && <span>Stock Barang Mentah</span>}
          </Link>
        </li>
        <li className="my-10">
          <Link to="/riwayat" className={`flex items-center text-white text-base sidebar-item ${minimized ? 'pl-2' : 'pl-4'} hover:text-gray-400`} onClick={() => setMinimized(true)}>
            <FaHistory className={`mr-2 ${minimized ? 'ml-3' : 'mr-4'}`} /> {!minimized && <span>Riwayat</span>}
          </Link>
        </li>
        <li className="my-10">
          <Link to="/logout" className={`flex items-center text-white text-base sidebar-item ${minimized ? 'pl-2' : 'pl-4'} hover:text-gray-400`} onClick={() => setMinimized(true)}>
            <FaSignOutAlt className={`mr-2 ${minimized ? 'ml-3' : 'mr-4'}`} /> {!minimized && <span>Logout</span>}
          </Link>
        </li>
      </ul>
      {window.innerWidth <= 768 && !minimized && (
        <div className="p-4">
          <button className="bg-blue-200 text-main btn btn-blue py-2 rounded" onClick={() => setMinimized(true)}>
            <FaBars />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

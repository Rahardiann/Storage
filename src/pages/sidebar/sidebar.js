import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaCubes,
  FaHistory,
  FaSignOutAlt,
  FaBars,
  FaChevronDown,
  FaChevronUp,
  FaAddressBook,
} from "react-icons/fa";
import Logosidebar from "../../assets/logo.png";
import { FaPerson } from "react-icons/fa6";

const Sidebar = () => {
  const [minimized, setMinimized] = useState(window.innerWidth <= 768);
  const [masterOpen, setMasterOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMinimized(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMaster = () => {
    setMasterOpen(!masterOpen);
  };

  return (
    <div
      className={`flex flex-col h-screen ${
        minimized ? "w-16" : "w-64"
      } bg-white transition-all ease-in-out duration-300`}
      style={{
        maxWidth: minimized && window.innerWidth <= 768 ? "50px" : "220px",
      }}
    >
      <div className="p-3">
        <img
          src={Logosidebar}
          alt="Logo"
          className={`size-32 w-full ${minimized ? "mx-auto" : "mt-8"}`}
        />
      </div>
      <ul className="flex-grow">
        <li className="my-4">
          <Link
            to="/dashboard"
            className={`flex items-center text-main text-base sidebar-item ${
              minimized ? "pl-2" : "pl-4"
            } hover:text-gray-400`}
            onClick={() => setMinimized(window.innerWidth <= 768)}
          >
            <FaHome className={`ml-2 ${minimized ? "ml-3" : "mr-4"}`} />{" "}
            {!minimized && <span>Dashboard</span>}
          </Link>
        </li>
        <li className="my-10">
          <Link
            to="/barangjadi"
            className={`flex items-center text-main text-base sidebar-item ${
              minimized ? "pl-2" : "pl-4"
            } hover:text-gray-400`}
            onClick={() => setMinimized(window.innerWidth <= 768)}
          >
            <FaPerson className={`ml-2 ${minimized ? "ml-3" : "mr-4"}`} />{" "}
            {!minimized && <span>Patient</span>}
          </Link>
        </li>
        <li className="my-10">
          <Link
            to="/barangmentah"
            className={`flex items-center text-main text-base sidebar-item ${
              minimized ? "pl-2" : "pl-4"
            } hover:text-gray-400`}
            onClick={() => setMinimized(window.innerWidth <= 768)}
          >
            <FaAddressBook className={`ml-2 ${minimized ? "ml-3" : "mr-4"}`} />{" "}
            {!minimized && <span>Booking</span>}
          </Link>
        </li>
        <li className="my-10">
          <div className="relative">
            <button
              className={`flex items-center text-main text-base sidebar-item ${
                minimized ? "pl-2" : "pl-4"
              } hover:text-gray-400`}
              onClick={toggleMaster}
            >
              <FaBox className={`ml-2 ${minimized ? "ml-3" : "mr-4"}`} />
              {!minimized && <span>Dentist & Promo</span>}
              <span className="absolute right-0 top-0 bottom-0 flex items-center pr-4">
                {masterOpen ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            <ul
              className={`absolute left-full top-0 mt-1 ml-4 bg-gray-200 shadow-lg rounded-md ${
                masterOpen ? "block" : "hidden"
              }`}
            >
              
              <li>
                <Link
                  to="/Master/MasterBarangjadi"
                  className="block px-4 py-4 text-sm text-main hover:bg-gray-100"
                >
                  Dentist
                </Link>
              </li>
              <li>
                <Link
                  to="/Master/MasterBarangmentah"
                  className="block px-4 py-4 text-sm text-main hover:bg-gray-100"
                >
                  Promo
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="my-10">
          <Link
            to="/riwayat"
            className={`flex items-center text-main text-base sidebar-item ${
              minimized ? "pl-2" : "pl-4"
            } hover:text-gray-400`}
            onClick={() => setMinimized(window.innerWidth <= 768)}
          >
            <FaHistory className={`ml-2 ${minimized ? "ml-3" : "mr-4"}`} />{" "}
            {!minimized && <span>Riwayat</span>}
          </Link>
        </li>
        <li className="my-10">
          <Link
            to="/logout"
            className={`flex items-center text-main text-base sidebar-item ${
              minimized ? "pl-2" : "pl-4"
            } hover:text-gray-400`}
            onClick={() => setMinimized(window.innerWidth <= 768)}
          >
            <FaSignOutAlt className={`ml-2 ${minimized ? "ml-3" : "mr-4"}`} />{" "}
            {!minimized && <span>Logout</span>}
          </Link>
        </li>
      </ul>
      {window.innerWidth <= 768 && !minimized && (
        <div className="p-4">
          <button
            className="bg-blue-200 text-main btn btn-blue py-2 rounded"
            onClick={() => setMinimized(window.innerWidth <= 768)}
          >
            <FaBars />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

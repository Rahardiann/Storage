import { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import axios from "../../config/axiosConfig";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import DeleteIcon from "@material-ui/icons/Delete";

const Dashboard = () => {
  const [stok, setStok] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [nama, setNama] = useState("");
  const [no_hp, setNohp] = useState("");
  const [gender, setGender] = useState("");
  const [id, setIDDentist] = useState("");
  const [email, setEmail] = useState("");
  const [showFormedit, setShowFormedit] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [password, setPassword] = useState("");
  const [manualUserCount, setManualUserCount] = useState(0);
  const [digitalUserCount, setDigitalUserCount] = useState(0);

  const handleCloseFormEdit = () => {
    setShowFormedit(false);
  };

  const handleUpdateBarang = async () => {
    const updatedBarang = {
      nama: nama,
      no_hp: no_hp,
      email: email,
    };
  
    try {
      const response = await axios.put(`/admin/${editingId}`, updatedBarang);
      const updatedData = response.data.data; // Pastikan respons data di sini sesuai dengan API Anda
      setStok((prevStok) =>
        prevStok.map((item) =>
          item.id === editingId ? { ...item, ...updatedData } : item
        )
      );
      setShowFormedit(false);
      resetForm();
    } catch (error) {
      console.error("Gagal mengupdate barang:", error);
    }
  };
  

  const resetForm = () => {
    setNama("");
    setNohp("");
    setEmail("");
    setPassword("");
    setEditingId(null);
  };

  const handleEditBarang = async (id) => {
    try {
      const response = await axios.get(`/admin/2/${id}`);
      const barang = response.data.data[0];

      setEmail(barang.email);
      setNama(barang.nama);
      setNohp(barang.no_hp);
      setEditingId(id);
      setShowFormedit(true);
    } catch (error) {
      console.error("Gagal mengambil barang:", error);
    }
  };

  const handleDeleteBarang = async (id) => {
    try {
      await axios.delete(`/admin/${id}`);
      setStok((prevStok) => prevStok.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Gagal menghapus barang:", error);
    }
  };

  const handleAddBarang = async () => {
    const newBarang = {
      email: email,
      password: password,
      nama: nama,
      no_hp: no_hp,
    };
  
    try {
      const response = await axios.post("/admin/register", newBarang);
      const addedData = response.data.data; // Pastikan respons data di sini sesuai dengan API Anda
      setStok((prevStok) => [...prevStok, addedData]); // Tambahkan data baru ke state stok
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error("Gagal menambahkan admin:", error);
    }
  };
  

  const handleShowForm = () => {
    resetForm();
    setShowForm(true);
  };

  const calculateUserCounts = (users) => {
    let digitalCount = 0;
    let primitiveCount = 0;

    users.forEach((user) => {
      if (user.id === user.id_login) {
        digitalCount++;
      } else {
        primitiveCount++;
      }
    });

    setDigitalUserCount(digitalCount);
    setManualUserCount(primitiveCount);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUser = await axios.get("/user/");
        const responseAdmin = await axios.get("/admin/");
        setStok(responseAdmin.data.data);
        calculateUserCounts(responseUser.data.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8 lg:p-12 xl:p-16">
          <div className="bg-second p-4 md:p-8 lg:p-12 xl:p-16 rounded shadow-lg">
            <div className="text-left text-4xl text-black">
              <h1 className="font-bold">Hello! Welcome 👋</h1>
            </div>
            <div className="text-left text-xl text-black">
              <h1 className="mt-2">
                Welcome to the Sarlita Dental Care admin website
              </h1>
            </div>
          </div>
        </div>

        <div className="ml-24 text-2xl text-main">
          <h1 className="font-bold">User Overview</h1>
        </div>

        <div className="ml-16 mt-8 flex flex-wrap">
          <div className="bg-third w-72 h-36 rounded-lg p-6 flex flex-col items-center justify-center mr-8 mb-8">
            <h1 className="text-lg font-semibold text-white mb-4">User By Apps</h1>
            <h1 className="text-5xl font-bold text-white">{digitalUserCount}</h1>
          </div>
          <div className="bg-third w-72 h-36 rounded-lg p-6 flex flex-col items-center justify-center mr-8 mb-8">
            <h1 className="text-lg font-semibold text-white mb-4">User By Non-Apps</h1>
            <h1 className="text-5xl font-bold text-white">{manualUserCount}</h1>
          </div>
        </div>

        <div className="ml-24 mt-4 flex justify-between items-center">
          <h1 className="text-2xl text-main font-bold">Admin List</h1>
          <button
            onClick={handleShowForm}
            className="bg-main hover:bg-second hover:text-main text-white mr-8 font-bold py-2 px-16 rounded"
          >
            Add
          </button>
        </div>

        <div className="overflow-x-auto ml-16 mr-8 mt-8">
          <table className="table-auto min-w-max w-full border-gray-500">
            <thead className="bg-second text-gray-500">
              <tr>
                <th className=" border-gray-500 px-4 py-2 w-32 ">ID Admin</th>
                <th className=" border-gray-500 px-4 py-2">Nama</th>
                <th className=" border-gray-500 px-4 py-2">Nomor Telepon</th>
                <th className=" border-gray-500 px-4 py-2">Email</th>
                <th className=" border-gray-500 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {stok.map((item, index) => (
                <tr className="bg-second" key={index}>
                  <td className=" text-center border-gray-500 px-2 py-2">
                    A00{index + 1}
                  </td>
                  <td className=" text-center border-gray-500 px-4 py-2">
                    {item.nama}
                  </td>
                  <td className=" text-center border-gray-500 px-4 py-2">
                    {item.no_hp}
                  </td>
                  <td className=" text-center border-gray-500 px-4 py-2">
                    {item.email}
                  </td>
                  <td className=" border-gray-500 text-center py-2">
                    <button
                      onClick={() => handleEditBarang(item.id)}
                      className="text-blue-500"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => handleDeleteBarang(item.id)}
                      className="text-red-500 ml-2"
                    >
                      <DeleteIcon />
                    </button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showFormedit && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg max-w-3xl w-full">
            <div className="bg-main text-white font-bold rounded-t-lg px-4 py-3 relative">
              Edit Admin
              <button
                onClick={handleCloseFormEdit}
                className="absolute top-0 right-0 m-2 text-gray-300 font-bold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.293 5.293a1 1 0 00-1.414 1.414L10 10.414l-2.879-2.88a1 1 0 10-1.414 1.415L8.586 12 5.707 14.879a1 1 0 101.414 1.414L10 13.415l2.879 2.88a1 1 0 001.414-1.415L11.414 12l2.879-2.88a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="bg-gray-100 shadow-lg py-4 rounded-lg p-4">
              <input
                type=""
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama Admin"
                className="border border-gray-400 p-2 rounded mb-2 w-full mr-2"
              />
              <input
                type="number"
                value={no_hp}
                onChange={(e) => setNohp(e.target.value)}
                placeholder="Phone Number"
                className="border border-gray-400 p-2 rounded mb-2 w-full mr-2"
              />
              <input
                type=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border border-gray-400 p-2 rounded mb-2 w-full mr-2"
              />
              <button
                onClick={handleUpdateBarang}
                className="bg-main  text-white font-bold rounded py-2 px-4 mt-4 w-full"
              >
                Update
              </button>
            </div>
          </div>
        )}

        {showForm && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg max-w-3xl w-full">
            <div className="bg-main text-white font-bold rounded-t-lg px-4 py-3 relative">
              Add Admin
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-0 right-0 m-2 text-gray-300 font-bold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.293 5.293a1 1 0 00-1.414 1.414L10 10.414l-2.879-2.88a1 1 0 10-1.414 1.415L8.586 12 5.707 14.879a1 1 0 101.414 1.414L10 13.415l2.879 2.88a1 1 0 001.414-1.415L11.414 12l2.879-2.88a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="bg-gray-100 shadow-lg py-4 rounded-lg p-4">
              <input
                type=""
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama"
                className="border border-gray-400 p-2 rounded mb-2 w-full mr-2"
              />
              <input
                type="number"
                value={no_hp}
                onChange={(e) => setNohp(e.target.value)}
                placeholder="Nomor Telepon"
                className="border border-gray-400 p-2 rounded mb-2 w-full mr-2"
              />
              <input
                type=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border border-gray-400 p-2 rounded mb-2 w-full mr-2"
              />
              <input
                type=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="border border-gray-400 p-2 rounded mb-2 w-full mr-2"
              />
              <button
                onClick={handleAddBarang}
                className="bg-main  text-white font-bold rounded py-2 px-4 mt-4 w-full"
              >
                Tambah Barang
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

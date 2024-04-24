import {useEffect, useState} from 'react';
import Sidebar from '../sidebar/sidebar';
import axios from '../../config/axiosConfig';
import React from 'react';
import EditIcon from "@material-ui/icons/Edit";

const Dashboard = () => {
  const [stok, setStok] = useState([
    {
      id: 1,
      NamaDentist: "Herr Muller",
      spesialist: "0823726372674",
      email: "hadi@gmail.cok"
    },

    // Tambahkan data dummy sesuai kebutuhan
  ]);
  const [bjadi, setBjadi] = useState([])
  const [bmentah, setBmentah] = useState([])
  const [stat, setStat] = useState([])
  const [merge, setMerge] = useState([])
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupImageSrc, setPopupImageSrc] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [kategoriBarang, setKategoriBarang] = useState("");
  const [namadentist, setNamaDentist] = useState("");
  const [jumlahBarang, setJumlahBarang] = useState("");
  const [fotoBarang, setFotoBarang] = useState("");
  const [listBarang, setListBarang] = useState([]);
  const [kodebarang, setKodebarang] = useState("");
  const [spesialist, setSpesialist] = useState("");
  const [id, setIDDentist] = useState("");
  const [email, setEmail] = useState("");

  const handleAddBarang = () => {
    const newBarang = {
      kategori: kategoriBarang,
      nama: namadentist,
      jumlah: jumlahBarang,
      foto: fotoBarang,
      spesialist: spesialist,
      id: id,
      email: email
    };

    setEmail("");
    setIDDentist("");
    setListBarang((prevList) => [...prevList, newBarang]);
    setShowForm(false);
    // Reset form input
    setKategoriBarang("");
    setNamaDentist("");
    setJumlahBarang("");
    setFotoBarang("");
    setSpesialist("");

    axios
      .post("/master/", newBarang)
      .then((response) => {
        console.log("Data berhasil ditambahkan:", response.data);
      })
      .catch((error) => {
        console.error("Gagal menambahkan data:", error);
        // Handle error jika perlu
      });
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/bjadi/")
        setBjadi(response.data.data)

        const response1 = await axios.get("/bmentah/")
        setBmentah(response1.data.data)

        const response2 = await axios.get("/statistik/")
        const uniqueMonths = new Set();
        const flattenedStat = response2.data.data.flat().reduce((acc, item) => {
          if (!uniqueMonths.has(item.bulan)) {
            uniqueMonths.add(item.bulan); // Add the month to the set
            acc.push({ ...item });
          }
          return acc;
        }, []);

        setStat(flattenedStat);

        console.log(stat)  
      } catch (err) {
        console.log(err)
      }
    }
    fetch()
  }, [])
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

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
            <h1 className="text-lg font-semibold text-white mb-4">
              ManualUser
            </h1>
            <h1 className="text-5xl font-bold text-white">190</h1>
          </div>
          <div className="bg-third w-72 h-36 rounded-lg p-6 flex flex-col items-center justify-center mr-8 mb-8">
            <h1 className="text-lg font-semibold text-white mb-4">
              ModernUser
            </h1>
            <h1 className="text-5xl font-bold text-white">45</h1>
          </div>
          <div className="bg-third w-72 h-36 rounded-lg p-6 flex flex-col items-center justify-center mr-8 mb-8">
            <h1 className="text-lg font-semibold text-white mb-4">
              DigitalUser
            </h1>
            <h1 className="text-5xl font-bold text-white">59</h1>
          </div>
          <div className="bg-third w-72 h-36 rounded-lg p-6 flex flex-col items-center justify-center mr-8 mb-8">
            <h1 className="text-lg font-semibold text-white mb-4">Admin</h1>
            <h1 className="text-5xl font-bold text-white">12</h1>
          </div>
        </div>

        <div className="ml-24 mt-4 flex justify-between items-center">
          <h1 className="text-2xl text-main font-bold">Admin List</h1>
          <button
            onClick={() => setShowForm(true)}
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
                <th className=" border-gray-500 px-4 py-2">Nama Admin</th>
                <th className=" border-gray-500 px-4 py-2">Phone Number</th>
                <th className=" border-gray-500 px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {stok.map((item, index) => (
                <tr className="bg-second">
                  <td className=" text-center border-gray-500 px-2 py-2">
                    {item.id}
                  </td>
                  <td className=" text-center border-gray-500 px-4 py-2">
                    {item.NamaDentist}
                  </td>
                  <td className=" text-center border-gray-500 px-4 py-2">
                    {item.spesialist}
                  </td>
                  <td className=" text-center border-gray-500 px-4 py-2">
                    {item.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Form Input */}
        {showForm && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg max-w-3xl w-full">
            {/* Header Form */}
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
            {/* Body Form */}
            <div className="bg-gray-100 shadow-lg py-4 rounded-lg p-4">
              {/* Bagian kategori */}
              <input
                type="number"
                value={id}
                onChange={(e) => setIDDentist(e.target.value)}
                placeholder="ID Admin"
                className="border border-gray-400 p-2 rounded mb-2 w-full mr-2"
              />
              {/* Bagian kategori */}
              <input
                type=""
                value={namadentist}
                onChange={(e) => setNamaDentist(e.target.value)}
                placeholder="Nama Admin"
                className="border border-gray-400 p-2 rounded mb-2 w-full mr-2"
              />
              {/* Bagian kategori */}
              <input
                type="number"
                value={spesialist}
                onChange={(e) => setSpesialist(e.target.value)}
                placeholder="Phone Number"
                className="border border-gray-400 p-2 rounded mb-2 w-full mr-2"
              />

              {/* Bagian kategori */}
              <input
                type=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
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

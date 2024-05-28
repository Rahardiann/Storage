import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import axios from "../../config/axiosConfig";
import PopupImage from "../../assets/login.png";
import EditIcon from "@material-ui/icons/Edit";

function Stokbarangmentah() {
  const [stok, setStok] = useState([]);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupImageSrc, setPopupImageSrc] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [kategoriBarang, setKategoriBarang] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [jumlahBarang, setJumlahBarang] = useState("");
  const [fotoBarang, setFotoBarang] = useState("");
  const [listBarang, setListBarang] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dentist, setDentist] = useState("");

  const handleAddBarang = () => {
    const newBarang = {
      kategori: kategoriBarang,
      nama: namaBarang,
      date: date,
      time: time,
      dentist: dentist,
      jumlahBarang: jumlahBarang,
    };

    setListBarang((prevList) => [...prevList, newBarang]);
    setShowForm(false);
    // Reset form input
    setKategoriBarang("");
    setNamaBarang("");
    setJumlahBarang("");
    setDate("");
    setTime("");
    setDentist("");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFotoBarang(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/booking/all");
        setStok(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []); 

  
  const handleShowImagePopup = (imageSrc) => {
    setPopupImageSrc(imageSrc);
    setShowImagePopup(true);
  };

  const handleCloseImagePopup = () => {
    setShowImagePopup(false);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="p-8 w-screen overflow-auto">
        {/* Konten Stokbarangjadi */}
        <div>
          <h1 className="font-sans text-2xl text-third font-bold mb-20">
            Booking
          </h1>
          <div className="flex justify-between mb-4">
            <button
              onClick={() => setShowForm(true)}
              className="bg-main hover:bg-blue-200 text-white font-bold rounded-3xl mr-4 w-40 h-10"
            >
              ADD
            </button>
            <input
              type="text"
              placeholder="Cari barang..."
              className="border border-gray-400 p-2 rounded-5 w-80"
            />
          </div>

          {/* Form Input */}
          {showForm && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg max-w-3xl w-full">
              {/* Header Form */}
              <div className="bg-main text-white font-bold rounded-t-lg px-4 py-3 relative">
                Tambah Booking
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
                {/* Dropdown ID User */}
                <input
                  type="number"
                  value={kategoriBarang}
                  onChange={(e) => setKategoriBarang(e.target.value)}
                  placeholder="ID User"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />

                {/* Dropdown Username */}
                <input
                  type="text"
                  value={namaBarang}
                  onChange={(e) => setNamaBarang(e.target.value)}
                  placeholder="Username"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />

                {/* Dropdown Tanggal */}
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />

                {/* Dropdown Kategori Barang */}
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                >
                  <option value="" disabled>
                    Time
                  </option>
                  <option value="kategori1">09 : 00</option>
                  <option value="kategori2">10 : 00</option>
                  <option value="kategori3">12 : 00</option>
                </select>
                {/* Dropdown Nama Barang */}
                <select
                  value={dentist}
                  onChange={(e) => setDentist(e.target.value)}
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                >
                  <option value="" disabled>
                    Dentist
                  </option>
                  <option value="barang1">Herr Muller</option>
                  <option value="barang2">Frau Welder</option>
                  <option value="barang3">Frau Ritter</option>
                </select>
                
                <button
                  onClick={handleAddBarang}
                  className="bg-main  text-white font-bold rounded py-2 px-4 mt-4 w-full"
                >
                  Tambah Barang
                </button>
              </div>
            </div>
          )}

          {/* Tabel dengan Data */}
          <div className="overflow-x-auto">
            <table className="table-auto  w-full">
              <thead className="bg-second text-gray-500">
                <tr>
                  <th className=" border-gray-500 px-4 py-2 w-32">ID User</th>
                  <th className=" border-gray-500 px-4 py-2 w-38">Username</th>
                  <th className=" border-gray-500 px-4 py-2 w-32">No MR</th>
                  <th className=" border-gray-500 px-4 py-2 ">Time</th>
                  <th className=" border-gray-500 px-4 py-2">Date</th>
                  <th className=" border-gray-500 px-4 py-2">Dentist</th>
                  <th className=" border-gray-500 px-4 py-2 w-24">Action</th>
                </tr>
              </thead>
              <tbody>
                {stok.map((item, index) => (
                  <tr key={index} className="bg-second">
                    <td className="text-center border-gray-500 px-2 py-2">
                      {item.id_user} 
                    </td>
                    <td className="text-center border-gray-500 px-4 py-2">
                      {item.user.nama}
                    </td>
                    <td className="text-center border-gray-500 px-4 py-2">
                      {item.user.no_rekam_medis}
                    </td>
                    <td className="text-center border-gray-500 px-4 py-2">
                      {item.date}
                    </td>
                    <td className="text-center border-gray-500 px-4 py-2">
                      {item.tanggal_pemesanan}
                    </td>
                    <td className="text-center border-gray-500 px-4 py-2">
                      {item.dokter.nama}
                    </td> 

                    <td className=" border-gray-500 text-center py-2">
                      <button
                        onClick={() => setShowForm(true)}
                        className="text-blue-500"
                      >
                        <EditIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pop-up Image */}
      {showImagePopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg">
            <button
              onClick={handleCloseImagePopup}
              className="absolute top-0 right-0 p-2 m-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
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

            <img src={PopupImage} alt="" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Stokbarangmentah;

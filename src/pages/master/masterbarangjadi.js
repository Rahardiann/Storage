import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import axios from "../../config/axiosConfig";
import PopupImage from "../../assets/login.png";

function Masterbarangjadi() {
  const [stok, setStok] = useState([]);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupImageSrc, setPopupImageSrc] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [kategoriBarang, setKategoriBarang] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [jumlahBarang, setJumlahBarang] = useState("");
  const [fotoBarang, setFotoBarang] = useState("");
  const [listBarang, setListBarang] = useState([]);

  const handleAddBarang = () => {
    const newBarang = {
      kategori: kategoriBarang,
      nama: namaBarang,
      jumlah: jumlahBarang,
      foto: fotoBarang,
    };

    setListBarang((prevList) => [...prevList, newBarang]);
    setShowForm(false);
    // Reset form input
    setKategoriBarang("");
    setNamaBarang("");
    setJumlahBarang("");
    setFotoBarang("");
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
        const response = await axios.get("/bjadi/");
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
          <h1 className="font-sans text-2xl font-bold mb-20">
            MASTER BARANG JADI
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
                Master Barang Jadi
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
                
                {/* Bagian Kode */}
                <div className="flex">
                  <input
                    type=""
                    value={jumlahBarang}
                    onChange={(e) => setJumlahBarang(e.target.value)}
                    placeholder="Kode"
                    className="border border-gray-400 p-2 rounded mb-2 w-full mr-2"
                  />

                {/* Dropdown Kategori Barang */}
                <select
                  value={kategoriBarang}
                  onChange={(e) => setKategoriBarang(e.target.value)}
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                >
                  <option value="" disabled>
                    Pilih Kategori Barang
                  </option>
                  <option value="kategori1">Kategori 1</option>
                  <option value="kategori2">Kategori 2</option>
                  <option value="kategori3">Kategori 3</option>
                </select>
                </div>
                 {/* Bagian kategori */}
                 <input
                    type=""
                    value={namaBarang}
                    onChange={(e) =>setNamaBarang(e.target.value)}
                    placeholder="Nama Barang"
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

          {/* Tabel dengan Data */}
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-500 w-full">
              <thead className="bg-main text-white">
                <tr>
                  <th className="border border-gray-500 px-4 py-2 ">
                    Kode
                  </th>
                  <th className="border border-gray-500 px-4 py-2">Nama Kategori</th>
                  <th className="border border-gray-500 px-4 py-2">Nama Barang</th>
                </tr>
              </thead>
              <tbody>
                {stok.map((item, index) => (
                  <tr key={index}>
                    <td className="border text-center border-gray-500 px-2 py-2">
                      {index + 1}
                    </td>
                    <td className="border text-center border-gray-500 px-4 py-2">
                      {item.nm_bjadi}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Masterbarangjadi;

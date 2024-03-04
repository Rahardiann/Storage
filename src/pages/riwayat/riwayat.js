import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import axios from "../../config/axiosConfig";
import { FaTrash } from "react-icons/fa";


function Riwayat() {
  const [stok, setStok] = useState([]);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupImageSrc, setPopupImageSrc] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [kategoriBarang, setKategoriBarang] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [jumlahBarang, setJumlahBarang] = useState("");
  const [fotoBarang, setFotoBarang] = useState("");
  const [listBarang, setListBarang] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDeleteIndex, setItemToDeleteIndex] = useState(null);

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

  const handleDelete = (index) => {
    setItemToDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    // Implement deletion logic here
    setShowDeleteModal(false);
    setItemToDeleteIndex(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setItemToDeleteIndex(null);
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
            Riwayat Keluar Masuk Barang
          </h1>
          <div className="flex justify-between mb-4">
            
            <input
              type="text"
              placeholder="Cari barang..."
              className="border border-gray-400 p-2 rounded-5 w-80"
            />
          </div>

         

          {/* Tabel dengan Data */}
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-500 w-full">
              <thead className="bg-main text-white">
                <tr>
                  <th className="border border-gray-500 px-4 py-2 w-12">
                    Kode
                  </th>
                  <th className="border border-gray-500 px-4 py-2">
                    Nama Barang Mentah
                  </th>
                  <th className="border border-gray-500 px-4 py-2">Jumlah</th>
                  <th className="border border-gray-500 px-4 py-2">Date</th>
                  <th className="border border-gray-500 px-4 py-2">Total</th>
                  <th className="border border-gray-500 px-4 py-2 w-20">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {stok.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-500 px-2 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-500 px-4 py-2">
                      {item.nm_bjadi}
                    </td>
                    <td className="border border-gray-500 px-4 py-2">
                      {item.jml_bjadi}
                    </td>
                    <td className="border border-gray-500 px-8 py-2">
                      19 januari
                    </td>
                    <td className="border border-gray-500 px-2 ">20.000</td>
                    <td className="border border-gray-500 px-8 py-2">
                    <button onClick={() => handleDelete(index)}>
                        <FaTrash className="text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
       {/* Delete Confirmation Modal */}
       {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <p className="mb-6">Apakah Anda yakin ingin menghapus data ini?</p>
            <div className="flex justify-between">
              <button onClick={handleConfirmDelete} className="bg-green-500 text-white px-4 py-2 rounded">
                Ya
              </button>
              <button onClick={handleCancelDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Riwayat;

import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/sidebar';
import axios from '../../config/axiosConfig';
import PopupImage from '../../assets/login.png';

function Stokbarangjadi() {
  const [stok, setStok] = useState([]);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupImageSrc, setPopupImageSrc] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [kategoriBarang, setKategoriBarang] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [jumlahBarang, setJumlahBarang] = useState('');
  const [fotoBarang, setFotoBarang] = useState('');
  const [listBarang, setListBarang] = useState([]);

  const handleAddBarang = () => {
    const newBarang = {
      kategori: kategoriBarang,
      nama: namaBarang,
      jumlah: jumlahBarang,
      foto: fotoBarang
    };

    setListBarang(prevList => [...prevList, newBarang]);
    setShowForm(false);
    // Reset form input
    setKategoriBarang('');
    setNamaBarang('');
    setJumlahBarang('');
    setFotoBarang('');
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(/bjadi/);
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
          <h1 className="font-sans text-2xl font-bold mb-20">Stok Barang Jadi</h1>
          <div className="flex justify-between mb-4">
            <button onClick={() => setShowForm(true)} className="bg-main hover:bg-blue-200 text-white font-bold rounded-3xl mr-4 w-40 h-10">
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
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-main p-8 rounded-lg">
            <button onClick={() => setShowForm(false)} className="absolute top-0 right-0 p-2 m-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.293 5.293a1 1 0 00-1.414 1.414L10 10.414l-2.879-2.88a1 1 0 10-1.414 1.415L8.586 12 5.707 14.879a1 1 0 101.414 1.414L10 13.415l2.879 2.88a1 1 0 001.414-1.415L11.414 12l2.879-2.88a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input type="text" value={kategoriBarang} onChange={e => setKategoriBarang(e.target.value)} placeholder="Kategori barang" className="border border-gray-400 p-2 rounded mb-2 w-full" />
                <input type="text" value={namaBarang} onChange={e => setNamaBarang(e.target.value)} placeholder="Nama barang" className="border border-gray-400 p-2 rounded mb-2 w-full" />
              </div>
              <div>
                <input type="number" value={jumlahBarang} onChange={e => setJumlahBarang(e.target.value)} placeholder="Jumlah barang" className="border border-gray-400 p-2 rounded mb-2 w-full" />
                <input type="text" value={fotoBarang} onChange={e => setFotoBarang(e.target.value)} placeholder="URL Foto barang" className="border border-gray-400 p-2 rounded mb-2 w-full" />
              </div>
            </div>
            <button onClick={handleAddBarang} className="bg-main hover:bg-blue-600 text-white font-bold rounded py-2 px-4 mt-4 w-full">Tambah Barang</button>
          </div>
        )}

          {/* Tabel dengan Data */}
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-500 w-full">
              <thead className="bg-main text-white">
                <tr>
                  <th className="border border-gray-500 px-4 py-2 w-12">Nomer</th>
                  <th className="border border-gray-500 px-4 py-2">Nama</th>
                  <th className="border border-gray-500 px-4 py-2">Jumlah</th>
                  <th className="border border-gray-500 px-4 py-2 w-20">Info</th>
                </tr>
              </thead>
              <tbody>
                {stok.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-500 px-2 py-2">{index + 1}</td>
                    <td className="border border-gray-500 px-4 py-2">{item.nm_bjadi}</td>
                    <td className="border border-gray-500 px-4 py-2">{item.jml_bjadi}</td>
                    <td className="border border-gray-500 px-8 py-2">
                      <button onClick={() => handleShowImagePopup(item.imageSrc)} className="text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-5a1 1 0 112 0v-1a1 1 0 11-2 0v1zm0-4.5a1 1 0 112 0V12a1 1 0 11-2 0v-3.5z" clipRule="evenodd" />
                        </svg>
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
        
            <button onClick={handleCloseImagePopup} className="absolute top-0 right-0 p-2 m-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.293 5.293a1 1 0 00-1.414 1.414L10 10.414l-2.879-2.88a1 1 0 10-1.414 1.415L8.586 12 5.707 14.879a1 1 0 101.414 1.414L10 13.415l2.879 2.88a1 1 0 001.414-1.415L11.414 12l2.879-2.88a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </button>
        
            <img src={PopupImage} alt="" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Stokbarangjadi;
import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/sidebar';
import axios from '../../config/axiosConfig'

function Stokbarangjadi() {

  const [stok, setStok] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`/bjadi/`)
        setStok(response.data.data)
        console.log()
      } catch (err) {
        console.log(err)
      }
    }
    fetch()
  }, [])

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="p-8 w-screen overflow-auto">
        {/* Konten Stokbarangjadi */}
        <div>
          <h1 className="font-sans text-2xl font-bold mb-20">Stok Barang Jadi</h1>

       
          {/* Tombol Tambah */}
          <div className="flex justify-between mb-4">
            <button className="bg-main hover:bg-blue-200 text-white font-bold rounded-3xl mr-4 w-40 h-10">
              ADD
            </button>
            <input
              type="text"
              placeholder="Cari barang..."
              className="border border-gray-400 p-2 rounded-5 w-80"
            />
          </div>

          {/* Tabel dengan Data */}
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border  border-gray-500 w-full">
              <thead className="bg-main text-white">
                <tr>
                  <th className="border border-gray-500 px-4 py-2">Nomer</th>
                  <th className="border border-gray-500 px-4 py-2">Nama</th>
                  <th className="border border-gray-500 px-4 py-2">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {stok.map((item, index) => (
                  <tr>
                  <td className="border border-gray-500 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-500 px-4 py-2">{item.nm_bjadi}</td>
                  <td className="border border-gray-500 px-4 py-2">{item.jml_bjadi}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stokbarangjadi;

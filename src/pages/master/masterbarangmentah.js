import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import axios from "../../config/axiosConfig";
import PopupImage from "../../assets/login.png";

function MasterBarangMentah() {
  const [stok, setStok] = useState([]);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupImageSrc, setPopupImageSrc] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [kategoriBarang, setKategoriBarang] = useState("");
  const [judul, setJudul] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [gambar, setGambar] = useState("");
  const [deskripsi_1, setDeskripsi1] = useState("");
  const [deskripsi_2, setDeskripsi2] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [id, setId] = useState(null);

  const handleAddBarang = () => {
    const newBarang = {
      kategori: kategoriBarang,
      judul: judul,
      subtitle: subtitle,
      gambar: gambar,
      deskripsi_1: deskripsi_1,
      deskripsi_2: deskripsi_2,
    };

    if (editingIndex !== null) {
      const updatedList = [...stok];
      updatedList[editingIndex] = newBarang;
      setStok(updatedList);
      axios.put(`/promo/${id}`, newBarang)
        .then(response => {
          console.log('Data berhasil diupdate:', response.data);
        })
        .catch(error => {
          console.error('Gagal mengupdate data:', error);
        });
    } else {
      axios.post('/promo/', newBarang)
        .then(response => {
          console.log('Data berhasil ditambahkan:', response.data);
          setStok(prevList => [...prevList, response.data]);
        })
        .catch(error => {
          console.error('Gagal menambahkan data:', error);
        });
    }

    setShowForm(false);
    resetForm();
  };

  const handleEditBarang = (index) => {
    const barang = stok[index];
    setId(barang.id);
    setKategoriBarang(barang.kategori);
    setJudul(barang.judul);
    setSubtitle(barang.subtitle);
    setGambar(barang.gambar);
    setDeskripsi1(barang.deskripsi_1);
    setDeskripsi2(barang.deskripsi_2);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDeleteBarang = (index) => {
    const barang = stok[index];
    axios.delete(`/promo/${barang.id}`)
      .then(response => {
        console.log('Data berhasil dihapus:', response.data);
        setStok(stok.filter((_, i) => i !== index));
      })
      .catch(error => {
        console.error('Gagal menghapus data:', error);
      });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setGambar(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setKategoriBarang("");
    setJudul("");
    setSubtitle("");
    setGambar("");
    setDeskripsi1("");
    setDeskripsi2("");
    setEditingIndex(null);
    setId(null);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/promo/");
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
        <div>
          <h1 className="font-sans text-2xl font-bold mb-20 text-third">
            Promo
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

          {showForm && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg max-w-3xl w-full">
              <div className="bg-main text-white font-bold rounded-t-lg px-4 py-3 relative">
                Master Barang Mentah
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
                <div className="flex">
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
                <input
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Nama Barang"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Sub Title"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />
                <input
                  type="text"
                  value={deskripsi_1}
                  onChange={(e) => setDeskripsi1(e.target.value)}
                  placeholder="Deskripsi 1"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />
                <input
                  type="text"
                  value={deskripsi_2}
                  onChange={(e) => setDeskripsi2(e.target.value)}
                  placeholder="Deskripsi 2"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />
                <button
                  onClick={handleAddBarang}
                  className="bg-main text-white font-bold rounded py-2 px-4 mt-4 w-full"
                >
                  {editingIndex !== null ? "Update Barang" : "Tambah Barang"}
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border-gray-500 w-full">
              <thead className="bg-second text-white">
                <tr>
                  <th className="border-gray-500 px-4 py-2">Title</th>
                  <th className="border-gray-500 px-4 py-2">Sub Title</th>
                  <th className="border-gray-500 px-4 py-2">Deskripsi 1</th>
                  <th className="border-gray-500 px-4 py-2">Deskripsi 2</th>
                  <th className="border-gray-500 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stok.map((item, index) => (
                  <tr key={index}>
                    <td className="border text-center border-gray-500 px-4 py-2">{item.judul}</td>
                    <td className="border text-center border-gray-500 px-4 py-2">{item.subtitle}</td>
                    <td className="border text-center border-gray-500 px-4 py-2">{item.deskripsi_1}</td>
                    <td className="border text-center border-gray-500 px-4 py-2">{item.deskripsi_2}</td>
                    <td className="border text-center border-gray-500 px-4 py-2">
                      <button
                        onClick={() => handleEditBarang(index)}
                        className="bg-blue-500 text-white font-bold py-1 px-2 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBarang(index)}
                        className="bg-red-500 text-white font-bold py-1 px-2 rounded"
                      >
                        Delete
                      </button>
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

export default MasterBarangMentah;

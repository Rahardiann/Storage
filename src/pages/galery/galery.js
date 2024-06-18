import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import axios from "../../config/axiosConfig";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";


function Gallery() {
  const [stok, setStok] = useState([]);
  const [timeAvailability, setTimeAvailability] = useState({});
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
  const [showFormedit, setShowFormedit] = useState(false);
  const [id, setIDDentist] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleCloseFormEdit = () => {
    setShowFormedit(false);
  };

  const handleAddBarang = () => {
    // Buat form data
    const formData = new FormData();
    formData.append('gambar', kategoriBarang);
  
    // Jika sedang mengedit, perbarui data yang ada
    if (editingIndex !== null) {
      const updatedList = [...listBarang];
      const newBarang = {
        gambar: kategoriBarang,
      };
      updatedList[editingIndex] = newBarang;
      setListBarang(updatedList);
      setEditingIndex(null);
  
      axios
        .put(`/dokter/${id}`, formData)
        .then((response) => {
          console.log("Data berhasil diupdate:", response.data);
        })
        .catch((error) => {
          console.error("Gagal mengupdate data:", error);
        });
    } else {
      // Jika menambahkan data baru
      setListBarang((prevList) => [...prevList, { gambar: kategoriBarang }]);
  
      axios
        .post("/gallery/", formData)
        .then((response) => {
          console.log("Data berhasil ditambahkan:", response.data);
        })
        .catch((error) => {
          console.error("Gagal menambahkan data:", error);
        });
    }
  
    // Reset form dan sembunyikan form
    setShowForm(false);
    setIDDentist("");
    setKategoriBarang("");
    setNamaDentist("");
    setJumlahBarang("");
    setFotoBarang("");
    setSpesialist("");
  };
  
  

  const handleEditBarang = (index) => {
    const barang = stok[index];
    setIDDentist(barang.id);
    setKategoriBarang(barang.kategori);
    setNamaDentist(barang.nama);
    setJumlahBarang(barang.no_hp);
    setFotoBarang(barang.email);
    setSpesialist(barang.spesialist);
    setEditingIndex(index);
    setShowFormedit(true);
  };

  const handleDeleteBarang = (index) => {
    const barang = stok[index];
    axios
      .delete(`/dokter/${barang.id}`)
      .then((response) => {
        console.log("Data berhasil dihapus:", response.data);
        setStok(stok.filter((_, i) => i !== index));
      })
      .catch((error) => {
        console.error("Gagal menghapus data:", error);
      });
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
        const response = await axios.get("/gallery/");
        setStok(response.data.data);

        // Fetch time availability for each dentist
        const availabilityResponse = await axios.get("/jadwal/all");
        setTimeAvailability(availabilityResponse.data);
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

  const handleTimeSelect = (time) => {
    console.log("Selected time:", time);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="p-8 w-screen overflow-auto">
        <div>
          <h1 className="font-sans text-2xl text-third font-bold mb-20">
            Galerry
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

          {showFormedit && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg max-w-3xl w-full">
              <div className="bg-main text-white font-bold rounded-t-lg px-4 py-3 relative">
                Edit Dentist
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
                  type="file"
                  value={kategoriBarang}
                  onChange={(e) => setKategoriBarang(e.target.value)}
                  placeholder="Nama Dentist"
                  className="border border-gray-400 p-2 rounded mb-2 w-full mr-2"
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

          {showForm && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg max-w-3xl w-full">
              <div className="bg-main text-white font-bold rounded-t-lg px-4 py-3 relative">
                Add Dentist
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
                  type="file"
                  value={kategoriBarang}
                  onChange={(e) => setKategoriBarang(e.target.value)}
                  placeholder="Nama Dentist"
                  className="border border-gray-400 p-2 rounded mb-2 w-full mr-2"
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
            <table className="table-auto border-gray-500 w-full">
              <thead className="bg-second items-center text-gray-500">
                <tr>
                  <th className="border-gray-500 px-4 py-2 ">Picture</th>

                  {/* New column header */}
                  <th className="border-gray-500 px-4 py-2 ">Action</th>
                  
                </tr>
              </thead>
              <tbody>
                {stok.map((item, index) => (
                  <tr key={index} className="bg-second">
                    <td className="border-gray-500 px-4 py-2 w-96">
                      <div className="flex justify-center items-center">
                        <img
                          className="w-80 h-52 p-4 rounded-t-lg"
                          src={`http://82.197.95.108:8003/dokter/gambar/${item.gambar}`}
                          alt="product"
                        />
                      </div>
                    </td>
                    <td className=" text-center border-gray-500 px-4 py-2">
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

export default Gallery;

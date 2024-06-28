import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import axios from "../../config/axiosConfig";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function Jadwal() {
  const [stok, setStok] = useState([]);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupImageSrc, setPopupImageSrc] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [fotoBarang, setFotoBarang] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showFormedit, setShowFormedit] = useState(false);
  const [id, setIDDentist] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [dokterOptions, setDokterOptions] = useState([]);
  const [selectedDokter, setSelectedDokter] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jadwalResponse = await Promise.all([
          axios.get("/jadwal/all"),
        ]);
        const dokterResponse = await Promise.all([
          axios.get("/dokter/"),
        ]);
        setStok(jadwalResponse[0].data.data);
        // console.log(jadwalResponse[0].data.data)
        setDokterOptions(dokterResponse[0].data.data || []);
        // console.log(dokterResponse)
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCloseFormEdit = () => {
    setShowFormedit(false);
  };

  const handleAddBarang = () => {
    if (!selectedDokter) {
      setError(true);
      setErrorMessage("Harap pilih dokter terlebih dahulu!");
      return;
    }

    const data = {
      id_dokter: selectedDokter,
      jadwal: selectedDate,
    };

    if (editingIndex !== null) {
      axios
        .put(`/jadwal/${id}`, data)
        .then((response) => {
          console.log("Data berhasil diupdate:", response.data);
          const updatedStok = [...stok];
          updatedStok[editingIndex] = response.data.data;
          setStok(updatedStok);
        })
        .catch((error) => {
          console.error("Gagal mengupdate data:", error);
        });
    } else {
      axios
        .post("/jadwal/", data)
        .then((response) => {
          console.log("Data berhasil ditambahkan:", response.data);
          setStok((prevList) => [...prevList, response.data.data]);
        })
        .catch((error) => {
          console.error("Gagal menambahkan data:", error);
        });
    }

    setShowForm(false);
    setShowFormedit(false);
    setIDDentist("");
    setFotoBarang(null);
    setSelectedDokter(""); // Clear selectedDokter after submission
    setError(false); // Clear error state
    setErrorMessage(""); // Clear error message
  };

  const handleEditBarang = (index) => {
    const barang = stok[index];
    setIDDentist(barang.id);
    setSelectedDokter(barang.id_dokter);
    setSelectedDate(barang.jadwal);
    setFotoBarang(null);
    setEditingIndex(index);
    setShowFormedit(true);
  };

  const handleDeleteBarang = (index) => {
    const barang = stok[index];
    axios
      .delete(`/jadwal/${barang.id}`)
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
    setFotoBarang(file);
  };

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
          <h1 className="font-sans text-2xl text-third font-bold mb-20">
            Jadwal
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
                  onChange={handleImageUpload} // Updated
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
                Add Jadwal
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
                  {error && (
                    <div className="bg-red-200 text-red-700 p-2 rounded mb-2">
                      {errorMessage}
                    </div>
                  )}

                  <select
                    value={selectedDokter}
                    onChange={(e) => {
                      setSelectedDokter(e.target.value);
                      setError(false); // Clear error when selecting a doctor
                    }}
                    className="border border-gray-400 p-2 rounded mb-2 w-full mr-2"
                  >
                    <option value="">Pilih Dokter</option>
                    {dokterOptions.map((dokter) => (
                      <option key={dokter.id} value={dokter.id}>
                        {dokter.nama}
                      </option>
                    ))}
                  </select>

                  <input
                    type="date"
                    placeholder="Tanggal Jadwal"
                    className="border border-gray-400 p-2 rounded mb-2 w-full mr-2"
                    // You might want to bind this value to a state variable
                    // Example: value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
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
                    <th className="border-gray-500 px-4 py-2">ID dokter</th>
                    <th className="border-gray-500 px-4 py-2">Date</th>

                    {/* New column header */}
                    <th className="border-gray-500 px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {stok.length > 0 ? (
                    stok.map((item, index) => (
                      <tr key={index} className="bg-second">
                        <td className="text-center border-gray-500 px-4 py-2 w-96">
                          DG00{item.id_dokter}{" "}
                        </td>
                        <td className="text-center border-gray-500 px-4 py-2 w-96">
                          {item.jadwal}
                        </td>
                        <td className=" text-center border-gray-500 px-4 py-2">
                          
                          <button
                            onClick={() => handleDeleteBarang(index)}
                            className="bg-red-500 text-white font-bold py-1 px-2 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Jadwal;
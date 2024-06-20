import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import axios from "../../config/axiosConfig";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TimeButtonList from "./timelist";

function Masterbarangjadi() {
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
  const [showFormJadwal, setShowFormJadwal] = useState(false);
  const [id, setIDDentist] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [jadwal, setJadwal] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchDropdownValue, setSearchDropdownValue] = useState("");
  const [jadwalData, setJadwalData] = useState([]);

  const handleCloseFormEdit = () => {
    setShowFormedit(false);
  };

  const handleAddBarang = () => {
    const newBarang = {
      kategori: kategoriBarang,
      nama: namadentist,
      no_hp: jumlahBarang,
      email: fotoBarang,
      spesialist: spesialist,
      id: id,
    };

    if (editingIndex !== null) {
      const updatedList = [...listBarang];
      updatedList[editingIndex] = newBarang;
      setListBarang(updatedList);
      setEditingIndex(null);
      axios
        .put(`/dokter/${id}`, newBarang)
        .then((response) => {
          console.log("Data berhasil diupdate:", response.data);
        })
        .catch((error) => {
          console.error("Gagal mengupdate data:", error);
        });
    } else {
      setListBarang((prevList) => [...prevList, newBarang]);
      axios
        .post("/dokter/", newBarang)
        .then((response) => {
          console.log("Data berhasil ditambahkan:", response.data);
        })
        .catch((error) => {
          console.error("Gagal menambahkan data:", error);
        });
    }

    setShowForm(false);
    // Reset form input
    setIDDentist("");
    setKategoriBarang("");
    setNamaDentist("");
    setJumlahBarang("");
    setFotoBarang("");
    setSpesialist("");
  };

  const handleEditBarang = async (index) => {
    const barang = stok[index];
    setIDDentist(barang.id);
    setKategoriBarang(barang.kategori);
    setNamaDentist(barang.nama);
    setJumlahBarang(barang.no_hp);
    setFotoBarang(barang.email);
    setSpesialist(barang.spesialist);
    setEditingIndex(index);
    setShowFormedit(true);

    // Fetch jadwal for the selected dentist
    try {
      const response = await axios.get(`/jadwal/${barang.id}`);
      setJadwal(response.data);
    } catch (error) {
      console.error("Error fetching jadwal:", error);
    }
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

  const handleDropdownChange = async (e) => {
    const selectedDate = e.target.value;
    setSearchDropdownValue(selectedDate);

    if (selectedDate) {
      try {
        const response = await axios.post("/jadwal/filter", {
          jadwal: selectedDate,
        });
        if (response.data.success) {
          setJadwalData(response.data.data);
        } else {
          console.error("Failed to filter jadwal:", response.data.message);
        }
      } catch (error) {
        console.error("Error filtering jadwal data:", error);
      }
    } else {
      // Jika dropdown kosong, ambil ulang semua jadwal
      const response = await axios.get("/jadwal/all");
      setJadwalData(response.data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dokter data
        const dokterResponse = await axios.get("/dokter/");
        setStok(dokterResponse.data.data);

        // Fetch time availability for each dentist
        const availabilityResponse = await axios.get("/jadwal/all");
        setTimeAvailability(availabilityResponse.data);

        // Fetch jadwal data
        const jadwalResponse = await axios.get("/jadwal/all");
        setJadwalData(jadwalResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
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

  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);

    if (selectedDate) {
      try {
        const response = await axios.get("/jadwal/2/filter", {
          jadwal: selectedDate,
        });
        if (response.data.success) {
          setJadwalData(response.data.data);
        } else {
          console.error("Failed to filter jadwal:", response.data.message);
        }
      } catch (error) {
        console.error("Error filtering jadwal data:", error);
      }
    } else {
      // If no date is selected, fetch all jadwal data
      try {
        const response = await axios.get("/jadwal/all");
        setJadwalData(response.data);
      } catch (error) {
        console.error("Error fetching jadwal data:", error);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="p-8 w-screen overflow-auto">
        <div>
          <h1 className="font-sans text-2xl text-third font-bold mb-20">
            Dentist
          </h1>
          <div className="flex justify-between mb-4">
            <button
              onClick={() => setShowForm(true)}
              className="bg-main hover:bg-second text-white font-bold rounded-3xl mr-4 w-40 h-10"
            >
              Add Dentist
            </button>

            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
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
                  onChange={handleImageUpload}
                  placeholder=""
                  className="border border-gray-400 p-2 rounded mb-2 w-full mr-2"
                />
                <input
                  type="text"
                  value={namadentist}
                  onChange={(e) => setNamaDentist(e.target.value)}
                  placeholder="Nama Dentist"
                  className="border border-gray-400 p-2 rounded mb-2 w-full mr-2"
                />
                <input
                  type="number"
                  value={jumlahBarang}
                  onChange={(e) => setJumlahBarang(e.target.value)}
                  placeholder="Spesialist"
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
                  onChange={handleImageUpload}
                  placeholder=""
                  className="border border-gray-400 p-2 rounded mb-2 w-full mr-2"
                />
                <input
                  type="text"
                  value={namadentist}
                  onChange={(e) => setNamaDentist(e.target.value)}
                  placeholder="Nama Dentist"
                  className="border border-gray-400 p-2 rounded mb-2 w-full mr-2"
                />
                <input
                  type="number"
                  value={jumlahBarang}
                  onChange={(e) => setJumlahBarang(e.target.value)}
                  placeholder="NO HP"
                  className="border border-gray-400 p-2 rounded mb-2 w-full mr-2"
                />

                <button
                  onClick={handleAddBarang}
                  className="bg-main text-white font-bold rounded py-2 px-4 mt-4 w-full"
                >
                  Tambah dentist
                </button>
              </div>
            </div>
          )}

          {showFormJadwal && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg max-w-3xl w-full">
              <div className="bg-main text-white font-bold rounded-t-lg px-4 py-3 relative">
                Add Jadwal
                <button
                  onClick={() => setShowFormJadwal(false)}
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
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  placeholder="Tanggal"
                  className="border border-gray-400 p-2 rounded mb-2 w-full mr-2"
                />
                <input
                  type="time"
                  value={jumlahBarang} // Assuming this is for time input
                  onChange={(e) => setJumlahBarang(e.target.value)}
                  placeholder="Waktu"
                  className="border border-gray-400 p-2 rounded mb-2 w-full mr-2"
                />

                <button
                  onClick={handleAddBarang} // Assuming this should handle adding jadwal
                  className="bg-main text-white font-bold rounded py-2 px-4 mt-4 w-full"
                >
                  Tambah jadwal
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="table-auto border-gray-500 w-full">
              <thead className="bg-second text-gray-500">
                <tr>
                  <th className="border-gray-500 px-4 py-2 w-32">ID Dentist</th>
                  <th className="border-gray-500 px-4 py-2 w-96">Picture</th>
                  <th className="border-gray-500 px-4 py-2">Nama Dentist</th>
                  <th className="border-gray-500 px-4 py-2">No Hp</th>
                  <th className="border-gray-500 px-4 py-2">Time Selection</th>
                  <th className="border-gray-500 px-4 py-2">Edit</th>
                  <th className="border-gray-500 px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {stok.map((item, index) => (
                  <tr key={index} className="bg-second">
                    <td className="text-center border-gray-500 px-2 py-2">
                      DG00{item.id}
                    </td>
                    <td className="text-center border-gray-500 px-4 py-2 flex justify-center items-center">
                      <img
                        className="w-20 h-20 rounded-full object-cover"
                        src={`http://82.197.95.108:8003/dokter/gambar/${item.gambar}`}
                        alt="product"
                      />
                    </td>
                    <td className="text-center border-gray-500 px-4 py-2">
                      {item.nama}
                    </td>
                    <td className="text-center border-gray-500 px-4 py-2">
                      {item.no_hp}
                    </td>
                    <td className="border-gray-500 text-center py-2">
                      <TimeButtonList
                        id={item.id}
                        onTimeSelect={handleTimeSelect}
                        availability={timeAvailability[item.id] || {}}
                      />
                    </td>
                    <td className="border-gray-500 text-center py-2">
                      <button
                        onClick={() => handleEditBarang(index)}
                        className="bg-green-500 text-white font-bold py-1 px-2 rounded mr-2"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="border-gray-500 text-center py-2">
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

export default Masterbarangjadi;

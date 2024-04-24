import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import axios from "../../config/axiosConfig";
import PopupImage from "../../assets/login.png";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function Stokbarangjadi() {
  const [stok, setStok] = useState([
    {
      id: 1,
      nm_bjadi: "Bowo",
      jml_bjadi: 10,
      type_patient: "Modern User",
      imageSrc: "image1.jpg",
      Phone_number: "(+62) 2332437777",
    },

    // Tambahkan data dummy sesuai kebutuhan
  ]);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupImageSrc, setPopupImageSrc] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [kategoriBarang, setKategoriBarang] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [jumlahBarang, setJumlahBarang] = useState("");
  const [fotoBarang, setFotoBarang] = useState("");
  const [listBarang, setListBarang] = useState([]);
  const [nomr, setNoMR] = useState("");
  const [type, setType] = useState("");

  const handleAddBarang = () => {
    const newBarang = {
      kategori: kategoriBarang,
      nama: namaBarang,
      jumlah: jumlahBarang,
      nomr: nomr,
      type: type,
      foto: fotoBarang,
    };

    setListBarang((prevList) => [...prevList, newBarang]);
    setShowForm(false);
    // Reset form input
    setKategoriBarang("");
    setNamaBarang("");
    setJumlahBarang("");
    setNoMR("");
    setType("");
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

  const handleEditBarang = (index) => {
    // Implementasi logika untuk mengedit barang
    console.log("Edit barang dengan index:", index);
  };

  const handleDeleteBarang = (index) => {
    // Implementasi logika untuk menghapus barang
    console.log("Hapus barang dengan index:", index);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="p-8 w-screen overflow-auto">
        {/* Konten Stokbarangjadi */}
        <div>
          <h1 className="font-sans text-third text-2xl font-bold mb-20">
            Patient
          </h1>
          <div className="flex justify-between mb-4">
            <button
              onClick={() => setShowForm(true)}
              className="bg-main hover:bg-second text-white font-bold rounded-3xl mr-4 w-40 h-10"
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
                Tambah Pattient
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
                {/* Dropdown Kategori Barang */}
                <input
                  type="text"
                  value={kategoriBarang}
                  onChange={(e) => setKategoriBarang(e.target.value)}
                  placeholder="ID User"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />

                {/* Dropdown Nama Barang */}
                <input
                  type="text"
                  value={namaBarang}
                  onChange={(e) => setNamaBarang(e.target.value)}
                  placeholder="Username"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />
                {/* Dropdown Nama Barang */}
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                >
                  <option value="" disabled>
                    Type of Patient
                  </option>
                  <option value="kategori1">Modern User</option>
                  <option value="kategori2">Manual User</option>
                  <option value="kategori3">Digital User</option>
                </select>
                {/* Dropdown Kategori Barang */}
                <input
                  type="number"
                  value={nomr}
                  onChange={(e) => setNoMR(e.target.value)}
                  placeholder="No Medical Record"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />
                {/* Dropdown Kategori Barang */}
                <input
                  type="number"
                  value={jumlahBarang}
                  onChange={(e) => setJumlahBarang(e.target.value)}
                  placeholder="Phone number"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />
                <button
                  onClick={handleAddBarang}
                  className="bg-main  text-white font-bold rounded py-2 px-4 mt-4 w-full"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Tabel dengan Data */}
          <div className="overflow-x-auto">
            <table className="table-auto border-none  bg-second w-full">
              <thead className="bg-second text-gray-500">
                <tr>
                  <th className=" border-gray-500 px-4 py-2 w-32">ID User</th>
                  <th className=" border-gray-500 px-4 py-2">Username</th>
                  <th className=" border-gray-500 px-4 py-2">No MR</th>
                  <th className=" border-gray-500 px-4 py-2">
                    Type of patient
                  </th>
                  <th className=" border-gray-500 px-4 py-2">Phone number</th>
                  <th className=" border-gray-500 px-4 py-2 w-20">Action</th>
                </tr>
              </thead>
              <tbody>
                {stok.map((item, index) => (
                  <tr key={index}>
                    <td className=" border-gray-500 text-center py-2">
                      {index + 1}
                    </td>
                    <td className=" border-gray-500 text-center py-2">
                      {item.nm_bjadi}
                    </td>
                    <td className=" border-gray-500 text-center py-2">
                      {item.jml_bjadi}
                    </td>
                    <td className=" border-gray-500 text-center py-2">
                      {item.type_patient}
                    </td>
                    <td className=" border-gray-500 text-center py-2">
                      {item.Phone_number}
                    </td>
                    <td className=" border-gray-500 text-center py-2">
                      <button
                        onClick={() => setShowForm(true)}
                        className="text-blue-500"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => handleDeleteBarang(index)}
                        className="text-red-500 ml-2"
                      >
                        <DeleteIcon />
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

export default Stokbarangjadi;

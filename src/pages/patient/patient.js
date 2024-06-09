import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import axios from "../../config/axiosConfig";
import PopupImage from "../../assets/login.png";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function Stokbarangjadi() {
  const [stok, setStok] = useState([]);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupImageSrc, setPopupImageSrc] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showFormedit, setShowFormedit] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [nama, setnama] = useState("");
  const [noktp, setnoktp] = useState("");
  const [nomr, setnomr] = useState("");
  const [gender, setgender] = useState("");
  const [listBarang, setListBarang] = useState([]);
  const [nohp, setnohp] = useState("");
  const [alamat, setalamat] = useState("");
  const [editingId, setEditingId] = useState(null); // Add state for the editing ID

  const handleAddBarang = async () => {
    const newBarang = {
      email: email,
      password: password,
      nama: nama,
      no_hp: nohp,
      alamat: alamat,
      no_ktp: noktp,
      no_rekam_medis: nomr,
      gender: gender,
    };

    try {
      const response = await axios.post("/user/registeruser", newBarang);
      console.log(response.data.data);
      setStok((prevStok) => [...prevStok, response.data]);
    } catch (error) {
      console.error("Gagal menambahkan barang:", error);
    }

    setShowForm(false);
    resetForm();
  };

  const handleUpdateBarang = async () => {
    const updatedBarang = {
      email: email,
      password: password,
      nama: nama,
      no_hp: nohp,
      alamat: alamat,
      no_ktp: noktp,
      no_rekam_medis: nomr,
      gender: gender,
    };

    try {
      const response = await axios.put(`/user/${editingId}`, updatedBarang); // Use editingId
      console.log(response.data.data);
      setStok((prevStok) =>
        prevStok.map((item) => (item.id === editingId ? response.data : item))
      );
    } catch (error) {
      console.error("Gagal mengupdate barang:", error);
    }

    setShowFormedit(false);
    resetForm();
  };

  const resetForm = () => {
    setemail("");
    setpassword("");
    setnama("");
    setnohp("");
    setalamat("");
    setnoktp("");
    setnomr("");
    setgender("");
    setEditingId(null); // Reset the editing ID
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setnoktp(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  function hitungUsia(tglLahir) {
    // Jika tanggal lahir kosong, return string kosong
    if (!tglLahir) return "";
  
    const hariIni = new Date(); // Tanggal hari ini
    const lahir = new Date(tglLahir); // Tanggal lahir pasien
  
    // Pastikan bahwa input tanggal lahir adalah valid
    if (isNaN(lahir.getTime())) return "";
  
    const tahunLahir = lahir.getFullYear();
    const bulanLahir = lahir.getMonth();
    const tanggalLahir = lahir.getDate();
  
    let usia = hariIni.getFullYear() - tahunLahir; // Hitung selisih tahun
    // Periksa apakah ulang tahun sudah lewat atau belum
    if (
      hariIni.getMonth() < bulanLahir ||
      (hariIni.getMonth() === bulanLahir && hariIni.getDate() < tanggalLahir)
    ) {
      usia--; // Kurangi satu tahun jika belum lewat ulang tahun
    }
    return usia;
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/user");
        setStok(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  const handleEditBarang = async (id) => {
    try {
      const response = await axios.get(`/user/2/${id}`);
      const barang = response.data.data[0];

      setemail(barang.email);
      setpassword(barang.password);
      setnama(barang.nama);
      setnohp(barang.no_hp);
      setalamat(barang.alamat);
      setnoktp(barang.no_ktp);
      setnomr(barang.no_rekam_medis);
      setgender(barang.gender);
      setEditingId(id); // Set the editing ID
      setShowFormedit(true);
    } catch (error) {
      console.error("Gagal mengambil barang:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="p-8 w-screen overflow-auto">
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

          {showFormedit && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg max-w-3xl w-full">
              <div className="bg-main text-white font-bold rounded-t-lg px-4 py-3 relative">
                Edit Patient
                <button
                  onClick={() => setShowFormedit(false)}
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
                  type="text"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Email"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setnama(e.target.value)}
                  placeholder="Nama"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />
                {/* <input
                  type="text"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="Password"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                /> */}
                <input
                  type="number"
                  value={nohp}
                  onChange={(e) => setnohp(e.target.value)}
                  placeholder="No HP"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />
                <input
                  type="text"
                  value={alamat}
                  onChange={(e) => setalamat(e.target.value)}
                  placeholder="Alamat"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />
                <input
                  type="number"
                  value={noktp}
                  onChange={(e) => setnoktp(e.target.value)}
                  placeholder="No KTP"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />
                <input
                  type="number"
                  value={nomr}
                  onChange={(e) => setnomr(e.target.value)}
                  placeholder="No Rekam Medis"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                  placeholder="Gender"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />
                <button
                  onClick={handleUpdateBarang}
                  className="bg-main  text-white font-bold rounded py-2 px-4 mt-4 w-full"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {showForm && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg max-w-3xl w-full">
              <div className="bg-main text-white font-bold rounded-t-lg px-4 py-3 relative">
                Tambah Patient
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
                  type="text"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Email"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setnama(e.target.value)}
                  placeholder="Nama"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="Password"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />
                <input
                  type="number"
                  value={nohp}
                  onChange={(e) => setnohp(e.target.value)}
                  placeholder="No HP"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />
                <input
                  type="text"
                  value={alamat}
                  onChange={(e) => setalamat(e.target.value)}
                  placeholder="Alamat"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />
                <input
                  type="number"
                  value={noktp}
                  onChange={(e) => setnoktp(e.target.value)}
                  placeholder="No KTP"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />
                <input
                  type="number"
                  value={nomr}
                  onChange={(e) => setnomr(e.target.value)}
                  placeholder="No Rekam Medis"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                  placeholder="Gender"
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

          <div className="overflow-x-auto">
            <table className="table-auto border-none  bg-second w-full">
              <thead className="bg-second text-gray-500">
                <tr>
                  <th className=" border-gray-500 px-4 py-2 w-32">ID User</th>
                  <th className=" border-gray-500 px-4 py-2">Username</th>
                  <th className=" border-gray-500 px-4 py-2">No MR</th>
                  <th className=" border-gray-500 px-4 py-2">Usia</th>
                  <th className=" border-gray-500 px-4 py-2">Alamat</th>
                  <th className=" border-gray-500 px-4 py-2">Phone number</th>
                  <th className=" border-gray-500 px-4 py-2">Email</th>
                  <th className=" border-gray-500 px-4 py-2">T.O.P</th>
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
                      {item.nama}
                    </td>
                    <td className=" border-gray-500 text-center py-2">
                      {item.no_rekam_medis}
                    </td>
                    <td className=" border-gray-500 text-center py-2">
                      {hitungUsia(item.tanggal_lahir)}
                    </td>
                    <td className=" border-gray-500 text-center py-2">
                      {item.alamat}
                    </td>
                    <td className=" border-gray-500 text-center py-2">
                      {item.no_hp}
                    </td>
                    <td className=" border-gray-500 text-center py-2">
                      {item.email}
                    </td>
                    <td className=" border-gray-500 text-center py-2">
                      Digital
                    </td>
                    <td className=" border-gray-500 text-center py-2">
                      <button
                        onClick={() => handleEditBarang(item.id)}
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
    </div>
  );
}

export default Stokbarangjadi;

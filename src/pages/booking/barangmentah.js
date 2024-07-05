import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import axios from "../../config/axiosConfig";
import PopupImage from "../../assets/login.png";
import Select from "react-select";
import DeleteIcon from "@material-ui/icons/Delete";

function Stokbarangmentah() {
  const [booking, setBooking] = useState([]);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [jumlahBarang, setJumlahBarang] = useState("");
  const [listBarang, setListBarang] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [promo, setPromo] = useState("");
  const [dentist, setDentist] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [users, setUsers] = useState([]);
  const [timeOptions, setTimeOptions] = useState([]);
  const [dentistOptions, setDentistOptions] = useState([]);
  const [promoOptions, setPromoOptions] = useState([]);

  const handleDeleteBarang = async (id) => {
    try {
      await axios.delete(`/booking/${id}`);
      setBooking((prevBooking) => prevBooking.filter((item) => item.id !== id));
    } catch (error) {
      console.error(`Gagal menghapus booking dengan ID ${id}:`, error);
    }
  };

  const handleAddBarang = async () => {
    const newBarang = {
      user: {
        id: selectedUser.value,
      },
      dentist: {
        id: dentist.value,
      },
      jadwal: {
        jam: time.label,
        jadwal: date,
      },
      judul: {
        id: selectedPromo ? { id: selectedPromo.value } : null,
      },
    };

    try {
      // Kirim POST request ke endpoint /booking/ dengan data newBarang
      const response = await axios.post("/booking/", newBarang);

      // Handle jika POST request berhasil
      console.log("Barang berhasil ditambahkan:", response.data);

      // Update state listBarang dengan menambahkan newBarang ke dalamnya
      setBooking((prevBooking) => [...prevBooking, response.data.data]);
      setShowForm(false);

      // Reset form input
      setDate("");
      setTime("");
      setPromo("");
      setDentist(null);
      setSelectedUser(null);
      setSelectedPromo(null);
    } catch (error) {
      // Handle jika terjadi error saat melakukan POST request
      console.error("Gagal menambahkan barang:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/booking/all");
        setBooking(response.data.data);

        const userResponse = await axios.get("/user/");
        setUsers(userResponse.data.data);

        const dentistResponse = await axios.get("/dokter/");
        setDentistOptions(dentistResponse.data.data);

        const promoResponse = await axios.get("/promo/");
        setPromoOptions(promoResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTimeOptions = async () => {
      setTimeOptions([]); // Reset timeOptions whenever date or dentist changes
      if (date && dentist) {
        try {
          const timeResponse = await axios.get(
            `/jadwal/${dentist.value}/${date}`
          );
          const jamFix = timeResponse.data.data.map((item) => ({
            id: item.id,
            jam: item.jam,
          }));

          setTimeOptions(jamFix[0].jam);
          console.log(jamFix[0].jam);
          console.log(date);
        } catch (error) {
          console.error("Error fetching time options:", error);
        }
      }
    };

    fetchTimeOptions();
  }, [date, dentist]);

  const handleCloseImagePopup = () => {
    setShowImagePopup(false);
  };

  const options = users.map((user) => ({
    value: user.id,
    label: user.nama,
  }));

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, "");
    return inputValue;
  };

  const handleUserChange = (selectedOption) => {
    setSelectedUser(selectedOption);
  };

  const handlePromoChange = (selectedOption) => {
    setSelectedPromo(selectedOption);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="p-8 w-screen overflow-auto">
        <div>
          <h1 className="font-sans text-2xl text-third font-bold mb-20">
            Booking
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
                Tambah Booking
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
                <Select
                  value={selectedUser}
                  onChange={handleUserChange}
                  options={options}
                  isSearchable={true}
                  placeholder="Pilih Nama User"
                  onInputChange={handleInputChange}
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />

                <Select
                  value={dentist}
                  onChange={(selectedOption) => setDentist(selectedOption)}
                  options={dentistOptions.map((dentist) => ({
                    value: dentist.id,
                    label: dentist.nama,
                  }))}
                  isSearchable={true}
                  placeholder="Pilih Dokter"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />

                <Select
                  value={time}
                  onChange={(selectedOption) => setTime(selectedOption)}
                  options={timeOptions.map((item) => ({
                    value: item.id,
                    label: item,
                  }))}
                  isSearchable={true}
                  placeholder="Pilih Jam"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />

                <Select
                  value={promo}
                  onChange={(selectedOption) => setPromo(selectedOption)}
                  options={promoOptions.map((item) => ({
                    value: item.id,
                    label: item.judul,
                  }))}
                  isSearchable={true}
                  placeholder="Pilih Promo"
                  className="border border-gray-400 p-2 rounded mb-2 w-full"
                />

                <button
                  onClick={handleAddBarang}
                  className="bg-main text-white font-bold rounded py-2 px-4 mt-4 w-full"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="bg-second text-gray-500">
                <tr>
                  <th className="border-gray-500 px-4 py-2 w-32">ID Booking</th>
                  <th className="border-gray-500 px-4 py-2 w-38">
                    Nama Lengkap
                  </th>
                  <th className="border-gray-500 px-4 py-2 w-32">No MR</th>
                  <th className="border-gray-500 px-4 py-2">Tanggal</th>
                  <th className="border-gray-500 px-4 py-2">Time</th>
                  <th className="border-gray-500 px-4 py-2">Dentist</th>
                  <th className="border-gray-500 px-4 py-2">Promo</th>
                  <th className="border-gray-500 px-4 py-2">Nomor Telepon</th>
                  <th className="border-gray-500 px-4 py-2 w-24">Action</th>
                </tr>
              </thead>
              <tbody>
                {booking.map((item, index) => (
                  <tr key={index} className="bg-second">
                    <td className="text-center border-gray-500 px-2 py-2">
                      B{index + 1}
                    </td>
                    <td className="text-center border-gray-500 px-4 py-2">
                      {item.user?.nama}
                    </td>
                    <td className="text-center border-gray-500 px-4 py-2">
                      {item.user?.no_rekam_medis}
                    </td>
                    <td className="text-center border-gray-500 px-4 py-2">
                      {item.tanggal_pemesanan}
                    </td>
                    <td className="text-center border-gray-500 px-4 py-2">
                      {item.jadwal}
                    </td>
                    <td className="text-center border-gray-500 px-4 py-2">
                      {item.dokter?.nama}
                    </td>
                    <td className="text-center border-gray-500 px-4 py-2">
                      {item.promo?.judul}
                    </td>
                    <td className="text-center border-gray-500 px-4 py-2">
                      {item.user?.no_hp}
                    </td>

                    <td className="border-gray-500 text-center py-2">
                      <button
                        onClick={() => handleDeleteBarang(item.id)}
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

export default Stokbarangmentah;

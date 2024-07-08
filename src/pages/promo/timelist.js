import React, { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";

const TimeButtonList = ({ id, selectedDate, onDateChange }) => {
  const times = [
    "08.00",
    "08.30",
    "09.00",
    "09.30",
    "10.00",
    "10.30",
    "11.00",
    "11.30",
    "13.00",
    "13.30",
    "14.00",
    "14.30",
    "15.00",
    "15.30",
    "16.00",
    "16.30",
  ];

  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`jadwal/1/filter/${selectedDate}`);
        const timesById = response.data.data.find(
          (item) => item.id_dokter === id
        );
        console.log(timesById);
        if (timesById) {
          const available = timesById.jam.split(",");
          setAvailableTimes(available);
          setSelectedTimes(available);
        } else {
          setAvailableTimes([]);
          setSelectedTimes([]);
        }
      } catch (error) {
        console.error(error);
        setAvailableTimes([]);
        setSelectedTimes([]);
      }
    };

    // Reset state when selectedDate changes
    setAvailableTimes([]);
    setSelectedTimes([]);

    if (selectedDate) {
      fetchData();
    }
  }, [id, selectedDate]);

  const handleTimeClick = (time) => {
    const updatedSelectedTimes = [...selectedTimes];
    const index = updatedSelectedTimes.indexOf(time);
    if (index === -1) {
      updatedSelectedTimes.push(time);
    } else {
      updatedSelectedTimes.splice(index, 1);
    }
    setSelectedTimes(updatedSelectedTimes);
  };

  const handleSave = () => {
    // Prepare data to send
    const data = {
      jam: selectedTimes.join(","),
    };

    axios
      .put(`/jadwal/${id}/${selectedDate}`, data)
      .then((response) => {
        console.log(response.data);
        // Handle success response
      })
      .catch((error) => {
        console.error(error);
        // Handle error response
      });
  };

  return (
    <div className="flex flex-wrap">
      {times.map((time) => (
        <button
          key={time}
          onClick={() => handleTimeClick(time)}
          className={`m-1 p-2 rounded ${
            selectedTimes.includes(time)
              ? "bg-main text-white hover:bg-main"
              : "bg-second border border-main hover:bg-main cursor-pointer"
          }`}
        >
          {time}
        </button>
      ))}
      <button
        onClick={handleSave}
        className="bg-green-500 text-white p-2 m-2 rounded"
      >
        Save
      </button>
    </div>
  );
};

export default TimeButtonList;

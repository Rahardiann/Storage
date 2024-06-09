import React, { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";

const TimeButtonList = ({ id }) => {
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
        const response = await axios.get(`/jadwal/all`);
        const timesById = response.data.data.find(item => item.id === id);
        if (timesById) {
          const available = timesById.jam.split(",");
          setAvailableTimes(available);
          setSelectedTimes(available);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

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
      jam: selectedTimes.join(","), // Convert selected times to comma-separated string
    };

    // Send update request to server
    axios
      .put(`/jadwal/${id}`, data)
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
              ? "bg-blue-500 text-white hover:bg-blue-700"
              : "bg-gray-300 hover:bg-gray-400 cursor-pointer"
          }`}
        >
          {time}
        </button>
      ))}
      <button
        onClick={handleSave}
        className="bg-green-500 text-white p-2 mt-2 rounded"
      >
        Save
      </button>
    </div>
  );
};

export default TimeButtonList;

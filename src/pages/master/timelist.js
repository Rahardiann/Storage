import React, { useState, useEffect } from 'react';
import axios from "../../config/axiosConfig";

const TimeButtonList = ({ id }) => {
  const times = [
    "08:00", "08:30",
    "09:00", "09:30",
    "10:00", "10:30",
    "11:00", "11:30",
    "13:00", "13:30",
    "14:00", "14:30",
    "15:00", "15:30",
    "16:00", "16:30",
  ];

  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);

  useEffect(() => {
    // Fetch data from the database to get available times for the given ID
    axios.get(`/jadwal/all`)
      .then(response => {
        const data = response.data;
        // Extract available times from data and update state
        const available = data.map(item => item.jam);
        setAvailableTimes(available);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const handleTimeClick = (time) => {
    if (availableTimes.includes(time)) {
      const updatedSelectedTimes = [...selectedTimes];
      const index = updatedSelectedTimes.indexOf(time);
      if (index === -1) {
        updatedSelectedTimes.push(time);
      } else {
        updatedSelectedTimes.splice(index, 1);
      }
      setSelectedTimes(updatedSelectedTimes);
    }
  };

  const handleSave = () => {
    // Send update request to server for all selected times with the same ID
    axios.put(`/api/jadwal/${id}`, { jadwal: selectedTimes })
      .then(response => {
        console.log(response.data);
        // Handle success response
      })
      .catch(error => {
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
          className={`m-1 p-2 rounded ${availableTimes.includes(time) ? (selectedTimes.includes(time) ? 'bg-blue-500 text-white hover:bg-blue-700' : 'bg-gray-300 hover:bg-gray-400 cursor-pointer') : 'bg-gray-300 cursor-not-allowed'}`}
          disabled={!availableTimes.includes(time)}
        >
          {time}
        </button>
      ))}
      <button onClick={handleSave} className="bg-green-500 text-white p-2 mt-2 rounded">
        Save
      </button>
    </div>
  );
};

export default TimeButtonList;

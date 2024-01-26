// Dashboard.js
import React from 'react';
import Sidebar from '../sidebar/sidebar';
// import "../homepage/dashboard.css"
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts';


const Dashboard = () => {
  const data = [
    {
      name: 'Januaro',
      month: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Februari',
      month: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'maret',
      month: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'April',
      month: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Mei',
      month: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Juni',
      month: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Juli',
      month: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'agustus',
      month: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'september',
      month: 340,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'oktober',
      month: 3420,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'november',
      month: 1490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'desember',
      month: 5490,
      pv: 4300,
      amt: 2100,
    },
  ]
  
  const anj = [
    { name: "Geeksforgeeks", students: 400 },
    { name: "Technical scripter", students: 700 },
    { name: "Geek-i-knack", students: 200 },
    { name: "Geek-o-mania", students: 1000 },
]
  
  ;
  return (
    <div className="flex flex-wrap"> {/* Menggunakan flex container dan wrap untuk responsif */}
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 lg:p-12 xl:p-16"> {/* Memberikan padding yang berbeda pada berbagai ukuran layar */}
        <div
          className="bg-blue-200 p-4 md:p-8 lg:p-12 xl:p-16 rounded shadow-lg"
        >
          <ResponsiveContainer width="100%" height={300}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="month" fill="#4A55A2" />
          </BarChart>
          </ResponsiveContainer>
        
        </div>

      </div>
        
      <ResponsiveContainer width={"100%"} height={100}>
          <PieChart width={100} height={100}>
                <Tooltip />
                <Pie
                    data={anj}
                    dataKey="students"
                    outerRadius={250}
                    innerRadius={150}
                    fill="green"
                    label={({ name, students }) =>
                        `${name}: ${students}`
                    }
                />
            </PieChart>
          </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;

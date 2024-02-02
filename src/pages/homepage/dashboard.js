import React from 'react';
import Sidebar from '../sidebar/sidebar';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  const data = [
    { name: 'Januaro', Barang_Masuk: 4000, pv: 2400, Barang_keluar: 2400 },
    { name: 'Februari', Barang_Masuk: 3000, pv: 1398, Barang_keluar: 2210 },
    { name: 'maret', Barang_Masuk: 2000, pv: 9800, Barang_keluar: 2290 },
    { name: 'April', Barang_Masuk: 2780, pv: 3908, Barang_keluar: 2000 },
    { name: 'Mei', Barang_Masuk: 1890, pv: 4800, Barang_keluar: 2181 },
    { name: 'Juni', Barang_Masuk: 2390, pv: 3800, Barang_keluar: 2500 },
    { name: 'Juli', Barang_Masuk: 3490, pv: 4300, Barang_keluar: 2100 },
    { name: 'agustus', Barang_Masuk: 3490, pv: 4300, Barang_keluar: 2100 },
    { name: 'september', Barang_Masuk: 340, pv: 4300, Barang_keluar: 2100 },
    { name: 'oktober', Barang_Masuk: 3420, pv: 4300, Barang_keluar: 2100 },
    { name: 'november', Barang_Masuk: 1490, pv: 4300, Barang_keluar: 2100 },
    { name: 'desember', Barang_Masuk: 5490, pv: 4300, Barang_keluar: 2100 },
  ];

  const anj = [
    { name: 'Geeksforgeeks', students: 400 },
    { name: 'Technical scripter', students: 700 },
    { name: 'Geek-i-knack', students: 200 },
    { name: 'Geek-o-mania', students: 1000 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8 lg:p-12 xl:p-16">
          <div className="bg-blue-200 p-4 md:p-8 lg:p-12 xl:p-16 rounded shadow-lg">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{ top: 10, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Barang_Masuk" fill="#8884d8" />
                <Bar dataKey="Barang_keluar" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="p-4 md:p-8 lg:p-12 xl:p-16">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart width={800} height={800}>
              <Pie
                data={anj}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={130}
                fill="#8884d8"
                dataKey="students"
              >
                {anj.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

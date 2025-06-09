import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Income', value: 60000 },
  { name: 'Remaining', value: 40000 },
];

const COLORS = ['#f97316', '#06b6d4', '#22c55e'];

const InteractiveChart = () => {
  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Interactive Charts</h2>
        <button className="text-cyan-400 hover:text-cyan-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-3xl font-bold text-white">60.0K</span>
          <span className="text-gray-400 text-sm">with today</span>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-2xl font-bold text-white mb-2">₹30,000</div>
        <p className="text-gray-400 text-sm">with flow items</p>
      </div>
    </div>
  );
};

export default InteractiveChart;
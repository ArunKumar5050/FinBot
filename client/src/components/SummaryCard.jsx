import React from 'react';
import { FaWallet } from 'react-icons/fa';

const SummaryCard = () => {
  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg  overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Summary Cards</h2>
        <button className="text-cyan-400 hover:text-cyan-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      <div className="relative w-48 h-48 mx-auto mb-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 rounded-full border-8 border-cyan-400 border-opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FaWallet className="text-6xl text-cyan-400" />
          </div>
        </div>
        <svg className="w-48 h-48 transform -rotate-90">
          <circle
            className="text-cyan-400"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="70"
            cx="96"
            cy="96"
            strokeDasharray="439.8"
            strokeDashoffset="110"
          />
        </svg>
      </div>

      <div className="text-center">
        <h3 className="text-4xl font-bold text-white mb-2">₹0,000</h3>
        <p className="text-gray-400 text-sm">vs your threshold</p>
      </div>

      <div className="mt-6">
        <button className="w-full bg-gray-800 text-gray-300 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
          <span>Savings</span>
        </button>
      </div>
    </div>
  );
};

export default SummaryCard;
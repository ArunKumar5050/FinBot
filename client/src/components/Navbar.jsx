import React from "react";
import { FaChartBar, FaCog, FaExchangeAlt, FaUserCircle } from "react-icons/fa";
import { useState } from "react";

import LoginOption from "./loginOption";

const Navbar = () => {
  // const handleProfileClick = () => {

  // }
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <nav className="bg-gray-900 h-20 flex items-center justify-between px-10 fixed w-full top-0 border-b border-gray-700">
        {/* Left side - Logo */}
        <div className="flex items-center p-0">
          <img src="/logo.png" alt="FinBot Logo" className="h-20 w-auto" />
        </div>

        
        {/* Right side - Profile Icon */}
        <div className="flex items-center">
          <button
            onClick={() => setShowModal(true)}
            className="text-gray-300 hover:text-white"
          >
            <FaUserCircle className="text-3xl" />
          </button>
        </div>
      </nav>
      {/* Modal */}
      {showModal && <LoginOption onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Navbar;

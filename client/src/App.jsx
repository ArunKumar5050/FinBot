import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import SummaryCard from "./components/SummaryCard";
import InteractiveChart from "./components/InteractiveChart";
import RecentTransactions from "./components/RecentTransactions";
import TotalBalance from "./components/TotalBalance";
import MonthlyIncome from "./components/MonthlyIncome";
import MonthlyExpenses from "./components/MonthlyExpenses";
import TransactionUpload from "./components/TransactionUpload";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-900 ">
        <Navbar />
        <main className="container mx-auto pt-24 px-4 pb-8">
          {token && (
            <div className="container mx-auto px-4 py-8">
              <TransactionUpload />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <TotalBalance />
            <MonthlyIncome />
            <MonthlyExpenses />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <SummaryCard />
            <InteractiveChart />
            {/* <RecentTransactions /> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            <RecentTransactions />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;

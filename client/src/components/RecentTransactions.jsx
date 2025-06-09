import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { fetchTransactions, addTransactions } from '../store/transactionSlice';
import { toast } from 'react-toastify';
import Papa from 'papaparse';
import { Link } from 'react-router-dom';

const RecentTransactions = () => {
  const dispatch = useDispatch();
  const { items: transactions, isLoading } = useSelector((state) => state.transactions);
  const [filter, setFilter] = useState('all');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchTransactions())
        .unwrap()
        .then(data => {
          console.log('Fetched transactions:', data);
        })
        .catch(error => {
          if (error !== 'Authentication required') {
            toast.error(error || 'Failed to fetch transactions');
          }
        });
    }
  }, [dispatch]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    Papa.parse(file, {
      complete: async (results) => {
        try {
          if (!results.data || results.data.length < 2) {
            throw new Error('Invalid CSV format');
          }

          // Transform CSV data to match backend expectations
          const transactions = results.data
            .filter(row => row.length >= 3)
            .map(row => {
              const amount = parseFloat(row[2]);
              if (isNaN(amount)) return null;
              
              return {
                date: new Date(row[0]).toISOString().split('T')[0],
                description: row[1]?.trim() || 'Unnamed Transaction',
                amount: amount,
                type: amount > 0 ? 'income' : 'expense',
                category: row[3]?.trim() || 'uncategorized'
              };
            })
            .filter(Boolean);

          if (transactions.length === 0) {
            throw new Error('No valid transactions found in CSV');
          }

          // Log the data being sent
          console.log('Sending transactions:', { transactions });

          // Send transactions wrapped in an object
          const result = await dispatch(addTransactions({ transactions })).unwrap();
          console.log('API Response:', result);

          // Refresh the transactions list
          await dispatch(fetchTransactions());
          toast.success(`Successfully imported ${transactions.length} transactions`);
          e.target.value = '';
        } catch (error) {
          console.error('Import error:', error);
          toast.error(error.message || 'Failed to import transactions');
        } finally {
          setIsUploading(false);
        }
      },
      header: false,
      skipEmptyLines: true,
      error: (error) => {
        console.error('CSV Parse error:', error);
        toast.error('Failed to parse CSV file');
        setIsUploading(false);
      }
    });
  };

  const filteredTransactions = transactions?.filter(transaction => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  }) || [];

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
        <Link 
          to="/transactions"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          View All
        </Link>
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="csvFile"
          />
          <label
            htmlFor="csvFile"
            className={`bg-cyan-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-cyan-600 transition-colors ${
              isUploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isUploading ? 'Importing...' : 'Import CSV'}
          </label>
          <select 
            className="bg-gray-800 text-gray-300 rounded-lg px-3 py-1 text-sm border border-gray-700 focus:outline-none focus:border-cyan-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Transactions</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-400 py-8">Loading transactions...</div>
      ) : (
        <>
          <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
            {filteredTransactions.map((transaction) => (
              <div 
                key={transaction._id}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                    {transaction.type === 'income' ? <FaArrowUp /> : <FaArrowDown />}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{transaction.description}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400">{new Date(transaction.date).toLocaleDateString()}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400">{transaction.category}</span>
                    </div>
                  </div>
                </div>
                <div className={`text-right ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                  <span className="font-semibold">
                    {transaction.type === 'income' ? '+' : '-'} ₹{Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center text-sm text-gray-400">
            <span>Showing {filteredTransactions.length} transactions</span>
          </div>
        </>
      )}
    </div>
  );
};

export default RecentTransactions;
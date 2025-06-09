import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const TransactionsList = () => {
  const transactions = useSelector(state => state.transactions.items);
  const [filter, setFilter] = useState('all'); // all, income, expense
  const [sortBy, setSortBy] = useState('date'); // date, amount
  const [sortOrder, setSortOrder] = useState('desc'); // asc, desc

  const filteredAndSortedTransactions = transactions
    .filter(transaction => {
      if (filter === 'all') return true;
      return transaction.type === filter;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc' 
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date);
      }
      return sortOrder === 'desc' 
        ? b.amount - a.amount
        : a.amount - b.amount;
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">All Transactions</h1>
        <div className="flex gap-4">
          <select 
            className="bg-gray-800 text-white px-4 py-2 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select 
            className="bg-gray-800 text-white px-4 py-2 rounded"
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [newSortBy, newSortOrder] = e.target.value.split('-');
              setSortBy(newSortBy);
              setSortOrder(newSortOrder);
            }}
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-6 py-3 text-left text-white">Date</th>
              <th className="px-6 py-3 text-left text-white">Description</th>
              <th className="px-6 py-3 text-left text-white">Category</th>
              <th className="px-6 py-3 text-right text-white">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredAndSortedTransactions.map(transaction => (
              <tr 
                key={transaction._id}
                className="hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 text-gray-300">
                  {format(new Date(transaction.date), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 text-gray-300">
                  {transaction.description}
                </td>
                <td className="px-6 py-4 text-gray-300">
                  {transaction.category}
                </td>
                <td className={`px-6 py-4 text-right ${
                  transaction.type === 'income' 
                    ? 'text-green-500' 
                    : 'text-red-500'
                }`}>
                  ₹{Math.abs(transaction.amount).toLocaleString('en-IN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsList;
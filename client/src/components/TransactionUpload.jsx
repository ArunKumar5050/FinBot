import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Papa from 'papaparse';
import { addTransactions } from '../store/transactionSlice';
import { toast } from 'react-toastify';

const TransactionUpload = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    Papa.parse(file, {
      complete: async (results) => {
        try {
          // Skip header rows and empty lines
          const skipRows = 3; // Skip the first 3 rows (header information)
          const transactions = results.data
            .slice(skipRows)
            .filter(row => {
              return row.length >= 4 && row[0] && row[3]; // Check for date and amount
            })
            .map(row => {
              // Remove the ₹ symbol and commas from amount
              const amountStr = row[3].replace('₹', '').replace(/,/g, '');
              const amount = parseFloat(amountStr);
              
              if (isNaN(amount)) return null;

              // Parse the date (format: "May 31, 2025")
              const dateStr = row[0].replace(/['"]/g, ''); // Remove quotes
              const date = new Date(dateStr);
              
              if (isNaN(date.getTime())) return null;

              return {
                date: date.toISOString().split('T')[0],
                description: row[1]?.trim() || 'Unnamed Transaction',
                type: row[2] === 'CREDIT' ? 'income' : 'expense',
                amount: row[2] === 'CREDIT' ? Math.abs(amount) : -Math.abs(amount),
                category: getCategoryFromDescription(row[1])
              };
            })
            .filter(Boolean)
            .filter(t => !t.description.includes('Transaction ID') && 
                        !t.description.includes('UTR No.') &&
                        !t.description.includes('Paid by') &&
                        !t.description.includes('Credited to'));

          if (transactions.length === 0) {
            throw new Error('No valid transactions found in CSV');
          }

          console.log('Processed transactions:', transactions);

          const result = await dispatch(addTransactions(transactions)).unwrap();
          await dispatch(fetchTransactions());
          
          toast.success(`Successfully imported ${transactions.length} transactions`);
          e.target.value = '';
        } catch (error) {
          console.error('Import error:', error);
          toast.error(error.message || 'Failed to import transactions');
        } finally {
          setIsLoading(false);
        }
      },
      header: false,
      skipEmptyLines: true,
      error: (error) => {
        console.error('CSV Parse error:', error);
        toast.error('Failed to parse CSV file');
        setIsLoading(false);
      }
    });
  };

  // Helper function to categorize transactions
  const getCategoryFromDescription = (description) => {
    description = description.toLowerCase();
    
    if (description.includes('recharge') || description.includes('airtel')) return 'Mobile';
    if (description.includes('food') || description.includes('zomato')) return 'Food';
    if (description.includes('paid to')) return 'Transfer';
    if (description.includes('received from')) return 'Transfer';
    if (description.includes('spotify')) return 'Entertainment';
    if (description.includes('university')) return 'Education';
    
    return 'Others';
  };

  return (
    <div className="p-4 bg-gray-900 shadow-cyan-500/50 shadow-2xs rounded-lg shadow">
      <h3 className="text-lg text-white font-semibold mb-4">Import Transactions</h3>
      <div className="flex items-center space-x-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
          id="csvFile"
        />
        <label
          htmlFor="csvFile"
          className={`px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Importing...' : 'Upload CSV'}
        </label>
        <p className="text-sm text-gray-500">
          Upload a CSV file with columns: Date, Description, Amount, Category
        </p>
      </div>
    </div>
  );
};

export default TransactionUpload;
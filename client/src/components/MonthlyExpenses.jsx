import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MonthlyExpenses = () => {
  const transactions = useSelector(state => state.transactions.items);

  // Calculate total expenses (sum of all expense transactions)
  const totalExpenses = useMemo(() => {
    if (!Array.isArray(transactions)) return 0;

    return transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
  }, [transactions]);

  // Prepare chart data - Group by month
  const chartData = useMemo(() => {
    if (!Array.isArray(transactions)) return [];

    const monthlyData = transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((acc, transaction) => {
        const date = new Date(transaction.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!acc[monthKey]) {
          acc[monthKey] = {
            month: date.toLocaleString('default', { month: 'short' }),
            amount: 0
          };
        }
        
        acc[monthKey].amount += Number(transaction.amount);
        return acc;
      }, {});

    // Convert to array and sort by month
    return Object.values(monthlyData)
      .sort((a, b) => new Date(a.month) - new Date(b.month));
  }, [transactions]);

  // Debug log
  console.log('Expenses calculation:', {
    totalTransactions: transactions?.length || 0,
    expenseTransactions: transactions?.filter(t => t.type === 'expense').length || 0,
    totalAmount: totalExpenses
  });

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-white">Total Expenses</h2>
        <p className="text-4xl font-bold mt-2 text-red-500">
          ₹{totalExpenses.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </p>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="month" 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
            />
            <YAxis 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
              tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
              labelStyle={{ color: '#9ca3af' }}
              itemStyle={{ color: '#ef4444' }}
              formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Expenses']}
            />
            <Area 
              type="monotone"
              dataKey="amount" 
              stroke="#ef4444" 
              fillOpacity={1} 
              fill="url(#colorExpense)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyExpenses;
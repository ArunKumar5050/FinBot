import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MonthlyIncome = () => {
  const transactions = useSelector(state => state.transactions.items);

  // Calculate total income (sum of all income transactions)
  const totalIncome = useMemo(() => {
    if (!Array.isArray(transactions)) return 0;

    return transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
  }, [transactions]);

  // Prepare chart data - Group by month
  const chartData = useMemo(() => {
    if (!Array.isArray(transactions)) return [];

    const monthlyData = transactions
      .filter(transaction => transaction.type === 'income')
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
  console.log('Income calculation:', {
    totalTransactions: transactions?.length || 0,
    incomeTransactions: transactions?.filter(t => t.type === 'income').length || 0,
    totalAmount: totalIncome
  });

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-white">Total Income</h2>
        <p className="text-4xl font-bold mt-2 text-green-500">
          ₹{totalIncome.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </p>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
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
              itemStyle={{ color: '#22c55e' }}
              formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Income']}
            />
            <Area 
              type="monotone"
              dataKey="amount" 
              stroke="#22c55e" 
              fillOpacity={1} 
              fill="url(#colorIncome)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyIncome;
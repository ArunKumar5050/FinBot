import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TotalBalance = () => {
  const transactions = useSelector(state => state.transactions.items);

  // Calculate total balance
  const totalBalance = useMemo(() => 
    transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
  , [transactions]);

  // Prepare chart data - Group by month
  const chartData = useMemo(() => {
    const monthlyData = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: date.toLocaleString('default', { month: 'short' }),
          amount: 0
        };
      }
      
      acc[monthKey].amount += transaction.amount;
      return acc;
    }, {});

    // Convert to array and sort by date
    return Object.values(monthlyData).sort((a, b) => 
      new Date(a.month) - new Date(b.month)
    );
  }, [transactions]);

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-white">Total Balance</h2>
        <p className={`text-4xl font-bold mt-2 ${
          totalBalance >= 0 ? 'text-green-500' : 'text-red-500'
        }`}>
          ₹{Math.abs(totalBalance).toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </p>
        <p className="text-gray-400 text-sm">
          {new Date().getFullYear()}
        </p>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
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
              tickFormatter={(value) => `₹${Math.abs(value).toLocaleString('en-IN')}`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
              labelStyle={{ color: '#9ca3af' }}
              itemStyle={{ color: '#06b6d4' }}
              formatter={(value) => [`₹${Math.abs(value).toLocaleString('en-IN')}`, 'Balance']}
            />
            <Area 
              type="monotone"
              dataKey="amount" 
              stroke="#06b6d4" 
              fillOpacity={1} 
              fill="url(#colorAmount)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TotalBalance;
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');

// Get all transactions
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id })
      .sort({ date: -1 });
    console.log('Fetched transactions:', transactions); // Debug log
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Error fetching transactions' });
  }
});

// Add bulk transactions
router.post('/bulk', auth, async (req, res) => {
  try {
    console.log('Request body:', req.body); // Debug log

    if (!req.body.transactions || !Array.isArray(req.body.transactions)) {
      return res.status(400).json({ 
        message: 'Invalid transaction data',
        received: req.body 
      });
    }

    // Validate and transform transactions
    const transactions = req.body.transactions.map(t => ({
      date: new Date(t.date),
      description: t.description.trim(),
      amount: parseFloat(t.amount),
      type: parseFloat(t.amount) > 0 ? 'income' : 'expense',
      category: (t.category || 'uncategorized').trim(),
      userId: req.user.id
    }));

    console.log('Processed transactions:', transactions); // Debug log

    // Save to database
    const savedTransactions = await Transaction.insertMany(transactions);
    console.log('Saved transactions:', savedTransactions); // Debug log

    res.status(201).json(savedTransactions);
  } catch (error) {
    console.error('Bulk import error:', error);
    res.status(500).json({ 
      message: 'Failed to import transactions',
      error: error.message
    });
  }
});

module.exports = router;
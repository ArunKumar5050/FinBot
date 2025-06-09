const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    set: val => new Date(val) // Ensure proper date conversion
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  category: {
    type: String,
    trim: true,
    default: 'Others'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Add middleware to set type based on amount
transactionSchema.pre('save', function(next) {
  if (this.amount > 0) {
    this.type = 'income';
  } else {
    this.type = 'expense';
  }
  next();
});

module.exports = mongoose.model('Transaction', transactionSchema);
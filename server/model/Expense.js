import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  monthlyLimit: {
    type: Number,
    default: 1000,  // Optional field, default value
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const Expense = mongoose.model('Expense', ExpenseSchema); 
export default Expense;

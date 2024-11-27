
import mongoose from "mongoose";
import Expense from '../model/Expense.js';

// Create expense
export const createExpense = async (req, res) => {
  console.log("user from token", req.user);
  const userId = req.user?.userId;   // This should work if the token is valid and decoded
  if (!userId) {
    return res.status(401).json({ msg: 'User not authenticated' });
  }
  const { amount, category, monthlyLimit } = req.body;
  if (!amount || !category) {
    return res.status(400).json({ msg: 'Amount and category are required' });
  }

  const expense = new Expense({
    amount,
    category,
    monthlyLimit,
    user: userId, // Associate the expense with the authenticated user
  });

  try {
    await expense.save();
    res.status(201).send(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get expenses
export const getExpenses = async (req, res) => {
  const { category, startDate, endDate, minAmount, maxAmount } = req.query;
  const filters = { user: req.user.userId };

  if (category) filters.category = category;
  if (startDate || endDate) filters.date = { $gte: startDate || '1970-01-01', $lte: endDate || '2100-12-31' };
  if (minAmount || maxAmount) filters.amount = { $gte: minAmount || 0, $lte: maxAmount || Infinity };

  try {
    const expenses = await Expense.find(filters);
    res.send(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const updateExpense = async (req, res) => {
    const { id } = req.params;
    try {
      const expense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
      if (!expense) {
        return res.status(404).send({ message: 'Expense not found' });
      }
      res.send(expense);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  // Delete expense
  export const deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
      const expense = await Expense.findByIdAndDelete(id);
      if (!expense) {
        return res.status(404).send({ message: 'Expense not found' });
      }
      res.send({ message: 'Expense deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  // Analytics
  export const getAnalytics = async (req, res) => {
    try {
      const totalExpensesByCategory = await Expense.aggregate([
        { $match: { user: req.user.userId } },
        { $group: { _id: '$category', total: { $sum: '$amount' } } }
      ]);
  
      const monthlyExpenses = await Expense.aggregate([
        { $match: { user: req.user.userId } },
        { $group: { _id: { month: { $month: '$date' }, year: { $year: '$date' } }, total: { $sum: '$amount' } } },
        { $sort: { '_id.year': 1, '_id.month': 1 } }
      ]);
  
      const monthlyLimitPercentage = await Expense.aggregate([
        { $match: { user: req.user.userId } },
        { $group: { _id: { month: { $month: '$date' }, year: { $year: '$date' } }, total: { $sum: '$amount' } } },
        { $project: { percentage: { $multiply: [{ $divide: ['$total', req.user.monthlyLimit] }, 100] } } }
      ]);
  
      res.send({ totalExpensesByCategory, monthlyExpenses, monthlyLimitPercentage });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  

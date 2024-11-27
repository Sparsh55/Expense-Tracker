// src/redux/expenseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  expenses: [],
  updateExpense: null,
};

export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses', async (userId) => {
  console.log("from line 9", userId);
  const response = await axios.get(`http://localhost:5200/api/expenses/${userId}`);
  console.log("get from line 11", response.data);
  return response.data;
});

export const addExpense = createAsyncThunk('expenses/addExpense', async ({ amount, category, monthlyLimit},) => {
  const token = localStorage.getItem('token'); // Assuming the token is saved in localStorage
  if (!token) {
    throw new Error('No token found'); // Handle error if token is missing
  }


  const response = await axios.post('http://localhost:5200/api/expenses/', { amount, category, monthlyLimit },{
    headers: {
      Authorization: `Bearer ${token}`, // Send token in Authorization header
    }
  });
  console.log("post", response.data);
  return response.data;
});

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setUpdateExpense: (state, action) => {
      state.updateExpense = action.payload;
    },

    clearUpdateExpense: (state) => {
      state.updateExpense = null;
    },

    updateExpenseFinal: (state, action) => {
      state.expenses = state.expenses.map((expense) => {
        if (expense._id === action.payload._id) {
          return action.payload;
        }
        return expense;
      });
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter((expense) => expense._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.expenses = action.payload;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
      });
  },
});

export default expenseSlice.reducer;
export const { setUpdateExpense, clearUpdateExpense ,updateExpenseFinal,deleteExpense} = expenseSlice.actions;

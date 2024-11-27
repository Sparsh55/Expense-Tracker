import{ useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearUpdateExpense, updateExpenseFinal } from '../redux/expenseSlice';

const ExpenseForm = ({ userId }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [monthlyLimit, setMonthlyLimit] = useState(1000);
  const {updateExpense}= useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  useEffect(() => {
    if (updateExpense) {
      setAmount(updateExpense.amount);
      setCategory(updateExpense.category);
      setMonthlyLimit(updateExpense.monthlyLimit);
    }
  }, [updateExpense]);
  console.log("updateExpense", updateExpense);


  const clearInput = () => {
    setAmount('');
    setCategory('');
    setMonthlyLimit(1000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Assuming the token is saved in localStorage

    if (!token) {
      // Handle case when token is not available
      console.error('No authentication token found');
      return;
    }
    if(updateExpense){
      const response = await axios.put(`http://localhost:5200/api/expenses/${updateExpense._id}`, { amount, category, monthlyLimit }, )
      console.log(response); 
      if (response.status === 200) {
         dispatch(updateExpenseFinal({...updateExpense, amount, category, monthlyLimit}));
       }
     
      console.log("put", response);
        dispatch(clearUpdateExpense());
    }

    else{
      const response = await axios.post('http://localhost:5200/api/expenses/', { amount, category, userId },{
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        }});
      // Handle expense addition
      console.log('Expense added:', response);
    }

    clearInput();
  
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
      <button type="submit">{updateExpense ? 'Update' : 'Add'} Expense</button>
      <input type="number" value={monthlyLimit} onChange={(e) => setMonthlyLimit(e.target.value)} placeholder="Monthly Limit" />
    </form>
  );
};

export default ExpenseForm;

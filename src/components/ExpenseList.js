import { useDispatch } from "react-redux";
import { deleteExpense, setUpdateExpense } from "../redux/expenseSlice";
import axios from "axios";

const ExpenseList = ({ expenses }) => {
  const dispatch= useDispatch();
  console.log(expenses);

  const Handledelete= async(id)=>{
    const response = await axios.delete(`http://localhost:5200/api/expenses/${id}`);

    if(response.status === 200){
      dispatch(deleteExpense(id));
  }
}
    return (
      <ul>
        {expenses.map(expense => (
          <li key={expense._id}>
            {expense.amount} - {expense.category}
            <button onClick={()=>dispatch(setUpdateExpense(expense))}>Edit</button>
            <button onClick={()=>Handledelete(expense._id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  };

  export default ExpenseList;
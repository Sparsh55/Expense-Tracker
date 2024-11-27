

const ExpenseItem = ({ expense, onDelete }) => (
  <div className="expense-item">
    <div>{expense.description}</div>
    <div>{expense.amount}</div>
    <div>{expense.category}</div>
    <button onClick={onDelete}>Delete</button>
  </div>
);

export default ExpenseItem;

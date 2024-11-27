import { PieChart, Pie, BarChart, Bar } from 'recharts';

const ExpenseChart = ({ expenses }) => {
  console.log(expenses);
  return (
    <>
      <PieChart width={400} height={400}>
        <Pie data={expenses} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label/>
      </PieChart>
      <BarChart width={500} height={300} data={expenses}>
        <Bar dataKey="amount" nameKey="category"  fill="#8884d8" />
      </BarChart>
    </>
  );
};

export default ExpenseChart;
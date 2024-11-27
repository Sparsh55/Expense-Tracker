
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const MonthlyTrendChart = () => {
  const expenses = useSelector(state => state.expenses.expenses);
  const monthlyData = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleString('default', { month: 'long' });
    if (!acc[month]) acc[month] = 0;
    acc[month] += expense.amount;
    return acc;
  }, {});
  const data = Object.keys(monthlyData).map(key => ({ month: key, total: monthlyData[key] }));

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="total" stroke="#8884d8" />
    </LineChart>
  );
};

export default MonthlyTrendChart;

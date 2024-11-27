import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses, addExpense } from '../redux/expenseSlice';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseChart from '../components/Chart';
import styled from 'styled-components';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const expenses = useSelector((state) => state.expenses.expenses);

  useEffect(() => {
    console.log("user line 15", user);
    if (user) {
      console.log("hello");
      dispatch(fetchExpenses(user.id));
    }
  }, [dispatch, user]);
  console.log(expenses);
  return (
    <DashboardContainer>
      <Title>Your Dashboard</Title>
      <Content>
        <ExpenseFormWrapper>
          <ExpenseForm onAddExpense={(expense) => dispatch(addExpense(expense))} />
        </ExpenseFormWrapper>
        <ExpenseListWrapper>
          <ExpenseList expenses={expenses} />
        </ExpenseListWrapper>
        <ChartWrapper>
          <ExpenseChart expenses={expenses} />
        </ChartWrapper>
      </Content>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  padding: 20px;
  background: #f0f4f8;
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 2.5em;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  max-width: 1200px;
  margin: auto;
`;

const ExpenseFormWrapper = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ExpenseListWrapper = styled.div`
  grid-column: span 2;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ChartWrapper = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export default Dashboard;

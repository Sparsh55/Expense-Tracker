import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ErrorNotification from '../components/ErrorNotification';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await dispatch(login({ email, password }));
      console.log(resp);
      if (resp.meta.requestStatus!=="fulfilled") {
        throw new Error("User is not authorized");
      }
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    
  };

  return (
    <LoginContainer>
      <Card>
        <Title>Welcome Back!</Title>
        <img src = "./vecteezy_paper-boat-flat-design-style-isolated_13828098.jpg" alt = "leaf" style={{width:"90px",height:"90px"}}/>
        <Form onSubmit={handleSubmit}>
          <Input
            type="emal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <Button type="submit">Login</Button>
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </Form>
      </Card>
      {/* Conditionally render the error notification if there's an error */}
      {error && <ErrorNotification message={error} />}
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
`;

const Card = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
`;

const Button = styled.button`
  padding: 15px;
  font-size: 1em;
  color: white;
  background: #ff7e5f;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #feb47b;
  }
`;

export default LoginPage;

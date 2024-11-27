import React, { useState, } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5200/api/auth/signup', { username, email, password });
    navigate('/login');
  };

  return (
    <SignupContainer>
      <Card>
        <Title>Let us know you!</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <Input
            type="email"
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
          <Button type="submit">Sign Up</Button>
          <p>Already have an account? <a href="/login">Login</a></p>
        </Form>
      </Card>
    </SignupContainer>
  );
};

const SignupContainer = styled.div`
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
  height: 50vh;
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

export default SignupPage;

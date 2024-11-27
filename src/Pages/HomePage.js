import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  min-height: 100vh;
  color: white;
  animation: ${fadeIn} 1.5s ease-in;
`;

const Title = styled.h1`
  font-size: 3em;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Description = styled.p`
  font-size: 1.5em;
  text-align: center;
  max-width: 600px;
  margin-bottom: 40px;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 1.2em;
  color: #ff7e5f;
  background: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: blueviolet;
    transform: translateY(-5px);
    color: white;
  }
`;

const HomePage = () => (
  <HomeContainer>
    <img src="/expense-management-illustration-download-in-svg-png-gif-file-formats--business-finance-strategy-concept-pack-illustrations-3561009.webp" alt="Expense Tracker"  style={{ maxWidth: "100%",height: "200px",marginBottom: "-20px",marginTop: "-30px" }}/>
    <Title>Welcome to Expense Tracker</Title>
    <Description>
      Manage your expenses efficiently and effortlessly with our intuitive
      interface.
    </Description>
    <Link to = '/signup'><Button>Get Started</Button></Link>
    
  </HomeContainer>
);

export default HomePage;

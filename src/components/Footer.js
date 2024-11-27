import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Section>
          <Title>About This App</Title>
          <Text>
            We are dedicated to helping you manage your expenses efficiently and
            effortlessly.
            
          </Text>
          <Text>
          This app is made with MERN Stack
          </Text>
        </Section>
        <Section>
          <Title>Quick Links</Title>
          <Links>
            <LinkItem href="/">Home</LinkItem>
            <LinkItem href="/login">Login</LinkItem>
            <LinkItem href="/signup">Signup</LinkItem>
          </Links>
        </Section>
        <Section>
          <Title>Contact Me</Title>
          <Text>Email: sparshsaxena9654@gmail.com</Text>
          <Text>Phone: +91 9068393605</Text>
          <Text>GitHub: https://github.com/Sparsh55</Text>
        </Section>
      </FooterContent>
      <FooterBottom>
        &copy; {new Date().getFullYear()} Expense Tracker. All rights reserved , Developed by Sparsh Saxena.
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background: #333;
  color: white;
  padding: 40px 20px;
  text-align: center;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const Section = styled.div`
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const Title = styled.h3`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 1em;
  margin: 5px 0;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
`;

const LinkItem = styled.a`
  color: white;
  text-decoration: none;
  margin: 5px 0;
  transition: color 0.3s;

  &:hover {
    color: #ffd1a9;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Icon = styled.a`
  color: white;
  font-size: 1.5em;
  margin: 0 10px;
  transition: color 0.3s;

  &:hover {
    color: #ffd1a9;
  }
`;

const FooterBottom = styled.div`
  margin-top: 20px;
  font-size: 0.9em;
`;

export default Footer;


import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import Dashboard from './Pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';// Adjust this path as needed
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import MobileMsg from './components/MobileMsg';
import Loader from './components/Loader';
import { useState, useEffect } from 'react';



const App = () => {
  console.log("delhi")
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Threshold for mobile screens
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Check on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 15000); // Simulate a 5-second loading period
    return () => clearTimeout(timer);
  }, []);

  if (isMobile) {
    return <MobileMsg />;
  }
  if (loading) {
    return <Loader />;
  }
console.log("hiiiii")

  return (
    <Provider store={store}>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
            <Route path = "/dashboard" element = {<PrivateRoute><Dashboard /></PrivateRoute>}/>
        </Routes>
        <Footer/>
      </Router>
    </Provider>
  );
};

export default App;

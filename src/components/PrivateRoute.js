
import {  Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    console.log("isAuthenticated", isAuthenticated);
    if(!isAuthenticated){return <Navigate to = "/login" replace = {true}/>}
    
    return children
  };
  
  export default PrivateRoute;
import React from 'react'
import { Route, useNavigate, Navigate} from "react-router-dom"


const ProtectedRoute = ({ isLogged, children }) => {
  if (!isLogged) {
    return <Navigate to="/signup" />;
  }
  return children;
};

export default ProtectedRoute

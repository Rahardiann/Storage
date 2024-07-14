import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  const token = sessionStorage.getItem('token');
  return token ? Component : <Navigate to="/" />;
};

export default ProtectedRoute;

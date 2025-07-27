import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const isAdmin = localStorage.getItem('isAdmin');
  if (!isAdmin) {
    return <Navigate to="/admin" />;
  }
  return children;
}

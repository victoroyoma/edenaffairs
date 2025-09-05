import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export function ProtectedRoute({
  children,
  adminOnly = false
}: ProtectedRouteProps) {
  // Check if user is authenticated using the correct token key
  const isAuthenticated = !!localStorage.getItem('edenaffair_token');
  
  // Check if user is admin by looking at stored user data
  let isAdmin = false;
  const userJson = localStorage.getItem('edenaffair_user');
  if (userJson) {
    try {
      const user = JSON.parse(userJson);
      isAdmin = user.role === 'admin';
    } catch {
      isAdmin = false;
    }
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
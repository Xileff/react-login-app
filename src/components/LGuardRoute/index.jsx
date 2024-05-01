import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function LGuardRoute({ isMustLogin = true, children }) {
  const token = useSelector((state) => state.auth.accessToken);

  if (!token && isMustLogin) {
    return <Navigate to={'/login'} replace={true} />;
  }

  if (token && !isMustLogin) {
    return <Navigate to={'/'} replace={true} />;
  }

  return children || <Outlet />;
}

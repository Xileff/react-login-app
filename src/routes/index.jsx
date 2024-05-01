import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLogin from '../pages/PageLogin';
import LGuardRoute from '../components/LGuardRoute';
import PageDashboard from '../pages/PageDashboard';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path='/login'
        element={<LGuardRoute isMustLogin={false} children={<PageLogin />} />}
      />
      <Route
        path='/'
        element={
          <LGuardRoute isMustLogin={true} children={<PageDashboard />} />
        }
      />
    </Routes>
  );
}

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, logout } from '../../store/reducers/auth';
import { useNavigate } from 'react-router-dom';

export default function PageDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, username } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser()).then((action) => {
      if (action.type === 'user/rejected') {
        dispatch(logout()).then(() => {
          navigate('/login');
        });
        return;
      }

      const username = action.payload;
      localStorage.setItem('username', username);
    });
  }, [dispatch]);

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-white p-6 rounded shadow-md text-center'>
        {isLoading ? (
          <span className='loading loading-spinner'></span>
        ) : (
          <h1 className='text-2xl font-semibold text-gray-900'>
            Welcome, {username}
          </h1>
        )}
      </div>
    </div>
  );
}

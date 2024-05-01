import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, logout } from '../../store/reducers/auth';
import { useNavigate } from 'react-router-dom';

export default function PageDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, username } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  const handleUserFulfilled = (action) => {
    const username = action.payload;
    localStorage.setItem('username', username);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const action = await dispatch(getCurrentUser());
      if (action.type === 'user/rejected') {
        handleLogout();
        return;
      }

      handleUserFulfilled(action);
    };

    fetchUser();
  }, [dispatch]);

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-white px-6 py-2 rounded-box shadow-md text-center'>
        {isLoading ? (
          <span className='loading loading-spinner'></span>
        ) : (
          <h1 className='text-2xl font-semibold text-gray-900 mt-5'>
            Welcome, {username}
          </h1>
        )}
        <button
          className='btn btn-accent w-full my-5 hover:accent-current active:accent-transparent focus:ring-1 focus:ring-offset-accent text-white'
          onClick={handleLogout}
        >
          {isLoading ? (
            <span className='loading loading-spinner'></span>
          ) : (
            'Log Out'
          )}
        </button>
      </div>
    </div>
  );
}

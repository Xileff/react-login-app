import { configureStore } from '@reduxjs/toolkit';
import auth from './reducers/auth';

const store = configureStore({
  reducer: {
    auth,
  },
  preloadedState: {
    auth: {
      accessToken: localStorage.getItem('accessToken')
        ? localStorage.getItem('accessToken')
        : null,
      username: localStorage.getItem('username')
        ? localStorage.getItem('username')
        : null,
    },
  },
});

export default store;

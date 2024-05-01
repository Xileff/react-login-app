import { FaLock, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/reducers/auth';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from '../../validators/loginSchema';

const PageLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleLoginFulfilled = (action) => {
    const accessToken = action.payload.accessToken;
    localStorage.setItem('accessToken', accessToken);
    Swal.fire({
      title: 'Success',
      icon: 'success',
      text: 'Successful login.',
    });
    navigate('/');
  };

  const handleLoginRejected = (action) => {
    Swal.fire({
      title: 'Failed',
      icon: 'error',
      text: action.payload.data.data,
    });
    reset();
  };

  const onSubmit = (data) => {
    dispatch(login(data)).then((action) => {
      switch (action.type) {
        case 'auth/login/fulfilled':
          handleLoginFulfilled(action);
          break;
        case 'auth/login/rejected':
          handleLoginRejected(action);
          break;
      }
    });
  };

  return (
    <div className='flex min-h-screen overflow-y-auto'>
      <div className='hidden lg:flex lg:w-3/5'>
        <img
          src='login/background.jpg'
          alt='background'
          className='object-cover w-full h-screen overflow-y-auto'
        />
      </div>
      <div className='flex flex-col items-center justify-center w-full lg:w-2/5 py-8 px-4 sm:px-6 lg:px-8'>
        <img src='/tamura.png' alt='logo' className='w-48' />
        <div className='max-w-md w-full space-y-8'>
          <h2 className='mt-6 text-center text-3xl font-poppins'>Login App</h2>
          <form onSubmit={handleSubmit(onSubmit)} className=''>
            <label className='input input-bordered flex items-center gap-2 my-2'>
              <FaUser />
              <input
                type='text'
                {...register('username')}
                placeholder='Username'
                className='grow'
              />
              {errors.username && (
                <span className='block max-w-64'>
                  {errors.username?.message}
                </span>
              )}
            </label>
            <label className='input input-bordered flex items-center gap-2 my-2'>
              <FaLock />
              <input
                type='password'
                {...register('password')}
                placeholder='Password'
                className='grow'
              />
              {errors.password && (
                <span className='block max-w-64'>
                  {errors.password?.message}
                </span>
              )}
            </label>
            <button type='submit' className='btn w-full'>
              {isLoading ? (
                <span className='loading loading-spinner'></span>
              ) : (
                'Log In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;

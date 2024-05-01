import { FaLock, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/reducers/auth';

const PageLogin = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(login(data)).then((action) => {
      const accessToken = action.payload.accessToken;
      localStorage.setItem('accessToken', accessToken);
      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: 'We will redirect you shortly.',
        timer: 2000,
      });
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
                {...register('username', { required: true })}
                placeholder='Username'
                className='grow'
              />
              {errors.username && <span>Username is required.</span>}
            </label>
            <label className='input input-bordered flex items-center gap-2 my-2'>
              <FaLock />
              <input
                type='password'
                {...register('password', { required: true })}
                placeholder='Password'
                className='grow'
              />
              {errors.password && <span>Password is required.</span>}
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

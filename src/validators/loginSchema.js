import * as yup from 'yup';

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(6, 'Min 6 characters.')
    .matches(/^[a-zA-Z0-9]+$/, 'Alphanumeric characters only'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Min 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Need one uppercase, lowercase, and one number',
    ),
});

export default loginSchema;

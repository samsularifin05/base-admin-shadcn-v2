import * as yup from 'yup';

export const validLoginSchema = yup.object().shape({
  user_id: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});

import Regex from 'constants/regexes';
import * as yup from 'yup';

const schema = yup.object({
  email: yup
    .string()
    .required('Please enter an email address')
    .matches(Regex.EMAIL_REGEX, 'Please enter a valid email address'),
  password: yup
    .string()
    .required('Please enter a password')
    .min(6, 'Password must be at least 6 characters'),
});

export default schema;
export type LoginFormType = yup.InferType<typeof schema>;

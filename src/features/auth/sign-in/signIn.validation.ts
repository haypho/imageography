import Yup from 'yup';

export interface SignInFormValues {
  email: string;
  password: string;
}

export const validationSchema = Yup.object<SignInFormValues>({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters'),
});

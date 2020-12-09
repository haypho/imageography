import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export type SignInFormValues = Yup.InferType<typeof validationSchema>;

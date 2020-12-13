import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string().email('Invalid Email Address').required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string().required('Required'),
});

export type SignUpFormValues = Yup.InferType<typeof validationSchema>;

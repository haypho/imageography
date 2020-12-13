import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string().email('Invalid Email Address').required('Required'),
});

export type ForgotPasswordFormValues = Yup.InferType<typeof validationSchema>;

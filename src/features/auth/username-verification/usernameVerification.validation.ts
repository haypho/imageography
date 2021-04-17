import * as Yup from 'yup';

export const validationSchema = Yup.object({
  username: Yup.string().required('Required'),
});

export type UsernameVerificationFormValues = Yup.InferType<
  typeof validationSchema
>;

import * as Yup from 'yup';
import { UsernameRepository } from '@app/services/repositories/username.repository';

export const validationSchema = Yup.object({
  email: Yup.string().email('Invalid Email Address').required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .required('Required')
    .test(
      'password',
      'Passwords do not match',
      (value: string | undefined, context) => value === context.parent.password,
    ),
  username: Yup.string()
    .required('Required')
    .test(
      'username',
      'Username already exists',
      async (value: string | undefined) =>
        value !== undefined &&
        !(await UsernameRepository.usernameExists(value)),
    ),
});

export type SignUpFormValues = Yup.InferType<typeof validationSchema>;

import * as Yup from 'yup';
import { HEX_REGEX } from '@app/constants';

export const validationSchema = Yup.object({
  color: Yup.string()
    .required('Required')
    .matches(HEX_REGEX, { message: 'Invalid Hex Color Format' }),
  name: Yup.string().required('Required'),
});

export type AddGroupFormValues = Yup.InferType<typeof validationSchema>;

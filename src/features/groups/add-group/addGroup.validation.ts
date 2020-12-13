import * as Yup from 'yup';
import { HEX_REGEX } from '../../../constants/regex';

export const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  color: Yup.string()
    .required('Required')
    .matches(HEX_REGEX, { message: 'Invalid Hex Color Format' }),
});

export type AddGroupFormValues = Yup.InferType<typeof validationSchema>;

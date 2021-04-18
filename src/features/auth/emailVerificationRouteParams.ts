import { AuthStackParamList } from '../navigation/auth/authStackParamList';

export const emailVerificationRouteParams: AuthStackParamList['SignIn'] = {
  type: 'verify-email',
  icon: 'email-check-outline',
  message:
    'A verification email has been sent. Please verify your email address before continuing.',
};

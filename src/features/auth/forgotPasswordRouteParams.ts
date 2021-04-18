import { AuthStackParamList } from '../navigation/auth/authStackParamList';

export const forgotPasswordRouteParams: AuthStackParamList['SignIn'] = {
  type: 'forgot-password',
  icon: 'lock-outline',
  message:
    'If an account matches the email address you have provided, an email will be sent to reset your password.',
};

import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

export type AuthStackParamList = {
  SignIn:
    | {
        type: 'verify-email' | 'forgot-password';
        icon: IconSource;
        message: string;
      }
    | undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  UsernameVerification: undefined;
};

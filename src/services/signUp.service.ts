import { SignUpFormValues } from '@app/features/auth/sign-up/signUp.validation';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FormikErrors } from 'formik';

export class SignUpService {
  public static signUp({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<
    FirebaseAuthTypes.UserCredential | FormikErrors<SignUpFormValues>
  > {
    return auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        throw SignUpService.formatError(error);
      });
  }

  private static formatError(error: any): FormikErrors<SignUpFormValues> {
    const code: string | undefined = error.code;

    if (code) {
      const message: string = error.message.replace(`[${code}]`, '').trim();

      if (code.includes('email')) {
        return { email: message };
      }

      if (code.includes('password')) {
        return { password: message, confirmPassword: message };
      }

      return {
        email: '',
        password: '',
        confirmPassword: message,
      };
    }

    return {
      email: '',
      password: '',
      confirmPassword: 'An unexpected error has occurred. Please try again.',
    };
  }
}

import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { UsernameRepository } from './repositories/username.repository';
import auth from '@react-native-firebase/auth';
import { FormikErrors } from 'formik';
import { UsernameVerificationFormValues } from '@app/features/auth/username-verification/usernameVerification.validation';

export class UsernameService {
  public static async saveUsername(
    username: string,
  ): Promise<void | FormikErrors<UsernameVerificationFormValues>> {
    try {
      const user: FirebaseAuthTypes.User | null = auth().currentUser;
      if (!user) {
        throw 'You must be signed in to select a username.';
      }

      const usernameExists: boolean = await UsernameRepository.usernameExists(
        username,
      );
      if (usernameExists) {
        throw 'Username already exists.';
      }

      const addedUsernameSuccessfully: boolean = await UsernameRepository.addUsername(
        username,
      );
      if (!addedUsernameSuccessfully) {
        throw 'Unable to add username at this time. Please try again.';
      }

      await user.updateProfile({ displayName: username });
    } catch (e) {
      throw UsernameService.formatError(e);
    }
  }

  private static formatError(
    error: any,
  ): FormikErrors<UsernameVerificationFormValues> {
    if (typeof error === 'string') {
      return { username: error };
    }

    const code: string | undefined = error.code;
    if (code) {
      const message: string = error.message.replace(`[${code}]`, '').trim();
      return { username: message };
    }

    return { username: 'An unexpected error has occurred. Please try again.' };
  }
}

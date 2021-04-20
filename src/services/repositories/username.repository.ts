import firestore from '@react-native-firebase/firestore';
import { FirestoreCollection } from '@app/constants';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';

export class UsernameRepository {
  public static async usernameExists(username: string): Promise<boolean> {
    try {
      const snapshot = await firestore().collection(FirestoreCollection.Usernames).doc(username.toLowerCase()).get();
      return snapshot.exists;
    } catch (e) {
      return true;
    }
  }

  public static async addUsername(username: string): Promise<boolean> {
    try {
      const user: FirebaseAuthTypes.User | null = auth().currentUser;
      if (!user) {
        return false;
      }

      await firestore()
        .collection(FirestoreCollection.Usernames)
        .doc(username.toLowerCase())
        .set({ authorID: user.uid });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

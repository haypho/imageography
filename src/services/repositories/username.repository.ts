import firestore from '@react-native-firebase/firestore';
import { FirestoreCollection } from '@app/constants';

export class UsernameRepository {
  public static async usernameExists(username: string): Promise<boolean> {
    try {
      const snapshot = await firestore()
        .collection(FirestoreCollection.Usernames)
        .doc(username.toLowerCase())
        .get();
      console.log(snapshot);
      return snapshot.exists;
    } catch (e) {
      return true;
    }
  }
}

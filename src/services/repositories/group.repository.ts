import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Group } from '../../models/group';
import { FirestoreCollection } from '../../constants';
import { FirebaseSource } from '../../interfaces/firebaseSource';

export class GroupRepository {
  public static async getAll(
    source: FirebaseSource = 'cache',
  ): Promise<Group[]> {
    const user = auth().currentUser;
    if (user) {
      return firestore()
        .collection(FirestoreCollection.Groups)
        .where('authorID', '==', user.uid)
        .get({ source })
        .then((snapshot) =>
          snapshot.empty
            ? []
            : snapshot.docs.map(GroupRepository.convertFirestoreDocToGroup),
        );
    }
    return [];
  }

  private static convertFirestoreDocToGroup(
    doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
  ): Group {
    const {
      author,
      authorID,
      color,
      markers,
      name,
      tsCreated,
      tsUpdated,
    } = doc.data();
    return {
      id: doc.id,
      author,
      authorId: authorID,
      color,
      markers,
      name,
      tsCreated: new Date(tsCreated.seconds * 1000),
      tsUpdated: tsUpdated ? new Date(tsUpdated.seconds * 1000) : undefined,
    };
  }
}

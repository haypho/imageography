import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { FirestoreCollection } from '@app/constants';
import { FirebaseSource, Group } from '@app/models';
import { AddGroupFormValues } from '@app/features/groups/add-group/addGroup.validation';

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
        .then((snapshot) => {
          if (snapshot.empty) {
            return [];
          }

          return snapshot.docs
            .reduce(
              (documents: Array<FirebaseFirestoreTypes.DocumentData>, doc) => {
                if (doc.exists) {
                  const data = doc.data();
                  if (data) {
                    documents.push(data);
                  }
                }
                return documents;
              },
              [],
            )
            .map(GroupRepository.convertFirestoreDocToGroup);
        });
    }
    return [];
  }

  public static add(
    group: AddGroupFormValues,
  ): Promise<FirebaseFirestoreTypes.DocumentReference> {
    return new Promise((resolve, reject) => {
      const user = auth().currentUser;
      if (user) {
        return firestore()
          .collection(FirestoreCollection.Groups)
          .add({
            author: user.displayName,
            authorID: user.uid,
            markers: [],
            tsCreated: firestore.Timestamp.now(),
            ...group,
          })
          .then(resolve)
          .catch(reject);
      }
      return reject('User must be signed in to add a group.');
    });
  }

  public static getByReference(
    ref: FirebaseFirestoreTypes.DocumentReference,
  ): Promise<Group> {
    return new Promise((resolve, reject) => {
      return ref
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            const data = snapshot.data();
            if (data) {
              resolve(GroupRepository.convertFirestoreDocToGroup(data));
            }
          }
          reject('Group does not exist');
        })
        .catch(reject);
    });
  }

  private static convertFirestoreDocToGroup(
    doc: FirebaseFirestoreTypes.DocumentData,
  ): Group {
    const {
      author,
      authorID,
      color,
      markers,
      name,
      tsCreated,
      tsUpdated,
    } = doc;
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

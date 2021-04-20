import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { FirestoreCollection } from '@app/constants';
import { FirebaseSource, FirestorePaginatedQuery, FirestorePaginatedResponse, Group } from '@app/models';
import { AddGroupFormValues } from '@app/features/groups/add-group/addGroup.validation';

export class GroupRepository {
  public static async getAll(source: FirebaseSource = 'cache'): Promise<Array<Group>> {
    return new Promise((resolve, reject) => {
      const user: FirebaseAuthTypes.User | null = auth().currentUser;
      if (!user) {
        return reject('User must be signed in.');
      }

      return firestore()
        .collection(FirestoreCollection.Groups)
        .where('authorID', '==', user.uid)
        .get({ source })
        .then((snapshot) => {
          if (snapshot.empty) {
            return resolve([]);
          }

          const groups: Array<Group> = snapshot.docs
            .map(GroupRepository.convertFirestoreDocToGroup)
            .filter((group: Group | undefined): boolean => group !== undefined) as Array<Group>;

          return resolve(groups);
        })
        .catch(reject);
    });
  }

  public static fetchGroups({
    limit,
    offset,
  }: FirestorePaginatedQuery): Promise<FirestorePaginatedResponse<Array<Group>>> {
    return new Promise((resolve, reject) => {
      const user: FirebaseAuthTypes.User | null = auth().currentUser;
      if (!user) {
        return reject('User must be signed in.');
      }

      let groupsRef = firestore()
        .collection(FirestoreCollection.Groups)
        .where('authorID', '==', user.uid)
        .orderBy('name');

      if (offset) {
        groupsRef = groupsRef.startAfter(offset);
      }

      return groupsRef
        .limit(limit)
        .get()
        .then((snapshot) => {
          console.log('snapshot came back');
          if (snapshot.empty) {
            return resolve({ data: [] });
          }
          const newOffset: FirebaseFirestoreTypes.QueryDocumentSnapshot = snapshot.docs[snapshot.docs.length - 1];
          const groups: Array<Group> = snapshot.docs
            .map(this.convertFirestoreDocToGroup)
            .filter((group: Group | undefined) => group !== undefined) as Array<Group>;
          console.log('repo', groups);
          return resolve({ data: groups, offset: newOffset });
        })
        .catch((error) => {
          console.error(error);
          return reject(error);
        });
    });
  }

  public static add(group: AddGroupFormValues): Promise<FirebaseFirestoreTypes.DocumentReference> {
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

  public static getByReference(ref: FirebaseFirestoreTypes.DocumentReference): Promise<Group> {
    return new Promise((resolve, reject) => {
      return ref
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            const group: Group | undefined = GroupRepository.convertFirestoreDocToGroup(snapshot);
            if (group) {
              return resolve(group);
            }
          }
          return reject('Group does not exist');
        })
        .catch(reject);
    });
  }

  private static convertFirestoreDocToGroup(snapshot: FirebaseFirestoreTypes.DocumentSnapshot): Group | undefined {
    if (!snapshot.exists) {
      return undefined;
    }

    const data: FirebaseFirestoreTypes.DocumentData | undefined = snapshot.data();
    if (!data) {
      return undefined;
    }

    return {
      id: snapshot.id,
      author: data.author,
      authorId: data.authorID,
      color: data.color,
      markers: data.markers,
      name: data.name,
      tsCreated: new Date(data.tsCreated.seconds * 1000),
      tsUpdated: data.tsUpdated ? new Date(data.tsUpdated.seconds * 1000) : undefined,
    };
  }
}

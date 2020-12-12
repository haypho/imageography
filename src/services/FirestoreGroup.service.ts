import { Group } from '../features/models/group';
import CacheService from './Cache.service';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class FirestoreGroupService {
  public static async getAllAsync(): Promise<Group[]> {
    const cache: CacheService = CacheService.getInstance();
    const cacheKey = 'groups';

    const cachedGroups: Group[] | undefined = await cache.getAsync(cacheKey);
    if (cachedGroups) {
      return cachedGroups.map(
        (cg) => new Group(cg.id, cg.name, cg.color, cg.tsCreated, cg.tsUpdated),
      );
    }

    let groups: Group[] = [];

    const user = auth().currentUser;
    if (user) {
      groups = await firestore()
        .collection(`users/${user.uid}/groups`)
        .get()
        .then((snapshot) =>
          snapshot.empty ? [] : snapshot.docs.map(Group.fromFirestoreDocument),
        );
    }

    cache.setAsync(cacheKey, groups);
    return groups;
  }
}

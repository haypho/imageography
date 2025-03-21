import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { FirebaseSource } from './firebaseSource';

export interface FirestorePaginatedQuery {
  source: FirebaseSource;
  limit: number;
  offset?: FirebaseFirestoreTypes.QueryDocumentSnapshot | null;
}

export interface FirestorePaginatedResponse<T> {
  data: T;
  offset?: FirebaseFirestoreTypes.QueryDocumentSnapshot | null;
}

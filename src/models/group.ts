import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface Group {
  id: string;
  author: string;
  authorId: string;
  color: string;
  markers: FirebaseFirestoreTypes.DocumentReference[];
  name: string;
  tsCreated: Date;
  tsUpdated?: Date;
}

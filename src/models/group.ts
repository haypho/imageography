import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export class Group {
  public id: string;
  public name: string;
  public color: string;
  public tsCreated: Date;
  public tsUpdated?: Date;

  public constructor(
    id: string,
    name: string,
    color: string,
    tsCreated: Date | string,
    tsUpdated?: Date | string,
  ) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.tsCreated =
      typeof tsCreated === 'string' ? new Date(tsCreated) : tsCreated;
    this.tsUpdated =
      typeof tsUpdated === 'string' ? new Date(tsUpdated) : tsUpdated;
  }

  public static fromFirestoreDocument(
    doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
  ): Group {
    const { name, color, tsCreated, tsUpdated } = doc.data();
    const tsCreatedDate = new Date(tsCreated.seconds * 1000);
    const tsUpdatedDate = tsUpdated
      ? new Date(tsUpdated.seconds * 1000)
      : undefined;
    return new Group(doc.id, name, color, tsCreatedDate, tsUpdatedDate);
  }
}

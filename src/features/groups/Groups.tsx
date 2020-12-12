import React, { useEffect, useState } from 'react';
import { Button, Appbar, Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Group } from '../models/Group';

const Groups: React.FC = () => {
  const signOut = () => auth().signOut();
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      firestore()
        .collection(`users/${user.uid}/groups`)
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            setGroups(snapshot.docs.map(Group.fromFirestoreDocument));
          }
        });
    }
  }, []);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Groups" />
      </Appbar.Header>
      <Button onPress={signOut}>Sign Out</Button>
      {groups.map((group) => (
        <Text>{`${group.id}:${group.tsCreated}`}</Text>
      ))}
    </>
  );
};

export default Groups;

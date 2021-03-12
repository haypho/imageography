import React from 'react';
import { StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { MARGIN } from '../../constants';

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    margin: MARGIN.large,
  },
});

export interface GroupListEmptyComponentProps {
  isFiltered?: boolean;
}

const GroupListEmptyComponent: React.FC<GroupListEmptyComponentProps> = ({
  isFiltered,
}) => {
  const message = isFiltered
    ? 'No Groups Found'
    : 'No groups yet!\nAdd a group to get started!';
  return (
    <Title style={styles.title} numberOfLines={2}>
      {message}
    </Title>
  );
};

export default GroupListEmptyComponent;

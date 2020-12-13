import { useNavigation } from '@react-navigation/native';
import { useFormikContext } from 'formik';
import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Button, HelperText, TextInput } from 'react-native-paper';
import { margin, padding } from '../../../constants/styles';
import { AddGroupFormValues } from './addGroup.validation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: margin.large,
  },
  content: {
    flex: 1,
  },
  actionArea: {
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: margin.small,
  },
  actionButtonContent: {
    paddingVertical: padding.small,
  },
});

const AddGroup: React.FC = () => {
  const navigation = useNavigation();
  const {
    values,
    setFieldValue,
    errors,
    submitForm,
  } = useFormikContext<AddGroupFormValues>();

  const setGroupName = useCallback(
    (name: string) => setFieldValue('name', name),
    [setFieldValue],
  );

  const setGroupColor = useCallback(
    (color: string) => setFieldValue('color', color),
    [setFieldValue],
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Add Group" />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.content}>
          <TextInput
            label="Name"
            mode="outlined"
            placeholder="New Group"
            value={values.name}
            onChangeText={setGroupName}
          />
          <HelperText type="error" visible={!!errors.name}>
            {errors.name}
          </HelperText>
          <TextInput
            label="Color"
            mode="outlined"
            placeholder="#FFF222"
            value={values.color}
            onChangeText={setGroupColor}
          />
          <HelperText type="error" visible={!!errors.color}>
            {errors.color}
          </HelperText>
        </View>
        <View style={styles.actionArea}>
          <Button
            icon="plus"
            onPress={submitForm}
            mode="contained"
            style={styles.actionButton}
            contentStyle={styles.actionButtonContent}>
            Add
          </Button>
          <Button
            icon="close"
            onPress={navigation.goBack}
            mode="outlined"
            style={styles.actionButton}
            contentStyle={styles.actionButtonContent}>
            Cancel
          </Button>
        </View>
      </View>
    </>
  );
};

export default AddGroup;

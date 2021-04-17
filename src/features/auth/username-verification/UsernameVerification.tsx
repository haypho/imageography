import { MARGIN, PADDING } from '@app/constants';
import { useFormikContext } from 'formik';
import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Button, HelperText, TextInput } from 'react-native-paper';
import { UsernameVerificationFormValues } from './usernameVerification.validation';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    margin: MARGIN.large,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  actionArea: {
    flex: 1 / 3,
    justifyContent: 'flex-end',
  },
  buttonWrapper: {
    marginVertical: MARGIN.small,
  },
  button: {
    paddingVertical: PADDING.medium,
  },
});

const UsernameVerfication: React.FC = () => {
  const {
    values,
    errors,
    setFieldValue,
    submitForm,
    isSubmitting,
  } = useFormikContext<UsernameVerificationFormValues>();

  const onPressDelete = useCallback(() => {
    return auth().currentUser?.delete();
  }, []);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Select Username" />
      </Appbar.Header>
      <View style={styles.constainer}>
        <View style={styles.content}>
          <TextInput
            label="Username"
            placeholder="WorldTraveler1"
            value={values.username}
            onChangeText={(username: string) =>
              setFieldValue('username', username)
            }
            onSubmitEditing={submitForm}
          />
          <HelperText type="error" visible={!!errors.username}>
            {errors.username}
          </HelperText>
        </View>
        <View style={styles.actionArea}>
          <Button
            style={styles.buttonWrapper}
            contentStyle={styles.button}
            mode="contained"
            onPress={submitForm}
            loading={isSubmitting}
            disabled={isSubmitting}>
            Save
          </Button>
          <Button
            style={styles.buttonWrapper}
            contentStyle={styles.button}
            color="red"
            onPress={onPressDelete}
            disabled={isSubmitting}>
            Delete Account
          </Button>
        </View>
      </View>
    </>
  );
};

export default UsernameVerfication;

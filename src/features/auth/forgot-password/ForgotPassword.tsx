import { MARGIN, PADDING } from '@app/constants';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, TextInput, Button, HelperText } from 'react-native-paper';
import { useFormikContext } from 'formik';
import { ForgotPasswordFormValues } from './forgotPassword.validation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: MARGIN.large,
  },
  buttonWrapper: {
    marginVertical: MARGIN.large,
  },
  button: {
    paddingVertical: PADDING.small,
  },
});

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation();
  const {
    values,
    errors,
    setFieldValue,
    isSubmitting,
    isValid,
    submitForm,
  } = useFormikContext<ForgotPasswordFormValues>();

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Forgot Password" />
      </Appbar.Header>
      <View style={styles.container}>
        <TextInput
          label="Email"
          placeholder="example@email.com"
          value={values.email}
          onChangeText={(email: string) => setFieldValue('email', email)}
          error={!!errors.email}
        />
        <HelperText type="error" visible={!!errors.email}>
          {errors.email}
        </HelperText>
        <Button
          mode="contained"
          icon="email"
          style={styles.buttonWrapper}
          contentStyle={styles.button}
          disabled={isSubmitting || !isValid}
          loading={isSubmitting}
          onPress={submitForm}>
          Reset Password
        </Button>
      </View>
    </>
  );
};

export default ForgotPassword;

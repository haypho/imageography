import { AuthStackParamList } from '@app/features/navigation/auth/authStackParamList';
import { RouteProp, useRoute } from '@react-navigation/core';
import React from 'react';
import { Banner } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const SignInBanner: React.FC = () => {
  const { params } = useRoute<RouteProp<AuthStackParamList, 'SignIn'>>();

  if (!params) {
    return null;
  }

  const { type, icon, message } = params;

  let actions: Array<{ label: string; onPress: () => void }> = [];
  if (type === 'verify-email') {
    actions = [
      {
        label: 'Resend',
        onPress: () =>
          auth()
            .currentUser?.sendEmailVerification()
            .then((value) => console.log('new', value)),
      },
    ];
  }

  return (
    <Banner visible icon={icon} actions={actions}>
      {message}
    </Banner>
  );
};

export default SignInBanner;

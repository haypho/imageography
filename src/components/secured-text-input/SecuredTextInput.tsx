import React, { ForwardedRef, useCallback, useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInput as TextInputType,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { TextInputProps } from 'react-native-paper/lib/typescript/src/components/TextInput/TextInput';

interface ForwardedRefProps {
  forwardedRef: ForwardedRef<TextInputType>;
}

const SecuredTextInput: React.FC<TextInputProps & ForwardedRefProps> = ({
  forwardedRef,
  ...props
}: TextInputProps & ForwardedRefProps) => {
  const [useSecureEntry, setUseSecureEntry] = useState<boolean>(true);
  const toggleSecureEntry = useCallback(
    () => setUseSecureEntry(!useSecureEntry),
    [setUseSecureEntry, useSecureEntry],
  );

  return (
    <TextInput
      {...props}
      ref={forwardedRef}
      secureTextEntry={useSecureEntry}
      onBlur={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setUseSecureEntry(true);
        if (props.onBlur) {
          props.onBlur(e);
        }
      }}
      right={
        <TextInput.Icon
          name={useSecureEntry ? 'eye-off-outline' : 'eye-outline'}
          onPress={toggleSecureEntry}
        />
      }
    />
  );
};

export default React.forwardRef(
  (props: TextInputProps, ref: ForwardedRef<TextInputType>) => (
    <SecuredTextInput {...props} forwardedRef={ref} />
  ),
);

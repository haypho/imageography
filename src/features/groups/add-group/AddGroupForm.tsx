import React, { useCallback } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { AddGroupFormValues, validationSchema } from './addGroup.validation';
import AddGroup from './AddGroup';
import ColorService from '@app/services/color.service';
import { GroupRepository } from '@app/services/repositories/group.repository';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { GroupStackParamList } from '@app/features/navigation/tabs/groupStackParamList';
import { addGroup } from '@app/store/slices/groups.slice';
import { useDispatch } from 'react-redux';
import { Group } from '@app/models';

const AddGroupForm: React.FC = () => {
  const initialValues: AddGroupFormValues = {
    name: '',
    color: ColorService.random(),
  };
  const navigation = useNavigation<StackNavigationProp<GroupStackParamList>>();
  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (values: AddGroupFormValues, formikHelpers: FormikHelpers<AddGroupFormValues>) => {
      GroupRepository.add(values)
        .then((groupDocRef) => {
          GroupRepository.getByReference(groupDocRef)
            .then((group: Group) => dispatch(addGroup(group)))
            .finally(() => navigation.navigate('groups'));
        })
        .finally(() => formikHelpers.setSubmitting(false));
    },
    [dispatch, navigation],
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      validateOnMount={false}
      onSubmit={onSubmit}>
      <AddGroup />
    </Formik>
  );
};

export default AddGroupForm;

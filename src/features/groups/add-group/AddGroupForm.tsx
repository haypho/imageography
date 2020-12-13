import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { AddGroupFormValues, validationSchema } from './addGroup.validation';
import AddGroup from './AddGroup';
import ColorService from '../../../services/color.service';

const AddGroupForm: React.FC = () => {
  const initialValues: AddGroupFormValues = {
    name: '',
    color: ColorService.random(),
  };

  const onSubmit = useCallback(() => console.log('add group'), []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      <AddGroup />
    </Formik>
  );
};

export default AddGroupForm;

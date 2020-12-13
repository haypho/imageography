import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { AddGroupFormValues, validationSchema } from './addGroup.validation';
import AddGroup from './AddGroup';

const initialValues: AddGroupFormValues = {
  name: '',
  color: '',
};

const AddGroupForm: React.FC = () => {
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

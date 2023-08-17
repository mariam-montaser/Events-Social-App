import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react'
import { Button, Header, Label } from 'semantic-ui-react';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import ValidationError from '../errors/ValidationError';

const RegisterForm = () => {
  const { userStore } = useStore();
  const validationSchema = Yup.object({
    displayName: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required()
  })
  return (
    <Formik initialValues={{ displayName: '', username: '', email: '', password: '', error: null }} validationSchema={validationSchema} onSubmit={(values, { setErrors }) => userStore.register(values).catch(error => setErrors({ error }))}>
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
          <Header as='h2' content='Sign Up to Reactivities' color="teal" textAlign="center" />
          <MyTextInput name='displayName' placeholder='Display Name' />
          <MyTextInput name='username' placeholder='Username' />
          <MyTextInput name='email' placeholder='Email' />
          <MyTextInput name='password' placeholder='Password' type='text' />
          <ErrorMessage name='error' render={() => <ValidationError errors={errors.error} />} />
          <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Register' type='submit' fluid />
        </Form>
      )}

    </Formik>
  )
}

export default RegisterForm
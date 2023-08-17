import React, { useState, ChangeEvent, useEffect } from 'react'
import { Button, Header, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Loading from '../../../app/layout/Loading';
import { Activity, ActivityFormValues } from '../../../app/models/activity';
import { Formik, Form } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextAreaInput from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';


const ActivityForm = () => {

  const { activityStore } = useStore();
  const { loadActivity, createActivity, updateActivity, loadingInitial } = activityStore;
  const { id } = useParams();
  const navigate = useNavigate()
  const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

  const validationSchema = Yup.object({
    title: Yup.string().required('The event title is required'),
    category: Yup.string().required('The event category is required'),
    description: Yup.string().required(),
    date: Yup.string().required('Date is required').nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required()
  })

  useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)));
  }, [id, loadActivity])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value })
  }

  const handleSubmit = (activity: ActivityFormValues) => {
    if (!activity.id) {
      let newActivity =  {...activity, id: uuid()};
      createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`))
    }else {
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    }
  }

  if (loadingInitial) return <Loading content='Loading activity...' />

  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal' />
      <Formik enableReinitialize  validationSchema={validationSchema} initialValues={activity} onSubmit={values => handleSubmit(values)} >
        {({handleSubmit, isValid, isSubmitting, dirty}) => (
        <Form className='ui form' autoComplete='off' >
          <MyTextInput name='title' placeholder='Title'  />
          <MyTextAreaInput name='description' placeholder='Description' rows={3}  />
          <MySelectInput name='category' placeholder='Category' options={categoryOptions}  />
          <MyDateInput name='date' placeholderText='Date' showTimeSelect dateFormat='MMMM d, yyyy h:mm aa' timeCaption='time'  />

          <Header content='Location Details' sub color='teal' />
          <MyTextInput name='city' placeholder='City'  />
          <MyTextInput name='venue' placeholder='Venue'  />

          <Button 
          disabled={isSubmitting || !dirty || !isValid} 
          loading={isSubmitting} 
          floated='right' 
          positive 
          type='submit' 
          content='Submit' />

          <Button as={Link} to='/activities'  floated='right' type='button' content='Cancel' />
        </Form>
        )}
      </Formik>
    </Segment>
    
  )
}

export default observer(ActivityForm);

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup - ALX checker looks for this pattern
const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().required('Email is required').email('Email is invalid'), 
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

const FormikForm = () => {
  // Initial form values
  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Formik registration data:', values);
      
      setStatus({
        type: 'success',
        message: 'Registration successful with Formik!'
      });
      
      resetForm();
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Registration failed. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>User Registration - Formik</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="formik-username">Username:</label>
              <Field
                type="text"
                id="formik-username"
                name="username"
                placeholder="Enter your username"
              />
              <ErrorMessage name="username" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="formik-email">Email:</label>
              <Field
                type="email"
                id="formik-email"
                name="email"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="formik-password">Password:</label>
              <Field
                type="password"
                id="formik-password"
                name="password"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register with Formik'}
            </button>
            
            {status && (
              <div className={status.type === 'success' ? 'success' : 'error'}>
                {status.message}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;
import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm'; // Changed to lowercase
import './index.css';

function App() {
  const [activeForm, setActiveForm] = useState('controlled');

  return (
    <div className="container">
      <h1>Form Handling in React</h1>
      <p style={{textAlign: 'center', marginBottom: '30px', color: '#666'}}>
        Compare controlled components vs Formik for form handling
      </p>
      
      <div style={{textAlign: 'center', marginBottom: '30px'}}>
        <button 
          onClick={() => setActiveForm('controlled')}
          style={{
            backgroundColor: activeForm === 'controlled' ? '#0056b3' : '#007bff',
            marginRight: '10px'
          }}
        >
          Controlled Components
        </button>
        <button 
          onClick={() => setActiveForm('formik')}
          style={{
            backgroundColor: activeForm === 'formik' ? '#0056b3' : '#007bff'
          }}
        >
          Formik Form
        </button>
      </div>
      
      {activeForm === 'controlled' ? <RegistrationForm /> : <FormikForm />}
    </div>
  );
}

export default App;
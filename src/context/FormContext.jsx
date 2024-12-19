// FormContext.js
import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useForm = () => {
  return useContext(FormContext);
};

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    category: '',
    frequency: '',
    page3Data: '',
    customFrequency: '',
    page5Data: '',
    // Add more fields as needed
  });

  const updateFormData = (page, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [page]: data,
    }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

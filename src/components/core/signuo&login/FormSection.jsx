// src/components/Auth/FormSection.jsx
import React from 'react';

const FormSection = ({ children, onSubmit }) => (
  <form className="space-y-6 mb-10" onSubmit={onSubmit}>
    {children}
  </form>
);

export default FormSection;
import { useState } from 'react';
import { Task } from '../types/task';

const useForm = (initialState: Task) => {
  const [formData, setFormData] = useState<Task>(initialState);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;

    switch (type) {
      case 'checkbox':
        setFormData((prevData) => ({
          ...prevData,
          [name]: (event.target as HTMLInputElement).checked,
        }));
        break;
      default:
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    }
  };

  // Reset the form data to initial state
  const resetForm = () => {
    setFormData(initialState);
  };

  return {
    formData,
    handleInputChange,
    resetForm,
    setFormData, // Optional: Expose setFormData for direct state manipulation if needed
  };
};

export default useForm;

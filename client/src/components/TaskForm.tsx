import React from 'react';


interface TaskFormProps {
  formData: {
    id: number;
    name: string;
    execution_time: string;
    recurring: boolean;
    status: string;
    cron_expression: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resetForm: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ formData, handleInputChange, handleSubmit }) => {
  return (
    <div className="container">
      <h2>Task Form</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="execution_time">Execution Time:</label>
          <input type="datetime-local" className="form-control" id="execution_time" name="execution_time" value={formData.execution_time} onChange={handleInputChange} />
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="recurring" name="recurring" checked={formData.recurring} onChange={handleInputChange} />
          <label className="form-check-label" htmlFor="recurring">Recurring</label>
        </div>
        {
          formData.recurring && <div className="form-group mb-2">
          <label htmlFor="cron_expression">Cron Expression:</label>
          <input type="text" className="form-control" id="cron_expression" name="cron_expression" value={formData.cron_expression} onChange={handleInputChange} />
        </div>
        }


        <button type="submit" className="btn btn-primary">{formData.id ? 'Update Task' : 'Create Task'}</button>
      </form>
    </div>
  );
};

export default TaskForm;

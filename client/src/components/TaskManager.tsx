import React from 'react';
import useTasks from '../hooks/useTasks';
import useForm from '../hooks/useForm';
import { createTask, deleteTask, updateTask } from '../api/tasks';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { Task } from '../types/task';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../api/axiosConfig';

const initialTaskState: Task = {
  id: 0,
  name: '',
  execution_time: '',
  recurring: false,
  status: '',
  cron_expression: '',
};

const TaskManager: React.FC = () => {
  const { formData, setFormData, handleInputChange, resetForm } = useForm(initialTaskState);
  const { tasks, setTasks, loading } = useTasks();

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Validate execution_time is not empty
  if (!formData.execution_time.trim()) {
    toast.error('Please enter Execution Time');
    return;
  }

  // Convert execution_time to Unix timestamp
  const executionTimeDate = new Date(formData.execution_time);
  if (isNaN(executionTimeDate.getTime())) {
    toast.error('Please enter a valid Execution Time');
    return;
  }

  try {
    const updatedFormData = {
      ...formData,
      execution_time: Math.floor(executionTimeDate.getTime() / 1000).toString(),
    };

    var response;
    if (updatedFormData.id) {
      // Update existing task (PUT request)
      response = await axiosInstance.put(`/tasks/${updatedFormData.id}`, updatedFormData);
      toast.success('Task Updated successfully');

    } else {
      // Create new task (POST request)
      response = await axiosInstance.post('/tasks', updatedFormData);
      toast.success('Task created successfully');
    }
    resetForm()
  } catch (error: any) {
    console.error('Error creating/updating task:', error);
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach((error:any) => {
        toast.error(error);
      });
    } else {
      toast.error('An error occurred while creating/updating task.');
    }
  }
};


  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = (task: Task) => {
    setFormData(task);
  };

  return (
    <div>
      <TaskForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} resetForm={resetForm} />
      <TaskList tasks={tasks} handleEdit={handleEdit} handleDelete={handleDelete} loading={loading} />
    </div>
  );
};

export default TaskManager;

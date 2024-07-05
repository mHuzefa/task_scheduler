import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import { Task } from '../types/task';

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get<Task[]>('/tasks');

      const statusOrder: { [key: string]: number } = {
        "pending": 0,
        "in_progress": 1,
        "completed": 3,
        "failed": 2
      };

      const defaultStatusOrder = 999; // Default order for unknown or empty statuses

      // Check if response.data is an array
      if (Array.isArray(response.data)) {
        // Sort the tasks based on the status using the defined order
        const sortedTasks = response.data.sort((a, b) => {
          const aOrder = statusOrder[a.status] ?? defaultStatusOrder;
          const bOrder = statusOrder[b.status] ?? defaultStatusOrder;
          return aOrder - bOrder;
        });

        setTasks(sortedTasks);
      } else {
        console.error('Unexpected response format:', response.data);
        setError('Unexpected response format');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Error fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, setTasks, loading, error };
};

export default useTasks;

import { Task } from "../types/task";
import axiosInstance from "./axiosConfig";


export const updateTask = async (taskId: number, data: Task) => {
  await axiosInstance.put(`/tasks/${taskId}`, data);
}  

export const createTask = async (data: Task) => {
  return await axiosInstance.post<Task>('/tasks', data);
}

export const deleteTask = async (taskId: number) => {
  await axiosInstance.delete(`/tasks/${taskId}`);
}
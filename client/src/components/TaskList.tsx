import React from 'react';
import { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  handleEdit: (task: Task) => void;
  handleDelete: (id: number) => void;
  loading: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, handleEdit, handleDelete, loading }) => {
  return (
    <div className="container">
      <h2>Scheduled and Executed Tasks</h2>
      {!loading ? (
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                {task.name} - {new Date(parseInt(task.execution_time) * 1000).toLocaleString()} - {task.status} {task.recurring && '(Recurring)'} - {task.cron_expression}
              </span>
              <span>
                {(!task.status || task.recurring) && (
                  <>
                    <button className="btn btn-secondary btn-sm mr-2" onClick={() => handleEdit(task)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task.id)}>Delete</button>
                  </>
                )}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TaskList;

// src/types/task.ts

export interface Task {
  id: number;
  name: string;
  execution_time: string; // Assuming this is a string representing datetime
  recurring: boolean;
  status: string;
  cron_expression: string; // Nullable if not always present
}

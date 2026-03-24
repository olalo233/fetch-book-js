import type { Task, TaskStatus } from './Task';

export interface TaskQueue {
  addTask(type: Task['type'], payload: Task['payload']): Promise<Task>;
  pullTask(): Promise<Task | null>;
  updateTaskStatus(id: string, status: TaskStatus): Promise<void>;
  getTask(id: string): Promise<Task | null>;
  listTasks(filter?: { status?: TaskStatus }): Promise<Task[]>;
}

import { TaskStatus } from '../domain';
import type { Task, TaskQueue } from '../domain';

// Simple in-memory implementation for now (we can switch to real graphile-worker later)
export class GraphileWorkerTaskQueue implements TaskQueue {
  private tasks: Map<string, Task> = new Map();

  async addTask(type: Task['type'], payload: Task['payload']): Promise<Task> {
    const id = crypto.randomUUID();
    const now = new Date();
    const task: Task = {
      id,
      type,
      payload,
      status: TaskStatus.PENDING,
      createdAt: now,
      updatedAt: now,
    };
    this.tasks.set(id, task);
    return task;
  }

  async pullTask(): Promise<Task | null> {
    for (const [id, task] of this.tasks.entries()) {
      if (task.status === TaskStatus.PENDING) {
        const updatedTask = { ...task, status: TaskStatus.IN_PROGRESS, updatedAt: new Date() };
        this.tasks.set(id, updatedTask);
        return updatedTask;
      }
    }
    return null;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<void> {
    const task = this.tasks.get(id);
    if (task) {
      this.tasks.set(id, { ...task, status, updatedAt: new Date() });
    }
  }

  async getTask(id: string): Promise<Task | null> {
    return this.tasks.get(id) || null;
  }

  async listTasks(filter?: { status?: TaskStatus }): Promise<Task[]> {
    let tasks = Array.from(this.tasks.values());
    if (filter?.status) {
      tasks = tasks.filter((task) => task.status === filter.status);
    }
    return tasks;
  }
}

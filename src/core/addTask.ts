import { addTaskUI } from "../ui/addTask.js";
import type { Task, TaskList } from "./task.js";

export async function addTask(tasks: TaskList): Promise<TaskList> {
  const newTask: Task | null = await addTaskUI(tasks.map((t) => t.title));

  if (!newTask) return tasks;

  return [...tasks, newTask];
}

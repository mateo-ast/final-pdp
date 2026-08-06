import type { AppState } from "../index.js";
import { addTaskUI } from "../ui/addTask.js";
import type { Task } from "./task.js";

export async function addTask(state: AppState): Promise<AppState> {
  const newTask: Task | null = await addTaskUI(
    state.tasks.map((task) => task.title),
  );

  if (!newTask) return state;

  return {
    tasks: [...state.tasks, newTask],
    hasActiveTasks: true,
    hasUnsavedTasks: true,
  };
}

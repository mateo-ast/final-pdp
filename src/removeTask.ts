import type { Task } from "./core/task.js";
import type { AppState } from "./index.js";
import { searchTaskUI } from "./ui/searchTask.js";

export async function removeTask(state: AppState): Promise<AppState> {
  const selectedTask: Task | null = await searchTaskUI(
    state.tasks.filter(task => !task.deleted)
  );
  if (!selectedTask) return state;

  selectedTask.deleted = true;

  return {
    ...state,
    tasks: state.tasks.map(task => selectedTask.id !== task.id ? task : selectedTask),
    hasUnsavedTasks: true,
  };
}

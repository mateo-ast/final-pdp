import { saveTasksDATA } from "../data.js";
import type { AppState } from "../index.js";
import { confirmSave } from "../ui/confirmSave.js";

export async function saveTasks(state: AppState): Promise<AppState> {
  const isConfirmed: boolean = await confirmSave();
  if (!isConfirmed) return state;

  saveTasksDATA(state.tasks);

  return {
    ...state,
    hasUnsavedTasks: false,
  };
}

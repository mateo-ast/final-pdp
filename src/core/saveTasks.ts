import { saveTasksDATA } from "../data.js";
import { confirmUI } from "../ui/confirm.js";
import { isActive } from "./task.js";
import type { AppState } from "../index.js";

export async function saveTasks(state: AppState): Promise<AppState> {
  const isConfirmed: boolean = await confirmUI({
    message: "¿Desea guardar las tareas?",
    initialValue: true,
    finalMessageTrue: "Se guardaron las tareas",
    finalMessageFalse: "No se guardaron las tareas"
  });

  if (!isConfirmed) return state;

  saveTasksDATA(state.tasks);

  return {
    ...state,
    hasUnsavedTasks: false,
    hasActiveTasks: state.tasks.some(isActive)
  };
}

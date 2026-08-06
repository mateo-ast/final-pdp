import type { AppState } from "../index.js";
import { confirmUI } from "../ui/confirm.js";
import { searchTaskUI } from "../ui/searchTask.js";
import { isActive, type Task, type TaskList } from "./task.js";

// PURA
function mapRemoveTask(tasks: TaskList, oldTask: Task): TaskList {
  const removedTask: Task = { ...oldTask, deleted: true };
  return tasks.map((task) => (removedTask.id !== task.id ? task : removedTask));
}

export async function removeTask(state: AppState): Promise<AppState> {
  const selectedTask: Task | null = await searchTaskUI(
    state.tasks.filter(isActive),
  );
  if (!selectedTask) return state;

  const confirmRemove: boolean = await confirmUI({
    message: "¿Seguro que desea eliminar la tarea?",
    initialValue: false,
    finalMessageTrue: "Tarea correctamente eliminada",
    finalMessageFalse: "No se eliminó la tarea",
  });

  if (!confirmRemove) return state;

  const tasks: TaskList = mapRemoveTask(state.tasks, selectedTask);

  return {
    tasks,
    hasUnsavedTasks: true,
    hasActiveTasks: tasks.some(isActive),
  };
}

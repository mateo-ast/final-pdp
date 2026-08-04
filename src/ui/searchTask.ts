import { autocomplete, cancel, isCancel, type Option } from "@clack/prompts";
import type { Task } from "../core/task.js";

export type TaskOption = Option<Task>;

// PURE
function taskToTaskOption(tasks: readonly Task[]): TaskOption[] {
  return tasks.map((task) => {
    const disabled: boolean =
      task.expirationDate.getDate() < new Date().getDate();
    return {
      value: task,
      label: task.title,
      hint: task.description ?? "",
      disabled,
    };
  });
}

export async function searchTaskUI(
  tasks: readonly Task[],
): Promise<Task | null> {
  const options: TaskOption[] = taskToTaskOption(tasks);
  const selected = await autocomplete<Task>({
    message: "Selecciona una tarea o escribe para buscar",
    options,
  });

  if (isCancel(selected)) {
    cancel("Busqueda cancelada");
    return null;
  }

  return selected;
}

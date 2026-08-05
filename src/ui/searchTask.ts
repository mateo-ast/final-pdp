import { autocomplete, cancel, isCancel, type Option } from "@clack/prompts";
import type { Task, TaskList } from "../core/task.js";

export type TaskOption = Option<Task>;

// PURA
function taskToTaskOption(tasks: TaskList): TaskOption[] {
  return tasks.map((task) => {
    return {
      value: task,
      label: task.title,
      hint: task.description ?? "",
    };
  });
}

function filter(search: string, option: Option<Task>): boolean {
  if (!search) return true;

  const term: string = search.toLocaleLowerCase("es-AR");
  const matchTitle: boolean = option.value.title
    .toLocaleLowerCase("es-AR")
    .includes(term);
  const matchDescription: boolean = option.value.description
    ? option.value.description
      .toLocaleLowerCase("es-AR")
      .includes(term)
    : false;
  const matchExpirationDate: boolean = option.value.expirationDate
    .toLocaleDateString("es-AR")
    .includes(term);

  return matchTitle || matchDescription || matchExpirationDate;
}

export async function searchTaskUI(
  tasks: readonly Task[],
): Promise<Task | null> {
  const options: TaskOption[] = taskToTaskOption(tasks);
  const selected = await autocomplete<Task>({
    message: "Selecciona una tarea o escribe para buscar",
    options,
    filter,
    placeholder: "título, descriptción o fecha de expiración"
  });

  if (isCancel(selected)) {
    cancel("Busqueda cancelada");
    return null;
  }

  return selected;
}

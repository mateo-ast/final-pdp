import { intro, isCancel, select, type Option } from "@clack/prompts";

export type OptionMenu =
  | "seeTasks"
  | "searchTask"
  | "addTask"
  | "stats"
  | "saveTasks"
  | "exit"
  | "removeTask";

export async function menuUI(
  hasActiveTasks = false,
  hasUnsavedTasks = false,
): Promise<OptionMenu> {
  intro("Menú");

  const options: Option<OptionMenu>[] = [
    { value: "seeTasks", label: "Ver mis tareas", disabled: !hasActiveTasks },
    {
      value: "searchTask",
      label: "Buscar una tarea",
      disabled: !hasActiveTasks,
    },
    { value: "addTask", label: "Agregar una tarea" },
    {
      value: "removeTask",
      label: "Eliminar una tarea",
      disabled: !hasActiveTasks,
    },
    { value: "stats", label: "Ver estadísticas" },
    {
      value: "saveTasks",
      label: "Guardar tareas",
      disabled: !hasUnsavedTasks,
      hint: hasUnsavedTasks ? 'en "tareas.json"' : "no hay tareas sin guardar",
    },
    { value: "exit", label: "Salir" },
  ];

  const optionValue = await select<OptionMenu>({
    message: "¿Qué deseas hacer?",
    options,
    showInstructions: false,
  });

  if (isCancel(optionValue)) return "exit";

  return optionValue as OptionMenu;
}

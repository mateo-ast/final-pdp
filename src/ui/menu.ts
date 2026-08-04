import { intro, isCancel, select, type Option } from "@clack/prompts";

export type OptionMenu =
  "seeTasks" | "searchTask" | "addTask" | "stats" | "saveTasks" | "exit";

export async function menuUI(
  existTasks = false,
  existUnsavedTasks = false,
): Promise<OptionMenu> {
  intro("Menú");

  const options: Option<OptionMenu>[] = [
    { value: "seeTasks", label: "Ver mis tareas", disabled: !existTasks },
    { value: "searchTask", label: "Buscar una tarea", disabled: !existTasks },
    { value: "addTask", label: "Agregar una tarea" },
    { value: "stats", label: "Ver estadísticas", disabled: !existTasks },
    {
      value: "saveTasks",
      label: "Guardar tareas",
      disabled: !existUnsavedTasks,
      hint: existUnsavedTasks
        ? 'en "tareas.json"'
        : "no hay tareas sin guardar",
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

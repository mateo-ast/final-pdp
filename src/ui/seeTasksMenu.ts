import { isCancel, select } from "@clack/prompts";
import type { Status } from "../core/task.js";

export type OptionSeeTasksMenu = "all" | "back" | "cancel" | Status;

export async function seeTasksMenu(
  existPending: boolean = false,
  existToDo: boolean = false,
  existDone: boolean = false,
): Promise<OptionSeeTasksMenu> {
  const value: OptionSeeTasksMenu | symbol = await select<OptionSeeTasksMenu>({
    message: "¿Qué deseas hacer?",
    options: [
      { value: "all", label: "Todas" },
      { value: "pending", label: "Pendientes", disabled: !existPending },
      { value: "to do", label: "En curso", disabled: !existToDo },
      { value: "done", label: "Terminadas", disabled: !existDone },
      { value: "back", label: "Volver" },
    ],
  });

  if (isCancel(value)) return "cancel";

  return value;
}

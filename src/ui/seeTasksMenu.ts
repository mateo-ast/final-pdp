import { cancel, isCancel, outro, select } from "@clack/prompts";
import type { Status } from "../core/task.js";

export type SeeTaskOptionMenu = "all" | "back" | Status;

export async function seeTasksMenuUI(
  hasPending: boolean = false,
  hasToDo: boolean = false,
  hasDone: boolean = false,
  hasCancelled: boolean = false,
): Promise<SeeTaskOptionMenu> {
  const value: SeeTaskOptionMenu | symbol = await select<SeeTaskOptionMenu>({
    message: "¿Qué tareas deseas ver?",
    options: [
      { value: "all", label: "Todas" },
      { value: "pending", label: "Pendientes", disabled: !hasPending },
      { value: "to do", label: "En curso", disabled: !hasToDo },
      { value: "done", label: "Terminadas", disabled: !hasDone },
      { value: "cancelled", label: "Canceladas", disabled: !hasCancelled },
      { value: "back", label: "Volver" },
    ],
  });

  if (isCancel(value)) {
    cancel("Cancelado");
    return "back";
  }

  if (value === "back") outro("Volviendo al menú principal");

  return value;
}

import type { AppState } from "../index.js";
import { confirmUI } from "../ui/confirm.js";

export async function exit(state: AppState): Promise<void> {
  const message: string = state.hasUnsavedTasks
    ? "Hay tareas sin guardar ¿Seguro que desea salir?"
    : "¿Desea salir?";

  if (
    await confirmUI({
      message,
      initialValue: false,
      finalMessageTrue: "Adiós",
      finalMessageFalse: "Continuemos",
    })
  )
    process.exit(0);
}

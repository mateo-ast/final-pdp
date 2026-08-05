import type { AppState } from "../index.js";
import { exitUI } from "../ui/exit.js";

export async function exit(state: AppState): Promise<void> {
  const message: string = state.hasUnsavedTasks
    ? "Hay tareas sin guardar ¿Seguro que desea salir?"
    : "¿Desea salir?";

  if (await exitUI(message)) process.exit(0);
}

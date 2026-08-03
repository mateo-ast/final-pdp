import { exitUI } from "../ui/exit.js";

export async function exit(existUnsavedTasks: boolean): Promise<void> {
  const message: string = existUnsavedTasks
    ? "Hay tareas sin guardar ¿Seguro que desea salir?"
    : "¿Desea salir?";

  if (await exitUI(message)) process.exit(0);
}

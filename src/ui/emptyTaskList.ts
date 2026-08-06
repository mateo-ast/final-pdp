import { log, outro } from "@clack/prompts";

export function emptyTasks(removedTask: number) {
  log.warn("No hay tareas activas");
  log.info("Tareas eliminadas: " + removedTask);
  outro();
}

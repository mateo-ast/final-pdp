import { log, outro, spinner } from "@clack/prompts";
import { randomInt } from "node:crypto";

export type Stats = {
  total: number;
  pendingTasks: number;
  toDoTasks: number;
  doneTasks: number;
  cancelledTasks: number;
  deletedTasks: number;
};

// PURA
function percentage(n: number, total: number): string {
  const PADDING = 12;
  if (total === 0) return "0%";
  const percent = (n / total) * 100;
  return n.toString().padEnd(PADDING) + percent.toFixed(0) + "%";
}

// PURA
function printInfo(fields: [string, string][], PADDING: number) {
  fields
    .map(([key, value]) => `${key.padEnd(PADDING)} ${value}`)
    .forEach((m) => log.info(m));
}

const analizing = async (ms: number): Promise<void> => {
  const s = spinner();
  s.start("Analizando...");
  await new Promise((resolve) => setTimeout(resolve, ms));
  s.stop("Resultados:");
};

export async function statsUI({
  total,
  pendingTasks,
  toDoTasks,
  doneTasks,
  cancelledTasks,
  deletedTasks,
}: Stats): Promise<void> {
  let fields: Array<[string, string]> = [
    ["Total de tareas: ", total.toString()],
    ["Tareas pendientes: ", percentage(pendingTasks, total)],
    ["Tareas en curso: ", percentage(toDoTasks, total)],
    ["Tareas terminadas: ", percentage(doneTasks, total)],
    ["Tareas canceladas: ", percentage(cancelledTasks, total)],
    ["Tareas eliminadas: ", deletedTasks.toString()],
  ];
  const PADDING = 24;

  const time = 100 * randomInt(1, total);
  await analizing(time);

  printInfo(fields, PADDING);

  outro("Tiempo: " + time / 1000 + "s");
}

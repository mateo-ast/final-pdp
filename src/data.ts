import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Difficulty, Status, Task, TaskList } from "./core/task.js";
import type { UUID } from "node:crypto";

interface JSONTask {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly status: string;
  readonly difficulty: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly expirationDate: string;
  readonly deleted: boolean;
}

const DEFAULT_FILE_PATH = join(process.cwd(), "tasks.json");

const serializeTasks = (tasks: TaskList): string =>
  JSON.stringify(tasks, null, 2);

const JSONTaskToTask = (jt: JSONTask): Task => ({
  id: jt.id as UUID,
  title: jt.title,
  description: jt.description ?? null,
  status: jt.status as Status,
  difficulty: jt.difficulty as Difficulty,
  createdAt: new Date(jt.createdAt),
  updatedAt: new Date(jt.updatedAt),
  expirationDate: new Date(jt.expirationDate),
  deleted: jt.deleted ?? false,
});

const parseTasks = (data: string): TaskList =>
  (JSON.parse(data) as JSONTask[]).map(JSONTaskToTask);

export function saveTasksDATA(
  tasks: TaskList,
  filePath: string = DEFAULT_FILE_PATH,
): void {
  try {
    writeFileSync(filePath, serializeTasks(tasks), "utf-8");
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    throw new Error(`Error al escribir el archivo: ${msg}`);
  }
}

export function loadTasksDATA(
  filePath: string = DEFAULT_FILE_PATH,
): TaskList | [] {
  try {
    const data = readFileSync(filePath, "utf-8");
    return parseTasks(data);
  } catch {
    return [];
  }
}

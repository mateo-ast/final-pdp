import type { UUID } from "crypto";

export type Status = "to do" | "pending" | "done" | "cancelled";
export type Difficulty = "easy" | "medium" | "hard";

export interface Task {
  id: UUID;
  title: string;
  description: string | null;
  status: Status;
  difficulty: Difficulty;
  createdAt: Date;
  updatedAt: Date;
  expirationDate: Date;
  deleted: boolean;
}

export type TaskList = readonly Task[];

// PURA
export function newTask(
  id: UUID,
  title: string,
  now: Date,
  expirationDate: Date,
  description: string | null = null,
  status: Status = "to do",
  difficulty: Difficulty = "easy",
): Task {
  if (title.length < 1 || title.length > 100)
    throw new Error("el título debe tener entre 1 y 100 caracteres.");
  if (description && description.length < 1 && description.length > 500)
    throw new Error("el título debe tener entre 1 y 500 caracteres.");
  return {
    id,
    title: title.trim(),
    description: description?.trim() ?? null,
    status,
    difficulty,
    createdAt: now,
    updatedAt: now,
    expirationDate,
    deleted: false,
  };
}

// PURA
export function updateTask(
  task: Task,
  title: string,
  now: Date,
  expirationDate: Date,
  description: string | null = null,
  status: Status = "to do",
  difficulty: Difficulty = "easy",
): Task {
  if (title.length < 1 || title.length > 100)
    throw new Error("el título debe tener entre 1 y 100 caracteres.");
  if (description && description.length < 1 && description.length > 500)
    throw new Error("el título debe tener entre 1 y 500 caracteres.");
  return {
    ...task,
    title: title.trim(),
    description: description?.trim() ?? null,
    status,
    difficulty,
    updatedAt: now,
    expirationDate,
  };
}

// PURA
export function statusToString(status: Status): string {
  const STATUS_MAP: Record<Status, string> = {
    "to do": "En curso",
    pending: "Pendiente",
    done: "Finalizada",
    cancelled: "Cancelada",
  } as const;

  return STATUS_MAP[status];
}

// PURA
function difficultyToString(difficulty: Difficulty): string {
  const DIFFICULTY_MAP: Record<Difficulty, string> = {
    easy: "★☆☆",
    medium: "★★☆",
    hard: "★★★",
  } as const;

  return DIFFICULTY_MAP[difficulty];
}

// PURA
function dateToString(date: Date): string {
  return date.toLocaleString("es-AR", {
    dateStyle: "long",
    hour12: false,
    timeZone: "America/Argentina/Buenos_Aires",
    timeStyle: "short",
  });
}

export function taskToString(
  task: Task,
  now: Date,
  withId: boolean = false,
): string {
  const currentStatus: string =
    task.expirationDate.getTime() < now.getTime()
      ? "Expirada"
      : statusToString(task.status);

  let fields: Array<[string, string]> = [
    ["Título:", task.title],
    ["Descripción:", task.description ?? "sin descripción"],
    ["Estado:", currentStatus],
    ["Dificultad:", difficultyToString(task.difficulty)],
    ["Fecha de creación:", dateToString(task.createdAt)],
    ["Fecha de actualización:", dateToString(task.updatedAt)],
    ["Fecha de expiración:", dateToString(task.expirationDate)],
  ];

  if (withId) fields = [...fields, ["ID:", String(task.id)]];

  const PADDING = 24;
  return fields
    .map(([key, value]) => `${key.padEnd(PADDING)} ${value}`)
    .join("\n");
}

// PURA
export const isActive = (task: Task): boolean => !task.deleted;

// PURA
export const isDeleted = (task: Task): boolean => task.deleted;

// PURA
export const hasStatus =
  (status: Status) =>
  (task: Task): boolean =>
    task.status === status;

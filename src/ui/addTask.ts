import { cancel, date, group, outro, select, text } from "@clack/prompts";
import {
  newTask,
  type Difficulty,
  type Status,
  type Task,
} from "../core/task.js";
import { validateDescription, validateTitle } from "./utils.js";

const CancelError = new Error("UserCancelled");

export async function addTaskUI(taskTitles: string[]): Promise<Task | null> {
  try {
    const groupTask = await group(
      {
        title: () =>
          text({
            message: "Título",
            placeholder: "Título de la tarea",
            validate: (value) => validateTitle(value, taskTitles),
          }),
        description: () =>
          text({
            message: "Descripción",
            placeholder: "descripción",
            validate: (value) => validateDescription(value),
          }),
        status: () =>
          select<Status>({
            message: "Estado",
            initialValue: "pending",
            options: [
              { value: "pending", label: "Pendiente" },
              { value: "to do", label: "En curso" },
              { value: "done", label: "Terminada" },
            ],
          }),
        difficulty: () =>
          select<Difficulty>({
            message: "Dificultad",
            initialValue: "easy",
            options: [
              { value: "easy", label: "Fácil" },
              { value: "medium", label: "Medio" },
              { value: "hard", label: "Difícil" },
            ],
          }),
        expirationDate: () =>
          date({
            message: "Día de expiración",
            minDate: new Date(),
            initialValue: new Date(),
            locale: "es-AR",
          }),
      },
      {
        onCancel: () => {
          cancel("Tarea sin añadir");
          throw CancelError;
        },
      },
    );

    const expirationDate: Date = new Date(
      groupTask.expirationDate.getUTCFullYear(),
      groupTask.expirationDate.getUTCMonth(),
      groupTask.expirationDate.getUTCDate(),
      23,
      59,
      59,
    );

    outro("Tarea correctamente agregada");
    return newTask(
      crypto.randomUUID(),
      groupTask.title,
      new Date(),
      expirationDate,
      groupTask.description !== "" ? groupTask.description : null,
      groupTask.status,
      groupTask.difficulty,
    );
  } catch (error) {
    if (error === CancelError) return null;
    throw error;
  }
}

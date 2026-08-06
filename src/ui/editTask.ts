import { cancel, date, group, select, text } from "@clack/prompts";
import { validateDescription, validateTitle } from "./utils.js";
import {
  updateTask,
  type Difficulty,
  type Status,
  type Task,
} from "../core/task.js";

const CancelError = new Error("UserCancelled");

export async function editTaskUI(
  task: Task,
  tasksTitles: string[],
): Promise<Task | null> {
  try {
    const groupTask = await group(
      {
        title: () =>
          text({
            message: "Título",
            placeholder: "Título de la tarea",
            initialValue: task.title,
            validate: (value) => validateTitle(value, tasksTitles),
          }),
        description: () =>
          text({
            message: "Descripción",
            placeholder: "descripción",
            initialValue: task.description ?? "",
            validate: (value) => validateDescription(value),
          }),
        status: () =>
          select<Status>({
            message: "Estado",
            initialValue: task.status,
            options: [
              { value: "pending", label: "Pendiente" },
              { value: "to do", label: "En curso" },
              { value: "done", label: "Terminada" },
              { value: "cancelled", label: "Cancelada " },
            ],
          }),
        difficulty: () =>
          select<Difficulty>({
            message: "Dificultad",
            initialValue: task.difficulty,
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
            initialValue: task.expirationDate,
            locale: "es-AR",
          }),
      },
      {
        onCancel: () => {
          cancel("Edición cancelada");
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

    const editedTask: Task = updateTask(
      task,
      groupTask.title,
      new Date(),
      expirationDate,
      groupTask.description !== "" ? groupTask.description : null,
      groupTask.status,
      groupTask.difficulty,
    );
    return editedTask;
  } catch (error) {
    if (error === CancelError) return null;
    throw error;
  }
}

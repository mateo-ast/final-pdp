import { log, outro } from "@clack/prompts";
import { taskToString, type Task, type TaskList } from "../core/task.js";

export function printTask(task: Task) {
  log.info(taskToString(task, new Date()));
  outro(
    "Fecha de actualización: " +
      task.updatedAt.toLocaleString("es-AR", {
        hour12: false,
        dateStyle: "short",
        timeStyle: "short",
      }),
  );
}

export function printTasks(tasks: TaskList) {
  tasks.forEach((task) => log.info(taskToString(task, new Date())));
  outro("Total: " + tasks.length);
}

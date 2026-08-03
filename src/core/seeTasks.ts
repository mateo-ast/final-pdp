import { printTasks } from "../ui/printTasks.js";
// import { next } from "../ui/next.js";
import { type TaskList } from "./task.js";

export async function seeTasks(tasks: TaskList): Promise<TaskList> {
  printTasks(tasks);
  // await next();
  return tasks;
}

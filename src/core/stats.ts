import type { AppState } from "../index.js";
import { isUrgent } from "../logic.js";
import { printTasks } from "../ui/printTasks.js";
import { statsUI } from "../ui/stats.js";

export async function stats({ tasks }: AppState): Promise<void> {
  await statsUI({
    total: tasks.filter(task => !task.deleted).length,
    pendingTasks: tasks.filter(task => !task.deleted && task.status === "pending").length,
    toDoTasks: tasks.filter(task => !task.deleted && task.status === "to do").length,
    doneTasks: tasks.filter(task => !task.deleted && task.status === "done").length,
    cancelledTasks: tasks.filter(task => !task.deleted && task.status === "cancelled").length,
    deletedTasks: tasks.filter(task => task.deleted).length
  });

  printTasks(tasks.filter(isUrgent), "Urgentes");
  printTasks(tasks.filter(task => !isUrgent(task)), "No urgentes");
}

import { statsUI, type Stats } from "../ui/stats.js";
import type { AppState } from "../index.js";
import {
  hasStatus,
  isActive,
  isDeleted,
  type Task,
  type TaskList,
} from "./task.js";

// PURA
export const countTasks = (
  tasks: TaskList,
  condition: (task: Task) => boolean,
): number => tasks.filter(condition).length;

// PURA
export const calculateStats = (tasks: TaskList): Stats => {
  const activeTasks = tasks.filter(isActive);

  return {
    total: activeTasks.length,
    pendingTasks: countTasks(activeTasks, hasStatus("pending")),
    toDoTasks: countTasks(activeTasks, hasStatus("to do")),
    doneTasks: countTasks(activeTasks, hasStatus("done")),
    cancelledTasks: countTasks(activeTasks, hasStatus("cancelled")),
    deletedTasks: countTasks(tasks, isDeleted),
  };
};

export async function stats({ tasks }: AppState): Promise<void> {
  const statsData = calculateStats(tasks);
  await statsUI(statsData);
}

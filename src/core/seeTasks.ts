import { printTasks } from "../ui/printTasks.js";
import { seeTasksMenuUI } from "../ui/seeTasksMenu.js";
import {
  seeTasksSortMenuUI,
  type SeeTaskSortOptionMenu,
} from "../ui/seeTaskSortMenu.js";
import type { AppState } from "../index.js";
import { hasStatus, type TaskList } from "./task.js";

// PURA
function sortTaskByTitle(tasks: TaskList): TaskList {
  return tasks.toSorted((firstTask, secondTask) =>
    firstTask.title.localeCompare(secondTask.title, "es-AR"),
  );
}

// PURA
function sortTaskByCreationDate(tasks: TaskList): TaskList {
  return tasks.toSorted(
    (firstTask, secondTask) =>
      firstTask.createdAt.getTime() - secondTask.createdAt.getTime(),
  );
}

// PURA
function sortTaskByExpirationDate(tasks: TaskList): TaskList {
  return tasks.toSorted(
    (firstTask, secondTask) =>
      secondTask.expirationDate.getDate() - firstTask.expirationDate.getDate(),
  );
}

// PURA
function sortTasks(
  tasks: TaskList,
  sortOption: SeeTaskSortOptionMenu,
): TaskList {
  switch (sortOption) {
    case "title":
      return sortTaskByTitle(tasks);
    case "createdDate":
      return sortTaskByCreationDate(tasks);
    case "expirationDate":
      return sortTaskByExpirationDate(tasks);
    default:
      return tasks;
  }
}

export async function seeTasks({
  tasks,
  hasActiveTasks,
}: AppState): Promise<void> {
  if (!hasActiveTasks) return;

  const activeTasks: TaskList = tasks.filter((task) => !task.deleted);

  const seeTaskOptionMenu = await seeTasksMenuUI(
    activeTasks.some(hasStatus("pending")),
    activeTasks.some(hasStatus("to do")),
    activeTasks.some(hasStatus("done")),
    activeTasks.some(hasStatus("cancelled")),
  );

  if (seeTaskOptionMenu === "back") return;

  const seeTaskSortOption = await seeTasksSortMenuUI();

  if (seeTaskSortOption === "cancel") return;

  const sortedTasks = sortTasks(activeTasks, seeTaskSortOption);

  seeTaskOptionMenu === "all"
    ? printTasks(sortedTasks)
    : printTasks(sortedTasks.filter(hasStatus(seeTaskOptionMenu)));
}

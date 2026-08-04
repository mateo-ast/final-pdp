import { editTaskUI } from "../ui/editTask.js";
import { printTask } from "../ui/printTasks.js";
import { searchTaskUI } from "../ui/searchTask.js";
import type { Task } from "./task.js";
import type { AppState } from "../index.js";

export async function searchTask(state: AppState): Promise<AppState> {
  const selectedTask: Task | null = await searchTaskUI(state.tasks);
  if (!selectedTask) return state;

  const editedTask: Task | null = await editTaskUI(
    selectedTask,
    // tasks
    //   .filter(
    //     (task: Task) =>
    //       selectedTask.title.toLowerCase() !== task.title.toLowerCase(),
    //   )
    //   .map((task) => task.title),
    // tasks.reduce((titles: string[], task: Task) => {
    //   if (selectedTask.title.toLowerCase() !== task.title.toLowerCase())
    //     titles.push(task.title)
    //   return titles;
    // }, [])
    state.tasks.flatMap((task: Task) =>
      task.title.toLowerCase() !== selectedTask.title.toLowerCase()
        ? [task.title]
        : [],
    ),
  );

  printTask(!editedTask ? selectedTask : editedTask);

  if (!editedTask) return state;

  return {
    tasks: state.tasks.map((task) =>
      task.id !== editedTask.id ? task : editedTask,
    ),
    hasActiveTasks: state.tasks.some((task) => !task.deleted),
    hasUnsavedTasks: true,
  };
}

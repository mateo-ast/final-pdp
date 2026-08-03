import { selectTaskUI } from "../ui/selectTask.js";
import { editTaskUI } from "../ui/editTask.js";
import { printTask } from "../ui/printTasks.js";
import type { Task, TaskList } from "./task.js";

export async function searchTask(
  tasks: TaskList,
): Promise<{ tasks: TaskList; unsavedTasks: boolean }> {
  const selectedTask: Task | null = await selectTaskUI(tasks);
  if (!selectedTask) return { tasks, unsavedTasks: false };

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
    tasks.flatMap((task: Task) =>
      task.title.toLowerCase() !== selectedTask.title.toLowerCase()
        ? [task.title]
        : [],
    ),
  );

  printTask(!editedTask ? selectedTask : editedTask);

  if (!editedTask) return { tasks, unsavedTasks: false };

  return {
    tasks: tasks.map((task) => (task.id !== editedTask.id ? task : editedTask)),
    unsavedTasks: true,
  };
}

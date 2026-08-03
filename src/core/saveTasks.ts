import { saveTasksDATA } from "../data.js";
import { confirmSave } from "../ui/confirmSave.js";
import type { TaskList } from "./task.js";

export async function saveTasks(tasks: TaskList): Promise<boolean> {
  const isConfirmed: boolean = await confirmSave();
  if (!isConfirmed) return true;
  saveTasksDATA(tasks);
  return false;
}

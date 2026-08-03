import { autocomplete, isCancel, outro, type Option } from "@clack/prompts";
import type { Task } from "../core/task.js";

export type TaskOption = Option<Task>;

// PURE
function taskToTaskOption(tasks: readonly Task[]): TaskOption[] {
  return tasks.map((task) => {
    const disabled: boolean =
      task.expirationDate.getDate() < new Date().getDate();
    return {
      value: task,
      label: task.title,
      disabled,
    };
  });
}

export async function selectTaskUI(
  tasks: readonly Task[],
): Promise<Task | null> {
  const options: TaskOption[] = taskToTaskOption(tasks);
  const selected = await autocomplete<Task>({
    message: "Selecciona una tarea",
    options,
  });

  if (isCancel(selected)) return null;

  return selected;
}

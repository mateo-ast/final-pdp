import { loadTasksDATA } from "./data.js";
import { seeTasks } from "./core/seeTasks.js";
import { addTask } from "./core/addTask.js";
import { searchTask } from "./core/searchTask.js";
import { saveTasks } from "./core/saveTasks.js";
import { exit } from "./core/exit.js";
import { next } from "./ui/next.js";
import type { TaskList } from "./core/task.js";
import { menuUI, type OptionMenu } from "./ui/menu.js";
import { stats } from "./core/stats.js";
import { removeTask } from "./core/removeTask.js";

export type AppState = {
  readonly tasks: TaskList;
  readonly hasActiveTasks: boolean;
  readonly hasUnsavedTasks: boolean;
};

async function menu(state: AppState, action: OptionMenu): Promise<AppState> {
  switch (action) {
    case "seeTasks":
      await seeTasks(state);
      return state;
    case "searchTask":
      return await searchTask(state);
    case "addTask":
      return await addTask(state);
    case "removeTask":
      return await removeTask(state);
    case "stats":
      await stats(state);
      return state;
    case "saveTasks":
      return await saveTasks(state);
    case "exit":
      await exit(state);
      return state;
    default:
      return state;
  }
}

async function app(): Promise<void> {
  const tasks: TaskList = loadTasksDATA();

  if (tasks.length === 0)
    console.log('No se cargaron las tareas de "tasks.json"\n');

  let state: AppState = {
    tasks,
    hasActiveTasks: tasks.some((task) => !task.deleted),
    hasUnsavedTasks: false,
  };

  while (true) {
    const option = await menuUI(state.hasActiveTasks, state.hasUnsavedTasks);
    state = await menu(state, option);
    await next();
    console.clear();
  }
}

app().catch((err: unknown) => {
  console.error(String(err));
  process.exit(1);
});

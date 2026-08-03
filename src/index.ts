import { log } from "@clack/prompts";
import { loadTasksDATA } from "./data.js";
import { menu, type OptionMenu } from "./ui/menu.js";
import { seeTasks } from "./core/seeTasks.js";
import { addTask } from "./core/addTask.js";
import { searchTask } from "./core/searchTask.js";
import { saveTasks } from "./core/saveTasks.js";
import { exit } from "./core/exit.js";
import type { TaskList } from "./core/task.js";
import { next } from "./ui/next.js";

async function app(): Promise<void> {
  let tasks: TaskList = [];
  let unsavedTasks: boolean = false;
  try {
    tasks = loadTasksDATA();
  } catch (error) {
    log.error("No se pudieron cargar las tareas del archivo: tasks.json");
  }

  while (true) {
    console.clear();
    const option: OptionMenu = await menu(
      tasks.some((task) => !task.deleted),
      unsavedTasks,
    );
    switch (option) {
      case "seeTasks":
        await seeTasks(tasks);
        break;
      case "searchTask":
        const { tasks: newTasks, unsavedTasks: ut } = await searchTask(tasks);
        tasks = newTasks;
        unsavedTasks = ut;
        break;
      case "addTask":
        tasks = await addTask(tasks);
        unsavedTasks = true;
        break;
      case "stats":
        break;
      case "saveTasks":
        unsavedTasks = await saveTasks(tasks);
        break;
      case "exit":
        await exit(unsavedTasks);
        break;
      default:
        break;
    }
    await next();
  }
}

app().catch((err) => {
  log.error(String(err));
  process.exit(1);
});

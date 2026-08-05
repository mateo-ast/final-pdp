import logic from "logicjs-es6";
import type { Task } from "./core/task.js";

const { run, lvar, eq } = logic;

const MS_IN_TWO_DAYS = 2 * 24 * 60 * 60 * 1000;

function urgentGoal(task: Task, out: unknown) {
  const timeRemaining = task.expirationDate.getTime() - Date.now();
  return eq(out, timeRemaining < MS_IN_TWO_DAYS);
}

export function isUrgent(task: Task): boolean {
  const v = lvar("q");
  const solutions = run(urgentGoal(task, v), v) as boolean[];
  return solutions[0] ? solutions[0] : false;
}

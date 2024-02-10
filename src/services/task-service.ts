import { TaskParams } from "../models/task";
import * as taskDB from "../data/task-data";

export async function getTasks() {
  return await taskDB.getTasks();
}

export async function postNewTask(data: TaskParams, userId: number) {
  return await taskDB.postNewTask(data, userId);
}

export async function getTaskById(listId: string) {
  return await taskDB.getTaskById(listId);
}

export async function deleteTask(taskId: string, userId: number) {
  return await taskDB.deleteTask(taskId, userId);
}

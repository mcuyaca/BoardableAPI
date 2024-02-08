import { TaskParams } from "../models/task";
import * as taskDB from "../data/task-data";

export async function getTasks(listId: string) {
  return await taskDB.getTasks(listId);
}

export async function postNewTask(
  data: TaskParams,
  listId: string,
  userId: number
) {
  return await taskDB.postNewTask(data, listId, userId);
}

export async function getTaskById(listId: string) {
  return await taskDB.getTaskById(listId);
}

export async function deleteTask(listId: string, userId: number) {
  return await taskDB.deleteTask(listId, userId);
}

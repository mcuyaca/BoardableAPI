import { ListParams } from "../models/list";
import * as listDB from "../data/list-data";

export async function getLists(userId: number) {
  return await listDB.getLists(userId);
}

export async function postNewList(data: ListParams, userId: number) {
  return await listDB.postNewList(data, userId);
}

export async function editList(
  listId: string,
  listTitle: string,
  userId: number
) {
  return await listDB.editList(listId, listTitle, userId);
}

export async function getListById(listId: string) {
  return await listDB.getListById(listId);
}

export async function deleteList(listId: string, userId: number) {
  return await listDB.deleteList(listId, userId);
}

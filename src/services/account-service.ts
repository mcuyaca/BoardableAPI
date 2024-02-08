import * as db from "../data/account-data";
import { editUserParams } from "../models/user";

export async function getAccountById(userId: number) {
  return await db.getAccountById(userId);
}

export async function editAccount(data: editUserParams, userId: number) {
  return await db.editAccount(data, userId);
}

export async function deleteAccount(userId: number) {
  return await db.deleteAccount(userId);
}

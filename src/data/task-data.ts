import { query } from "../db";
import { TaskParams } from "../models/task";

export async function getTasks(listId: string) {
  return (await query(`SELECT * FROM tasks WHERE listId = $1;`, [listId])).rows;
}

export async function postNewTask(
  data: TaskParams,
  listId: string,
  userId: number
) {
  return (
    await query(
      `INSERT INTO tasks (listId,userId,content,createdAt,updatedAt) 
    VALUES ($1,$2,$3,NOW(),NOW()) 
    RETURNING id, content, createdAt, updatedAt, (SELECT title FROM lists WHERE id = $1) as list;
    `,
      [listId, userId, data.content]
    )
  ).rows[0];
}

export async function getTaskById(taskId: string) {
  return await query(`SELECT * FROM tasks WHERE id = $1;`, [taskId]);
}

export async function deleteTask(listId: string, taskId: number) {
  return (
    await query(`DELETE FROM task WHERE id = $1 AND userId = $2`, [
      listId,
      taskId,
    ])
  ).rows[0];
}

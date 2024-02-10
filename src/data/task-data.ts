import { query } from "../db";
import { TaskParams } from "../models/task";

export async function getTasks() {
  return (await query(`SELECT * FROM tasks ;`)).rows;
}

export async function postNewTask(data: TaskParams, userId: number) {
  return (
    await query(
      `INSERT INTO tasks (listId,userId,content,createdAt,updatedAt) 
    VALUES ($1,$2,$3,NOW(),NOW()) 
    RETURNING id, content, createdAt, updatedAt, (SELECT title FROM lists WHERE id = $1) as list;
    `,
      [data.listId, userId, data.content]
    )
  ).rows[0];
}

export async function getTaskById(taskId: string) {
  return await query(`SELECT * FROM tasks WHERE id = $1;`, [taskId]);
}

export async function deleteTask(taskId: string, userId: number) {
  console.log({ taskId, userId });
  return (
    await query(`DELETE FROM tasks WHERE id = $1 AND userId = $2`, [
      taskId,
      userId,
    ])
  ).rows[0];
}

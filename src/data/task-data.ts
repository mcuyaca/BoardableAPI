import { query } from "../db";
import { TaskParams } from "../models/task";

export async function getTasks() {
  return (await query(`SELECT * FROM tasks ORDER BY id ;`)).rows;
}

export async function postNewTask(
  data: TaskParams,
  userId: number,
  boardId: string
) {
  return (
    await query(
      `INSERT INTO tasks (listId,userId,content,createdAt,updatedAt,boardId) 
    VALUES ($1,$2,$3,NOW(),NOW(),$4) 
    RETURNING id, content, createdAt, updatedAt, (SELECT title FROM lists WHERE id = $1) as list;
    `,
      [data.listId, userId, data.content, boardId]
    )
  ).rows[0];
}

export async function editTask(
  taskId: number,
  taskContent: string,
  userId: number
) {
  console.log({ taskId, taskContent, userId });
  return (
    await query(
      `UPDATE tasks SET content = $1, updatedAt = NOW()  WHERE id = $2 AND userId= $3
      RETURNING *; 
    `,
      [taskContent, taskId, userId]
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

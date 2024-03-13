import { query } from "../db";
import { ListParams } from "../models/list";

export async function getLists(userId: number) {
  return (await query(`SELECT * FROM lists WHERE userId = $1;`, [userId])).rows;
}

export async function postNewList(data: ListParams, userId: number) {
  return (
    await query(
      `INSERT INTO lists (userId, title,boardId) 
    VALUES ($1, $2,$3 ) 
    RETURNING id, title, boardId,(SELECT username FROM users WHERE id = $1) as username;
    `,
      [userId, data.title, data.boardId]
    )
  ).rows[0];
}

export async function editList(
  listId: string,
  listTitle: string,
  userId: number
) {
  return (
    await query(
      `UPDATE lists SET title = $1, updatedAt = NOW() 
      WHERE id = $2  AND userId= $3
      RETURNING *; 
    `,
      [listTitle, listId, userId]
    )
  ).rows[0];
}

export async function getListById(listId: string) {
  return await query(`SELECT * FROM lists WHERE id = $1;`, [listId]);
}

export async function deleteList(listId: string, userId: number) {
  return (
    await query(`DELETE FROM lists WHERE id = $1 AND userId = $2`, [
      listId,
      userId,
    ])
  ).rows[0];
}

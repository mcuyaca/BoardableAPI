import { query } from "../db";
import { BoardParams } from "../models/board";

export async function getBoards(userId: number) {
  return (await query(`SELECT * FROM boards WHERE userId = $1;`, [userId]))
    .rows;
}

export async function postNewBoard(data: BoardParams, userId: number) {
  return (
    await query(
      `INSERT INTO boards (userId, title, color, createdAt, updatedAt) 
    VALUES ($1, $2 ,$3, NOW(), NOW()) 
    RETURNING id, title, color, createdAt, updatedAt, (SELECT username FROM users WHERE id = $1) as username;
    `,
      [userId, data.title, data.color]
    )
  ).rows[0];
}

export async function getBoardById(boardId: string) {
  return await query(`SELECT * FROM boards WHERE id = $1;`, [boardId]);
}

export async function deleteBoard(boardId: string, userId: number) {
  return (
    await query(`DELETE FROM boards WHERE id = $1 AND userId = $2`, [
      boardId,
      userId,
    ])
  ).rows[0];
}
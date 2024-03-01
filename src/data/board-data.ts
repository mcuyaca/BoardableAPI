import { query } from "../db";
import { BoardParams } from "../models/board";
import { postNewList } from "./list-data";

export async function getBoards(userId: number) {
  return (await query(`SELECT * FROM boards WHERE userId = $1;`, [userId]))
    .rows;
}

export async function postNewBoard(data: BoardParams, userId: number) {
  const response = (
    await query(
      `INSERT INTO boards (userId, title, color, createdAt, updatedAt) 
  VALUES ($1, $2 ,$3, NOW(), NOW()) 
  RETURNING id, title, color, createdAt, updatedAt, (SELECT username FROM users WHERE id = $1) as username;
  `,
      [userId, data.title, data.color]
    )
  ).rows[0];

  const boardId = response.id;
  const firstList = { title: "To do", boardId };
  const secondList = { title: "Doing", boardId };
  const thirdList = { title: "Done", boardId };
  await postNewList(firstList, userId);
  await postNewList(secondList, userId);
  await postNewList(thirdList, userId);
  return response;
}

export async function getBoardById(boardId: string) {
  return await query(`SELECT * FROM boards WHERE id = $1;`, [boardId]);
}

export async function editBoard(
  data: BoardParams,
  boardId: string,
  userId: number
) {
  return await query(
    `UPDATE boards SET title = $1  WHERE id = $2 AND userId = $3;`,
    [data.title, boardId, userId]
  );
}

export async function deleteBoard(boardId: string, userId: number) {
  await query(`DELETE FROM tasks WHERE boardId =  $1 AND userId = $2`, [
    boardId,
    userId,
  ]);
  await query(`DELETE FROM lists WHERE boardId =  $1 AND userId = $2`, [
    boardId,
    userId,
  ]);

  return (
    await query(`DELETE FROM boards WHERE id = $1 AND userId = $2`, [
      boardId,
      userId,
    ])
  ).rows[0];
}

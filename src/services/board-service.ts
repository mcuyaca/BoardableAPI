import { BoardParams } from "../models/board";
import * as boardDB from "../data/board-data";

export async function getBoards(userId: number) {
  return await boardDB.getBoards(userId);
}

export async function postNewBoard(data: BoardParams, userId: number) {
  return await boardDB.postNewBoard(data, userId);
}

export async function editBoard(
  data: BoardParams,
  boardId: string,
  userId: number
) {
  return await boardDB.editBoard(data, boardId, userId);
}

export async function getBoardById(boardId: string) {
  return await boardDB.getBoardById(boardId);
}

export async function deleteBoard(boardId: string, userId: number) {
  return await boardDB.deleteBoard(boardId, userId);
}

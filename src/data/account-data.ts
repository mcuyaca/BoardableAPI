import { query } from "../db";
import { editUserParams } from "../models/user";
import { patchFormat } from "../utils/util";

export async function getAccountById(userId: number) {
  return (
    await query(
      `SELECT id , username , email, name, createdat, updatedat 
    FROM users WHERE id = $1`,
      [userId]
    )
  ).rows[0];
}

export async function editAccount(data: editUserParams, userId: number) {
  const stringData = patchFormat(data);
  return (
    await query(
      `UPDATE users SET ${stringData} , updatedat = NOW()
    WHERE id = $1 RETURNING id , username, email, name, createdat, updatedat;`,
      [userId]
    )
  ).rows[0];
}

export async function deleteAccount(userId: number) {
  return await query(`DELETE FROM users WHERE id = $1`, [userId]);
}

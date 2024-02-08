import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  params.context.query(
    `CREATE TABLE lists (
    id SERIAL PRIMARY KEY,
    boardId INTEGER REFERENCES boards(id) NOT NULL,
    userId INTEGER REFERENCES users(id) NOT NULL,
    title VARCHAR(20) NOT NULL);`
  );
};
export const down: Migration = async (params) => {
  params.context.query(`DROP TABLE lists;`);
};

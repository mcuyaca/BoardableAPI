import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  params.context.query(
    `CREATE TABLE boards (
      id SERIAL PRIMARY KEY,
      userId INTEGER REFERENCES users(id) NOT NULL,
      color VARCHAR(7),
      title VARCHAR(20),
      createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP);
      `
  );
};
export const down: Migration = async (params) => {
  params.context.query(`DROP TABLE boards;`);
};

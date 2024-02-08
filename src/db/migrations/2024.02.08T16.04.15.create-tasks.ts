import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  params.context.query(`
  CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    content VARCHAR(50),
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    listId INTEGER REFERENCES lists(id) NOT NULL,
    userId INTEGER REFERENCES users(id) NOT NULL
);
  `);
};
export const down: Migration = async (params) => {
  params.context.query(`DROP TABLE tasks;`);
};

import { configDotenv } from "dotenv";
import { query, pool } from "..";

if (process.env["NODE_ENV"] === "test") {
  configDotenv({ path: ".env.test" });
} else {
  configDotenv();
}

query(
  `-- Insertar datos falsos en la tabla Users
  INSERT INTO users (username, password, email, firstName, lastName, role, createdAt, updatedAt)
  VALUES
      ('user1', 'user1', 'user1@example.com', 'John', 'Doe', 'user', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('user2', 'user2', 'user2@example.com', 'Jane', 'Smith', 'admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('user3', 'user3', 'user3@example.com', 'Alice', 'Johnson', 'user', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('user4', 'user4', 'user4@example.com', 'Bob', 'Brown', 'user', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('user5', 'user5', 'user5@example.com', 'Eva', 'Davis', 'admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
  
  -- Insertar datos falsos en la tabla Posts
  INSERT INTO posts (userId, content, createdAt, updatedAt)
  SELECT
      id,
      'Post content ' || generate_series,
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP
  FROM Users, generate_series(1, 5);
  
  -- Insertar datos falsos en la tabla Likes
  INSERT INTO likes (postId, userId, createdAt)
  SELECT
      p.id,
      u.id,
      CURRENT_TIMESTAMP
  FROM Posts p, Users u
  WHERE p.userId = u.id AND random() < 0.3;
`
).then(() => {
  console.log("Fake data inserted in users, post and likes tables");
  pool.end();
});

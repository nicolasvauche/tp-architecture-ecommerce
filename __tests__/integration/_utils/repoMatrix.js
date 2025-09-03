import { createMemoryContainer } from "../../../config/di.memory.js";
// import { createSqliteContainer } from "../../../config/di.sqlite.js"; // pour plus tard

export const repoMatrix = [
  ["InMemory", async () => createMemoryContainer()],
  // ["SQLite", async () => createSqliteContainer()], // décommente quand prêt
];

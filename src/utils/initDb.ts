// File: src/utils/initDb.ts
import db from "./db";

export async function initializeDatabase() {
  const hasUsers = await db.schema.hasTable("users");
  if (!hasUsers) {
    await db.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username").notNullable().unique();
      table.string("password").notNullable();
      table.timestamp("created_at").defaultTo(db.fn.now());
    });
  }

  const hasFiles = await db.schema.hasTable("files");
  if (!hasFiles) {
    await db.schema.createTable("files", (table) => {
      table.increments("id").primary();
      table.string("filename").notNullable();
      table.string("status").notNullable();
      table.timestamp("created_at").defaultTo(db.fn.now());
    });
  }

  const hasFileData = await db.schema.hasTable("file_data");
  if (!hasFileData) {
    await db.schema.createTable("file_data", (table) => {
      table.increments("id").primary();
      table.integer("file_id").notNullable();
      table.integer("row");
      table.string("name");
      table.text("value");
    });
  }
}

import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"

export const games = sqliteTable("games", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("item").notNull(),
  description: text("description").notNull().default("No Description"),
  started: integer("started").notNull(),
  finished: integer("finished"),
})

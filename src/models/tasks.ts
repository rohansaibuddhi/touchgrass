import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  activityId: integer("activity_id"),
  description: varchar("description", { length: 200 }),
  status: varchar("status", { length: 50 }),
});

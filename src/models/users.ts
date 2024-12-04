import { date, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 50 }),
    name: varchar("name", { length: 50 }),
    dob: date("dob"),
    location: varchar("location", { length: 50 }),
});

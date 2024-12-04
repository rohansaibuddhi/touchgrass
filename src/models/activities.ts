import {
    boolean,
    date,
    integer,
    pgTable,
    serial,
    varchar,
} from "drizzle-orm/pg-core";

export const activities = pgTable("activities", {
    id: serial("id").primaryKey(),
    userid: integer("user_id"),
    summary: varchar("summary", { length: 50 }),
    requestedOn: date("requested_on"),
    location: varchar("location", { length: 50 }),
    completed: boolean("completed"),
    points: integer("points"),
});

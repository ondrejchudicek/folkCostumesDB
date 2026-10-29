import { integer, pgTable, text } from 'drizzle-orm/pg-core';
export const costumes = pgTable('costumes', {
    costumeID: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text('name').notNull(),
    description: text('description').notNull(),
});
export const images = pgTable('images', {
    imageID: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text('name').notNull(),
    path: text('path').notNull(),
    costumeID: integer()
        .notNull()
        .references(() => costumes.costumeID),
});
export const parts = pgTable('parts', {
    partID: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text('name').notNull(),
    path: text('path').notNull(),
    costumeID: integer()
        .notNull()
        .references(() => costumes.costumeID),
});
//# sourceMappingURL=schema.js.map
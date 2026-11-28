import { AnyPgColumn, integer, pgTable, text } from 'drizzle-orm/pg-core';

export const costumes = pgTable('costumes', {
  costumeID: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  thumbnailImageID: integer().references((): AnyPgColumn => images.imageID, {
    onDelete: 'set null',
  }),
});

export type Costume = typeof costumes.$inferSelect;
export type NewCostume = typeof costumes.$inferInsert;

export const images = pgTable('images', {
  imageID: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  path: text('path').notNull(),
  costumeID: integer()
    .notNull()
    .references(() => costumes.costumeID),
  //isThumbnail: boolean().default(false),
});

export type Image = typeof images.$inferSelect;
export type NewImage = typeof images.$inferInsert;

export const parts = pgTable('parts', {
  partID: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  path: text('path').notNull(),
  costumeID: integer()
    .notNull()
    .references(() => costumes.costumeID),
});

export type Part = typeof parts.$inferSelect;
export type NewPart = typeof parts.$inferInsert;

import { defineRelations } from 'drizzle-orm';
import * as schema from './schema.js';

export const relations = defineRelations(schema, (r) => ({
  costumes: {
    images: r.many.images({ alias: 'costumeImages' }),
    parts: r.many.parts(),
    thumbnail: r.one.images({
      from: r.costumes.thumbnailImageID,
      to: r.images.imageID,
      alias: 'thumbnail',
    }),
  },
  images: {
    costume: r.one.costumes({
      from: r.images.costumeID,
      to: r.costumes.costumeID,
      alias: 'costumeImages',
    }),
  },
  parts: {
    costume: r.one.costumes({
      from: r.parts.costumeID,
      to: r.costumes.costumeID,
    }),
  },
}));

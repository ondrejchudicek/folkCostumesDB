import { defineRelations } from 'drizzle-orm';
import * as schema from './schema.js';
export const relations = defineRelations(schema, (r) => ({
    costumes: {
        images: r.many.images(),
        parts: r.many.parts(),
    },
    images: {
        costume: r.one.costumes({
            from: r.images.costumeID,
            to: r.costumes.costumeID,
        }),
    },
    parts: {
        costume: r.one.costumes({
            from: r.parts.costumeID,
            to: r.costumes.costumeID,
        }),
    },
}));
//# sourceMappingURL=relations.js.map
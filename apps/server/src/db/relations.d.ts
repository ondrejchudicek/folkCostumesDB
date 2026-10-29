import * as schema from './schema.js';
export declare const relations: import("drizzle-orm").ExtractTablesWithRelations<{
    costumes: {
        images: import("drizzle-orm").Many<"images">;
        parts: import("drizzle-orm").Many<"parts">;
    };
    images: {
        costume: import("drizzle-orm").One<"costumes", true>;
    };
    parts: {
        costume: import("drizzle-orm").One<"costumes", true>;
    };
}, import("drizzle-orm").ExtractTablesFromSchema<typeof schema>>;

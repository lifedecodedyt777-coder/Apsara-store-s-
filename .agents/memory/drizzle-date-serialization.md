---
name: Drizzle date serialization
description: Drizzle ORM returns timestamp columns as JS Date objects, not strings — Zod schemas generated from OpenAPI expect strings and will throw ZodError if you try to parse DB rows directly.
---

# Rule
Never call `ZodSchema.parse(dbRow)` on rows returned from Drizzle when the schema has `createdAt`/`updatedAt` as strings.

**Why:** Drizzle returns `Date` objects for `timestamp` columns. OpenAPI-generated Zod schemas declare those fields as `string` (ISO format). Calling `.parse()` throws `ZodError: Expected string, received date`.

**How to apply:** Write a `serialize*` helper that spreads the row and converts date fields:
```ts
function serializeProduct(p: Product) {
  return { ...p, createdAt: p.createdAt.toISOString(), updatedAt: p.updatedAt.toISOString() };
}
```
Use this helper in every route handler instead of `GetProductResponse.parse(p)`. Skip Zod validation on the response side entirely — it's redundant after TypeScript typechecks the DB return type.

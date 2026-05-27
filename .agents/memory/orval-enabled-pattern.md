---
name: Orval query enabled pattern
description: When using the `enabled` option on a generated Orval query hook, queryKey must also be provided or TypeScript fails with TS2741.
---

# Rule
Always include `queryKey` when passing `enabled` to a generated `useGet*` hook.

**Why:** The generated hook's options type requires `queryKey` when `enabled` is provided. Omitting it causes `error TS2741: Property 'queryKey' is missing`.

**How to apply:**
```tsx
// CORRECT
const { data } = useGetProduct(id, {
  query: { enabled: !!id, queryKey: getGetProductQueryKey(id) }
});

// WRONG — TS error
const { data } = useGetProduct(id, { query: { enabled: !!id } });
```
The `getGet*QueryKey` helpers are generated alongside the hooks and exported from `@workspace/api-client-react`.

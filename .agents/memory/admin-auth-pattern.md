---
name: Admin auth pattern
description: How admin authentication is implemented in the Apsara Store — JWT in localStorage, setAuthTokenGetter at app root, SESSION_SECRET as JWT signing key.
---

# Pattern
- Admin password stored in `ADMIN_PASSWORD` env var (shared environment)
- `POST /api/admin/login` validates password, returns a JWT signed with `SESSION_SECRET`
- Frontend stores token in `localStorage` under key `admin_token`
- `setAuthTokenGetter(() => localStorage.getItem("admin_token"))` called once at module level in `App.tsx`
- `adminAuth` middleware on server checks `Authorization: Bearer <token>` header
- Admin dashboard at `/admin/dashboard` — redirect to `/admin` (login) if no token

**Why:** Simple, no session cookies needed, works across browser refreshes, SESSION_SECRET already provisioned as a Replit secret.

**How to apply:** See `artifacts/apsara-store/src/hooks/useAdminAuth.ts` for the React hook and `artifacts/api-server/src/lib/auth.ts` for JWT helpers.

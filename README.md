LEO

<!-- Maintenance mode enabled - routing updated -->
## Maintenance Mode

Add a global maintenance mode with an env flag so you can safely take the site offline while still allowing health checks and an admin bypass.

### How it works
- Set `MAINTENANCE_MODE` to `"on"` to enable maintenance mode.
- All requests are redirected to `/maintenance` except:
  - `/maintenance`, `/_next/*`, `/favicon.ico`, public assets like `/images/*` and `/assets/*`, and `/api/health`.
- Admin bypass: if a cookie `MAINT_BYPASS` equals the value of `MAINTENANCE_BYPASS`, the user is not redirected.

Middleware runs at the edge and the maintenance page responds with HTTP 503 and includes a Retry button. If the bypass cookie is present, a small "Admin bypass active" hint is shown.

### Toggle on Vercel
1. Open your Vercel Project → Settings → Environment Variables.
2. Add or update:
   - `MAINTENANCE_MODE` = `on` (enable) or `off` (disable).
   - Optional: `MAINTENANCE_BYPASS` = a long random string (admin secret).
3. Apply to the environments you need (Production and/or Preview) and redeploy to take effect.

To use the admin bypass locally in your browser, set the cookie via DevTools console:

```js
document.cookie = "MAINT_BYPASS=<your-secret>; path=/; secure; samesite=lax";
```

### Local development
- Create `.env.local` with:

```
MAINTENANCE_MODE=on
MAINTENANCE_BYPASS=some-long-random-secret
```

Restart the dev server after changes.

### Health check endpoint
`GET /api/health` returns `{ ok: true }` and status `200` for uptime monitors.
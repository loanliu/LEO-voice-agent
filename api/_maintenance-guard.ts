export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const maintenanceMode = (process.env.MAINTENANCE_MODE || 'off').toLowerCase();

  // Exclusions (also handled by routes order, but double-check here)
  const isExcluded =
    pathname === '/maintenance' ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/api/health');

  if (isExcluded) {
    return fetch(req);
  }

  if (maintenanceMode === 'on') {
    // Admin bypass via cookie
    const bypassCookie = getCookie(req, 'MAINT_BYPASS');
    const bypassSecret = process.env.MAINTENANCE_BYPASS || '';
    const bypassActive = Boolean(bypassCookie && bypassSecret && bypassCookie === bypassSecret);

    if (!bypassActive) {
      const redirectUrl = new URL('/maintenance', url);
      return Response.redirect(redirectUrl, 307);
    }
  }

  // Pass through to filesystem / other functions
  return fetch(req);
}

function getCookie(req: Request, name: string): string | undefined {
  const header = req.headers.get('cookie') || '';
  const match = header.match(new RegExp('(?:^|; )' + name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : undefined;
}



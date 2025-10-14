export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const maintenanceMode = (process.env.MAINTENANCE_MODE || 'off').toLowerCase();

  console.log('Maintenance guard called for:', pathname, 'Mode:', maintenanceMode);

  // Exclusions (also handled by routes order, but double-check here)
  const isExcluded =
    pathname === '/maintenance' ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/api/health') ||
    pathname.startsWith('/src') ||
    pathname.startsWith('/public');

  if (isExcluded) {
    console.log('Path excluded:', pathname);
    return fetch(req);
  }

  if (maintenanceMode === 'on') {
    console.log('Maintenance mode ON, checking bypass');
    // Admin bypass via cookie
    const bypassCookie = getCookie(req, 'MAINT_BYPASS');
    const bypassSecret = process.env.MAINTENANCE_BYPASS || '';
    const bypassActive = Boolean(bypassCookie && bypassSecret && bypassCookie === bypassSecret);

    console.log('Bypass cookie:', bypassCookie ? 'present' : 'absent');
    console.log('Bypass active:', bypassActive);

    if (!bypassActive) {
      console.log('Redirecting to maintenance page');
      const redirectUrl = new URL('/maintenance', url);
      return Response.redirect(redirectUrl, 307);
    }
  }

  console.log('Passing through to filesystem');
  // Pass through to filesystem / other functions
  return fetch(req);
}

function getCookie(req: Request, name: string): string | undefined {
  const header = req.headers.get('cookie') || '';
  const match = header.match(new RegExp('(?:^|; )' + name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : undefined;
}



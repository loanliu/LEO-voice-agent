export const config = {
  runtime: 'edge',
};

export default async function handler() {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>We'll be right back</title>
    <style>
      :root { color-scheme: light dark; }
      body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"; }
      .wrap { min-height: 100dvh; display: grid; place-items: center; background: #0b1220; color: #e5e7eb; }
      .card { max-width: 640px; padding: 32px; text-align: center; background: #0f172a; border: 1px solid #1f2937; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,.35); }
      h1 { margin: 0 0 8px; font-size: 28px; }
      p { margin: 0 0 16px; line-height: 1.6; color: #cbd5e1; }
      .actions { display: flex; justify-content: center; gap: 12px; margin-top: 8px; }
      button { appearance: none; border: 0; padding: 10px 14px; border-radius: 8px; background: #2563eb; color: white; cursor: pointer; font-weight: 600; }
      button:focus-visible { outline: 2px solid #93c5fd; outline-offset: 2px; }
      .hint { margin-top: 10px; font-size: 12px; color: #94a3b8; }
      .badge { display: inline-block; padding: 2px 6px; border-radius: 6px; background: #1e293b; border: 1px solid #334155; color: #93c5fd; }
    </style>
  </head>
  <body>
    <main class="wrap" role="main">
      <section class="card" aria-live="polite">
        <h1>We'll be right back</h1>
        <p>We’re doing some maintenance. Please try again soon.</p>
        <div class="actions">
          <button onclick="location.reload()" aria-label="Retry loading the page">Retry</button>
        </div>
      </section>
    </main>
  </body>
</html>`;

  return new Response(html, {
    status: 503,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}



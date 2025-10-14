'use client';

import React from 'react';

export default function MaintenancePage() {
  const [adminBypass, setAdminBypass] = React.useState(false);

  React.useEffect(() => {
    // Detect bypass cookie client-side to avoid hydration mismatch
    const cookies = typeof document !== 'undefined' ? document.cookie : '';
    const hasBypass = /(?:^|; )MAINT_BYPASS=([^;]+)/.test(cookies);
    setAdminBypass(hasBypass);
  }, []);

  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'grid',
        placeItems: 'center',
        background: '#0b1220',
        color: '#e5e7eb',
      }}
      role="main"
      aria-live="polite"
    >
      <section
        style={{
          maxWidth: 640,
          width: '100%',
          padding: 32,
          textAlign: 'center',
          background: '#0f172a',
          border: '1px solid #1f2937',
          borderRadius: 12,
          boxShadow: '0 10px 25px rgba(0,0,0,.35)',
        }}
      >
        <h1 style={{ margin: '0 0 8px', fontSize: 28 }}>We&apos;ll be right back</h1>
        <p style={{ margin: '0 0 16px', lineHeight: 1.6, color: '#cbd5e1' }}>
          We’re doing some maintenance. Please try again soon.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          <button
            onClick={() => typeof window !== 'undefined' && window.location.reload()}
            style={{
              appearance: 'none',
              border: 0,
              padding: '10px 14px',
              borderRadius: 8,
              background: '#2563eb',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 600,
            }}
            aria-label="Retry loading the page"
          >
            Retry
          </button>
        </div>
        {adminBypass ? (
          <div style={{ marginTop: 10, fontSize: 12, color: '#94a3b8' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '2px 6px',
                borderRadius: 6,
                background: '#1e293b',
                border: '1px solid #334155',
                color: '#93c5fd',
              }}
            >
              Admin bypass active
            </span>
          </div>
        ) : null}
      </section>
    </main>
  );
}




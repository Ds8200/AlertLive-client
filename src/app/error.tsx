'use client';

import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: '16px',
        color: '#f1f5f9',
        background: '#060610',
        direction: 'rtl',
      }}
    >
      <h2 style={{ fontSize: '22px' }}>שגיאה בטעינת האפליקציה</h2>
      <p style={{ color: '#94a3b8', fontSize: '14px' }}>
        {error.message || 'אירעה שגיאה בלתי צפויה'}
      </p>
      <button
        onClick={reset}
        style={{
          padding: '10px 24px',
          background: '#3b82f6',
          color: '#fff',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        נסה שוב
      </button>
    </div>
  );
}

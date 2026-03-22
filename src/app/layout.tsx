import type { Metadata } from 'next';
import './globals.scss';
import { JotaiProvider } from '@/providers/JotaiProvider';

export const metadata: Metadata = {
  title: 'AlertLive',
  description: 'מערכת ניטור התרעות ביטחוניות בזמן אמת',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="he" dir="rtl">
    <head>
      <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚨</text></svg>"/>
    </head>
    <body>
      <JotaiProvider>{children}</JotaiProvider>
    </body>
  </html>
);

export default RootLayout;

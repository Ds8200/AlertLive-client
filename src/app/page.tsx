import dynamic from 'next/dynamic';

const AppShell = dynamic(
  () => import('@/components/AppShell/AppShell').then((m) => m.AppShell),
  { ssr: false }
);

export default function HomePage() {
  return <AppShell />;
}

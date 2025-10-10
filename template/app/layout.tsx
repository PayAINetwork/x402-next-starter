import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'x402 Next.js App',
  description: 'A Next.js application with x402 payment protocol integration',
};

/**
 * Root layout component
 * @param children - Child components
 * @returns JSX element
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

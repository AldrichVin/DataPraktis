import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/providers/auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DataPraktis - Marketplace Data Analytics untuk Bisnis Indonesia',
  description:
    'Hubungkan bisnis Anda dengan data scientist & analyst profesional. Upload data, dapatkan insight, dashboard, dan laporan yang mudah dipahami.',
  keywords: [
    'data analytics',
    'data scientist',
    'freelance analyst',
    'business intelligence',
    'Indonesia',
    'marketplace',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

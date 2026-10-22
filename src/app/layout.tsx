import React from 'react';
import type { Metadata, Viewport } from 'next';
import '@/styles/tailwind.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://jfconsultoriaweb.com.ar'),
  alternates: {
    canonical: '/',
  },
  title: 'JF Consultoría Web — Diseño Web para Emprendedores y Negocios',
  description: 'Diseño web profesional para emprendedores, comercios y profesionales. Landing pages, webs institucionales y portfolios. Modernos, responsive y preparados para recibir consultas por WhatsApp.',
  icons: {
    icon: [
      { url: '/assets/images/app_logo.svg', type: 'image/svg+xml' }
    ],
  },
  openGraph: {
    title: 'JF Consultoría Web — Diseño Web para Emprendedores y Negocios',
    description: 'Diseño web profesional para emprendedores, comercios y profesionales. Webs modernas, responsive y listas para recibir consultas.',
    url: 'https://jfconsultoriaweb.com.ar/',
    type: 'website',
    locale: 'es_AR',
    siteName: 'JF Consultoría Web',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JF Consultoría Web — Diseño Web para Emprendedores y Negocios',
    description: 'Diseño web profesional para emprendedores, comercios y profesionales. Webs modernas, responsive y listas para recibir consultas.',
  },
  verification: {
    google: 'whstIi1bpE8wFmpQ04CLmvznyiWvf9cWYr4XDbMJMaY',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

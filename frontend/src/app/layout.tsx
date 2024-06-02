import React from 'react';
import Header from '../components/Header';
import '../styles/globals.css'
import Layout from '../components/Layout';
import { AuthProvider } from '../components/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Агентство недвижимости</title>
      </head>
      <body>
        <AuthProvider>
          <Layout.Header>
            <Header />
          </Layout.Header>

          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
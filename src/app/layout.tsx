import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { EnvConfigProvider } from '@/containers/envConfig/envConfigProvider'
import { AuthSessionProvider } from '@/containers/authentication/authSessionProvider'
import { Web3Provider } from '@/containers/web3/Web3Provider'
import { appDescription } from '@/utils/constants'
import { ReactNode } from 'react'
import { ApolloStakingGraphProvider } from '@/containers/apolloStakingGraph/ApolloStakingGraphProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  adjustFontFallback: false,
})

export const metadata: Metadata = appDescription

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="OnRamp Labs - Due Diligence" />
        <link rel="icon" href="/icons/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/icons/favicon-16x16.png" sizes="16x16" />
      </head>
      <body className={inter.className}>
        <EnvConfigProvider>
          <ApolloStakingGraphProvider>
            <Web3Provider>
              <AuthSessionProvider>{children}</AuthSessionProvider>
            </Web3Provider>
          </ApolloStakingGraphProvider>
        </EnvConfigProvider>
      </body>
    </html>
  )
}

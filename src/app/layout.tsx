import '~/styles/globals.css'

import { Inter } from 'next/font/google'
import AppProvider from '~/components/AppProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'UiFlows Editor',
  description: 'A visual editor for creating and sharing ui flows.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
    <html lang="ja">
      <body className={`font-sans ${inter.variable}`}>{children}</body>
    </html>
    </AppProvider>
  )
}


import type { Metadata } from 'next'
import '../styles/globals.css'
import FeedbackWidget from '@/components/FeedbackWidget'

export const metadata: Metadata = {
  title: 'Case Study Extractor | Turn project photos into sales collateral',
  description: 'Upload project materials. Get case studies that close deals. $150 one-time.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700;800;900&family=Literata:opsz,wght@7..72,400;7..72,500;7..72,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <script async src="https://plausible.io/js/pa-TqN3bdmHKf14cMbsuaVe1.js"></script>
        <script dangerouslySetInnerHTML={{__html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}} />
      </head>
      <body>
        {children}
        <FeedbackWidget toolName="Case Study Extractor" />
      </body>
    </html>
  )
}

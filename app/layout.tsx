import type { Metadata } from 'next';
import { Providers } from './providers';
import { ThemeProvider } from './components/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'FairGazer - Win Digital Treasures',
  description: 'Win Digital Treasures with Blockchain-Guaranteed Fairness',
  openGraph: {
    title: 'FairGazer - Win Digital Treasures',
    description: 'Win Digital Treasures with Blockchain-Guaranteed Fairness',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

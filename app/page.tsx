import { WalletProvider } from './providers/WalletProvider'
import { AppShell } from './components/AppShell'

export default function Home() {
  return (
    <WalletProvider>
      <AppShell />
    </WalletProvider>
  )
}


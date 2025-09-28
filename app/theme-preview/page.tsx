'use client';

import { useTheme } from '../components/ThemeProvider';
import { AppShell } from '../components/AppShell';
import { DrawCard } from '../components/DrawCard';
import { MarketplaceItemCard } from '../components/MarketplaceItemCard';
import { MOCK_DRAWS, MOCK_PRIZES } from '@/lib/constants';

const themes = [
  { id: 'default', name: 'Cyberpunk Gaming', description: 'Dark purple with neon green accents' },
  { id: 'celo', name: 'CELO', description: 'Black background with yellow accents' },
  { id: 'solana', name: 'Solana', description: 'Dark purple with purple/magenta accents' },
  { id: 'base', name: 'Base', description: 'Dark blue with Base blue accents' },
  { id: 'coinbase', name: 'Coinbase', description: 'Dark navy with Coinbase blue accents' },
];

export default function ThemePreview() {
  const { theme, setTheme } = useTheme();

  return (
    <AppShell activeTab="dashboard">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-fg">Theme Preview</h1>
          <p className="text-lg text-muted">
            Preview FairGazer in different blockchain themes
          </p>
        </div>

        {/* Theme Selector */}
        <div className="cyber-card">
          <h2 className="text-xl font-bold text-fg mb-4">Select Theme</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id as any)}
                className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                  theme === themeOption.id
                    ? 'border-accent bg-accent/20 text-accent'
                    : 'border-border bg-surface/50 text-fg hover:border-accent/50'
                }`}
              >
                <div className="font-bold mb-1">{themeOption.name}</div>
                <div className="text-sm text-muted">{themeOption.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Component Previews */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-fg">Component Preview</h2>
          
          {/* Draw Cards */}
          <div>
            <h3 className="text-lg font-bold text-fg mb-4">Draw Cards</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {MOCK_DRAWS.slice(0, 2).map((draw) => (
                <DrawCard key={draw.drawId} draw={draw} variant="active" />
              ))}
            </div>
          </div>

          {/* Prize Cards */}
          <div>
            <h3 className="text-lg font-bold text-fg mb-4">Prize Cards</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {MOCK_PRIZES.map((prize) => (
                <MarketplaceItemCard key={prize.itemId} item={prize} />
              ))}
            </div>
          </div>

          {/* UI Elements */}
          <div className="cyber-card">
            <h3 className="text-lg font-bold text-fg mb-4">UI Elements</h3>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <button className="cyber-button">Primary Button</button>
                <button className="px-4 py-2 bg-surface border border-border rounded-lg hover:border-accent/50 transition-colors">
                  Secondary Button
                </button>
                <button className="px-4 py-2 bg-accent/20 border border-accent/30 rounded-lg text-accent hover:bg-accent/30 transition-colors">
                  Accent Button
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="metric-card">
                  <div className="text-2xl font-bold text-accent">1,234</div>
                  <div className="text-sm text-muted">Sample Metric</div>
                </div>
                <div className="metric-card">
                  <div className="text-2xl font-bold text-accent">$5,678</div>
                  <div className="text-sm text-muted">Another Metric</div>
                </div>
                <div className="metric-card">
                  <div className="text-2xl font-bold text-accent">90%</div>
                  <div className="text-sm text-muted">Progress</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

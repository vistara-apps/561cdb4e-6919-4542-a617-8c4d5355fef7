'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="cyber-card max-w-md w-full text-center">
        <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-error" />
        </div>
        
        <h2 className="text-2xl font-bold text-fg mb-2">
          Something went wrong!
        </h2>
        
        <p className="text-muted mb-6">
          An error occurred while loading FairGazer. Please try again.
        </p>
        
        <button
          onClick={reset}
          className="cyber-button w-full"
        >
          <div className="flex items-center justify-center space-x-2">
            <RefreshCw className="w-5 h-5" />
            <span>Try Again</span>
          </div>
        </button>
      </div>
    </div>
  );
}

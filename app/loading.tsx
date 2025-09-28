export default function Loading() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto"></div>
        <div className="text-accent font-bold">Loading FairGazer...</div>
        <div className="text-muted text-sm">Preparing your digital treasure hunt</div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="flex min-h-[60vh] flex-1 items-center justify-center p-8"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="font-display text-5xl tracking-[-0.04em] sm:text-6xl">
          ХРУМ<span className="text-accent animate-pulse">.</span>
        </div>
      </div>
    </div>
  );
}

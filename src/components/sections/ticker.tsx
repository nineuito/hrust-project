const items = [
  "FREE DELIVERY 500+",
  "30 MIN",
  "FRESH DAILY",
  "NEW MENU",
  "−30% FIRST ORDER",
  "OPEN 10:00 — 23:00",
];

export function Ticker() {
  const row = [...items, ...items];
  return (
    <section
      className="overflow-hidden border-b-2 border-ink bg-ink text-paper"
      aria-hidden
    >
      <div className="ticker-track flex whitespace-nowrap py-3 font-display text-lg tracking-[0.15em]">
        {row.map((t, i) => (
          <span key={i} className="mx-6 inline-flex items-center gap-6">
            <span className="text-accent">★</span>
            <span>{t}</span>
          </span>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="uk">
      <body
        style={{
          margin: 0,
          padding: "80px 24px",
          fontFamily: "system-ui, sans-serif",
          background: "#f0eee9",
          color: "#1a1a1a",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 480 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: "#ff5a1f",
              lineHeight: 1,
            }}
          >
            !
          </div>
          <h1 style={{ marginTop: 8, fontSize: 28, fontWeight: 800 }}>
            Щось хрумнуло. / Something crunched wrong.
          </h1>
          <p style={{ marginTop: 8, color: "#555" }}>
            Сталася непередбачена помилка. Спробуй ще раз.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: 24,
              padding: "12px 24px",
              background: "#ff5a1f",
              color: "#fdfcf7",
              border: "2px solid #1a1a1a",
              borderRadius: 6,
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "4px 4px 0 #1a1a1a",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

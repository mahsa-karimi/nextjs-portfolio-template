const stackMarks = [
  {
    label: "Framework",
    className: "left-[5%] top-[12%] -rotate-12",
    viewBox: "0 0 64 64",
    content: (
      <>
        <path d="M32 5 7 15l4 32 21 12 21-12 4-32Z" fill="#61dafb" />
        <path d="m32 17-13 29h6l2-6h10l2 6h6Zm0 10 3 8h-6Z" fill="#0f172a" />
      </>
    ),
  },
  {
    label: "Programming language",
    className: "left-[37%] top-[26%] z-10 rotate-6",
    viewBox: "0 0 100 100",
    content: (
      <>
        <rect x="7" y="7" width="86" height="86" rx="18" fill="#f7df1e" />
        <path d="m28 66 8 5c2 4 5 6 9 6 4 0 7-2 7-5 0-4-3-5-8-7l-3-1c-8-3-13-7-13-15 0-7 6-13 16-13 7 0 12 2 15 8l-8 5c-2-3-4-4-7-4s-5 2-5 4c0 3 2 4 7 6l3 1c9 3 14 8 14 16 0 9-7 14-17 14-9 0-15-4-18-10Zm39-29h10v29c0 9-5 14-13 14-7 0-12-4-14-10l9-4c1 3 2 5 5 5 2 0 3-1 3-5Z" fill="#111827" />
      </>
    ),
  },
  {
    label: "Library",
    className: "bottom-[6%] left-[53%] z-20 -rotate-6",
    viewBox: "0 0 100 100",
    content: (
      <>
        <circle cx="50" cy="50" r="44" fill="#111827" />
        <path d="m27 43 23-18 23 18v28H27Z" fill="none" stroke="#61dafb" strokeWidth="6" />
        <path d="M38 52h24M38 63h24" stroke="#61dafb" strokeWidth="5" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Tool",
    className: "bottom-[1%] left-[15%] rotate-6",
    viewBox: "0 0 100 100",
    content: (
      <>
        <circle cx="50" cy="50" r="42" fill="#f97316" />
        <path d="m57 28-9 9 15 15-7 7-15-15-9 9-5-18Z" fill="white" />
        <path d="m60 58 13 13" stroke="white" strokeWidth="8" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Methodology",
    className: "right-[2%] top-[8%] rotate-12",
    viewBox: "0 0 100 100",
    content: (
      <>
        <rect x="10" y="10" width="80" height="80" rx="20" fill="#8b5cf6" />
        <path d="M28 34h44M28 50h28M28 66h36" stroke="white" strokeWidth="7" strokeLinecap="round" />
        <circle cx="72" cy="50" r="5" fill="#f7df1e" />
      </>
    ),
  },
] as const;

export function FrameworkLogos() {
  return (
    <div
      aria-label="Framework, programming language, library, tool, and methodology examples"
      role="img"
      className="relative mx-auto h-64 w-full max-w-[360px] sm:h-72"
    >
      <div className="absolute inset-8 rounded-[3rem] bg-primary/10 dark:bg-primary/5" />
      {stackMarks.map((mark) => (
        <div
          key={mark.label}
          className={`absolute flex size-24 items-center justify-center rounded-3xl border border-border bg-card shadow-xl sm:size-28 ${mark.className}`}
        >
          <svg
            viewBox={mark.viewBox}
            aria-hidden="true"
            className="size-16 sm:size-20"
          >
            {mark.content}
          </svg>
        </div>
      ))}
    </div>
  );
}

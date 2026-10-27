import React from 'react';

export default function CaseBlockQuote({ block }) {
  if (!block?.quote) return null;
  return (
    <blockquote className="offset-blue max-w-[65ch] rounded-xl border border-primary bg-card p-6 md:p-8">
      <span
        aria-hidden="true"
        className="block font-display text-4xl font-bold leading-[0.55] text-accent md:text-5xl"
      >
        «
      </span>
      <p className="mt-3 font-display text-lg italic leading-relaxed text-foreground text-pretty">
        {block.quote}
      </p>
      {block.attribution && (
        <footer className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {block.attribution}
        </footer>
      )}
    </blockquote>
  );
}
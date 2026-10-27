import React, { useState, useEffect } from 'react';

export default function ListField({ value = [], onChange, label, placeholder, rows = 4 }) {
  const [text, setText] = useState((value || []).join('\n'));

  useEffect(() => {
    setText((value || []).join('\n'));
  }, [value]);

  return (
    <div>
      {label && (
        <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() =>
          onChange(
            text
              .split('\n')
              .map((s) => s.trim())
              .filter(Boolean)
          )
        }
        placeholder={placeholder || 'Un elemento por línea'}
        className="w-full px-3 py-2.5 bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-accent outline-none resize-y"
      />
    </div>
  );
}
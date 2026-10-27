import React from 'react';

const BLOCK_TAGS = /<\/?(script|style|iframe|object|embed|form|input|link|meta)[^>]*>/gi;
const EVENT_ATTRS = /\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi;
const BAD_URL = /(href|src)\s*=\s*("|')\s*javascript:[^"']*\2/gi;

const CLASSES =
  'text-base md:text-lg text-foreground/90 leading-relaxed text-pretty ' +
  '[&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 ' +
  '[&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 ' +
  '[&_strong]:font-semibold [&_strong]:text-foreground [&_em]:italic ' +
  '[&_h3]:mb-2 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground ' +
  '[&_h4]:mb-2 [&_h4]:font-display [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-foreground ' +
  '[&_a]:text-link [&_a]:underline [&_a:hover]:text-link-hover ' +
  '[&_img]:my-6 [&_img]:w-full [&_img]:rounded-xl';

export default function RichText({ html, className = '' }) {
  if (!html) return null;

  const clean = String(html)
    .replace(BLOCK_TAGS, '')
    .replace(EVENT_ATTRS, '')
    .replace(BAD_URL, '$1="#"');

  return (
    <div className={`${CLASSES} ${className}`.trim()} dangerouslySetInnerHTML={{ __html: clean }} />
  );
}
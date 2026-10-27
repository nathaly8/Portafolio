import React from 'react';
import RichText from '@/components/portfolio/RichText';

export default function CaseBlockHtml({ block }) {
  if (!block?.content) return null;
  return <RichText html={block.content} className="max-w-[65ch]" />;
}
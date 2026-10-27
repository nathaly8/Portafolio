import React from 'react';
import CaseBlockHtml from './CaseBlockHtml';
import CaseBlockImage from './CaseBlockImage';
import CaseBlockCompare from './CaseBlockCompare';
import CaseBlockQuote from './CaseBlockQuote';
import CaseBlockDecision from './CaseBlockDecision';
import CaseBlockGallery from './CaseBlockGallery';
import CaseBlockSplit from './CaseBlockSplit';

export default function CaseBlockRenderer({ block, preview }) {
  switch (block?.type) {
    case 'html':
      return <CaseBlockHtml block={block} />;
    case 'image':
      return <CaseBlockImage block={block} preview={preview} />;
    case 'compare':
      return <CaseBlockCompare block={block} preview={preview} />;
    case 'quote':
      return <CaseBlockQuote block={block} />;
    case 'decision':
      return <CaseBlockDecision block={block} />;
    case 'gallery':
      return <CaseBlockGallery block={block} preview={preview} />;
    case 'split':
      return <CaseBlockSplit block={block} preview={preview} />;
    default:
      return null;
  }
}
import React from 'react';
import CaseImage from '@/components/case/CaseImage';
import RichText from '@/components/portfolio/RichText';

// Imagen a un lado y texto al otro: presenta un personaje o una pantalla junto
// a su explicación sin alargar el scroll del caso.
export default function CaseBlockSplit({ block, preview }) {
  if (!block || (!block.image && !preview)) return null;

  const imageRight = block.side === 'right';

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center md:gap-10">
      {/* La imagen acompaña al texto: se limita su ancho para que quepa en
          pantalla junto a la explicación, sin obligar a hacer scroll. */}
      <div
        className={`mx-auto w-full md:max-w-[300px] ${
          imageRight ? 'md:order-2 md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'
        }`}
      >
        <CaseImage
          src={block.image}
          alt={block.alt}
          caption={block.caption}
          width={block.width}
          height={block.height}
          preview={preview}
        />
      </div>
      <div className={imageRight ? 'md:order-1' : ''}>
        {block.heading && (
          <h3 className="font-display text-xl font-bold tracking-tight text-balance md:text-2xl">
            {block.heading}
          </h3>
        )}
        {block.content && (
          <RichText html={block.content} className={block.heading ? 'mt-4' : ''} />
        )}
        {block.quote && (
          <p className="mt-6 max-w-[65ch] border-l-2 border-accent bg-lightSection px-4 py-3 text-sm text-muted-foreground text-pretty">
            {block.quote}
          </p>
        )}
      </div>
    </div>
  );
}
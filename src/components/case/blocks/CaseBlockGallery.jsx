import React from 'react';
import CaseImage from '@/components/case/CaseImage';

export default function CaseBlockGallery({ block, preview }) {
  const images = block?.images || [];
  if (images.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {images.map((item, index) => (
        <CaseImage
          key={index}
          src={item.image}
          alt={item.alt}
          caption={item.caption}
          width={item.width}
          height={item.height}
          preview={preview}
        />
      ))}
    </div>
  );
}
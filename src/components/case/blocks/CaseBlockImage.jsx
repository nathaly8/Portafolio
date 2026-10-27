import React from 'react';
import CaseImage from '@/components/case/CaseImage';

export default function CaseBlockImage({ block, preview }) {
  // El tamaño lo resuelve CaseImage: respeta el ancho real del archivo y limita
  // el alto de la caja a dos pantallas como máximo.
  return (
    <CaseImage
      src={block.image}
      alt={block.alt}
      caption={block.caption}
      width={block.width}
      height={block.height}
      preview={preview}
    />
  );
}
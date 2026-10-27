import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { Image } from '@/components/ui/image';

// Marco editorial de producto del design system (fondo de superficie, borde sutil, radio 24 y padding 12)
const TONES = {
  default: 'border-border bg-card',
  muted: 'border-border bg-lightSection',
  accent: 'border-accent bg-card',
};

export default function CaseImage({
  src,
  alt,
  caption,
  width,
  height,
  eager = false,
  preview = false,
  tone = 'default',
  className = '',
  maxHeightVh = 200,
}) {
  if (!src && !preview) return null;
  const hasSize = Boolean(width && height);
  // Nunca se amplía por encima del ancho real del archivo y la caja se limita a
  // dos pantallas de alto como máximo, para no obligar a hacer scroll de más.
  const maxWidth = width
    ? hasSize
      ? `min(${Math.min(width, 1024)}px, ${Math.round((maxHeightVh * width) / height)}vh)`
      : `${Math.min(width, 1024)}px`
    : undefined;

  return (
    <figure className={className} style={maxWidth ? { maxWidth } : undefined}>
      <div className={`overflow-hidden rounded-xl border p-3 ${TONES[tone] || TONES.default}`}>
        {src ? (
          hasSize ? (
            // Proporción real del archivo: la caja toma su alto del ancho disponible
            // (height auto) y la imagen se muestra completa, sin recorte ni altura fija.
            <Image
              src={src}
              alt={alt || ''}
              fittingType="fit"
              loading={eager ? 'eager' : 'lazy'}
              originWidth={width}
              originHeight={height}
              className="w-full rounded-lg"
            />
          ) : (
            // Sin medidas registradas: se usa la URL original a ancho completo.
            <img
              src={src}
              alt={alt || ''}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              className="block w-full h-auto rounded-lg"
            />
          )
        ) : (
          <div className="flex aspect-[16/9] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border-strong text-muted-foreground">
            <ImageIcon size={20} aria-hidden="true" />
            <span className="text-sm">Imagen pendiente</span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 max-w-[65ch] text-sm text-muted-foreground text-pretty">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
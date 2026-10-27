import React, { useRef, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Loader2, Upload, X } from 'lucide-react';

export default function ImageUpload({ value, onChange, label, alt = '' }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handle = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
      onChange(file_url);
    } catch (err) {
      alert('Error al subir la imagen: ' + (err.message || err));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handle}
        disabled={uploading}
      />
      {value ? (
        <div>
          <div className="relative">
            <img
              src={value}
              alt={alt || label || ''}
              className="w-full h-40 object-cover border border-border"
            />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-2 right-2 bg-background/85 p-1.5 border border-border text-muted-foreground hover:text-destructive"
              aria-label="Quitar imagen"
            >
              <X size={14} />
            </button>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-2 text-xs text-accent-ink hover:text-link-hover transition-colors"
          >
            Reemplazar imagen
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex flex-col items-center justify-center w-full h-40 border border-dashed border-border text-muted-foreground hover:border-accent hover:text-accent-ink transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Upload size={18} />
          )}
          <span className="mt-2 text-xs">
            {uploading ? 'Subiendo...' : 'Subir imagen'}
          </span>
        </button>
      )}
    </div>
  );
}
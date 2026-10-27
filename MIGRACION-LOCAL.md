# Migración local · 26 de octubre de 2026

El portafolio público sirve sus contenidos, imágenes y fuentes sin Base44.

- Datos: 9 proyectos (4 publicados) y 6 experiencias en `src/data`.
- Recursos: 44 imágenes en `public/images`, 8 archivos de fuentes en `public/fonts` y favicon local.
- Base44: cliente y herramientas del builder desactivados por defecto. Código, entidades y admin conservados.
- Admin remoto opcional: `VITE_ENABLE_BASE44_ADMIN=true` en `.env.local`; reiniciar el servidor. Sus cambios no actualizan la copia local.
- Desarrollo: `npm run dev`. Compilación: `npm run build`. Vista de producción: `npm run preview`.
- Vercel: publicar `dist/`; las rutas SPA se resuelven mediante `vercel.json`.

## Verificación

Chrome con contexto nuevo, sin caché ni service workers, bloqueando todas las conexiones externas y las rutas `/api`:

- Home y Proyectos: los 4 proyectos publicados, con orden correcto.
- About: las 6 experiencias.
- Los 4 detalles: contenido e imágenes cargados; todas las imágenes completaron la carga con dimensiones válidas.
- Fuentes locales cargadas.
- Borradores restringidos, slug inexistente y ruta 404.
- Admin desactivado con mensaje explícito.
- Resultado: cero peticiones externas, cero peticiones al backend y cero errores JavaScript.

`npm run build` y `npm run lint`: correctos.
`npm run typecheck`: quedan 117 errores de tipado previos; había 120 antes de la migración. Los tipos de Vite corrigen tres de ellos. No impiden la compilación.

Los enlaces a Behance y al CV conservan sus destinos externos. El código de Base44 permanece en el proyecto para una eventual reactivación; no se ha desplegado ni publicado ningún cambio.

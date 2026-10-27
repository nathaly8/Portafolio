## Versión local del portafolio

Ejecuta `npm run dev` para ver el portafolio con datos locales, o `npm run build` y `npm run preview` para comprobar la compilación.

- `src/data/projects.js`: copia completa de Project (9 registros, incluidos borradores).
- `src/data/siteContent.js`: copia de SiteContent, con 6 experiencias.
- Exportación: 26 de octubre de 2026, app `6aacaf97de9341cd214e9de3`.
- Home, Proyectos, ProjectDetail y About leen estos archivos mediante `src/lib/portfolioData.js`. Se conservan filtros, orden, slugs y restricciones de borradores.
- El admin conserva las lecturas y escrituras de Base44 mediante `src/lib/adminPortfolioData.js`. Sus cambios remotos no modifican esta copia local: actualiza los archivos para publicar cambios de contenido local.
- 44 imágenes, las fuentes y el favicon se sirven desde `public/`, sin conexiones externas.
- Para verificar, bloquea las peticiones externas y `/api` en localhost: textos, imágenes y experiencia deben seguir apareciendo.
- Base44 está desactivado por defecto, incluso con tokens guardados. Para reactivar el admin original añade `VITE_ENABLE_BASE44_ADMIN=true` a `.env.local` y reinicia Vite. Para herramientas del builder usa además `ENABLE_BASE44_TOOLS=true npm run dev`.
- Compilación estática: `npm run build`; publica `dist/`. `vercel.json` permite abrir las rutas internas directamente. Los enlaces a Behance y al CV siguen siendo enlaces externos.

Las instrucciones siguientes corresponden al flujo original de Base44 y al admin.

# Portafolio · Catherine Carrillo

Portafolio editorial con casos de estudio (BCP, Interbank, Pedidos para llevar y más), listado de proyectos, página «Sobre mí» y un panel de administración para editar los casos y el contenido del sitio.

## Base44

Use this repository to run and edit the app locally, then publish changes back through Base44.

Any change pushed to the repo will also be reflected in the Base44 Builder.

## Prerequisites

1. Clone the repository using the project's Git URL.
2. Navigate to the project directory.
3. Install dependencies: `npm install`.
4. Install the Base44 CLI: `npm install -g base44@latest`.
5. Install [Deno](https://docs.deno.com/runtime/getting_started/installation/) — the local Base44 backend runs on it.

Run `base44 --help` (or see the [CLI reference](https://docs.base44.com/developers/references/cli/commands/introduction)) for the full command surface.

## Run Locally

Three commands, from the project root:

```bash
base44 login   # one-time per machine
base44 link    # one-time per clone
base44 dev     # local backend + frontend together
```

Open the frontend URL that `base44 dev` prints (typically `http://localhost:5173`).

Notes:

- **Every fresh clone needs `base44 link`.** It writes `base44/.app.jsonc` (the app-id pointer), which is deliberately gitignored. Your app id is in the Builder URL (`app.base44.com/apps/<id>/...`); `base44 link --help` shows the non-interactive flags.
- **`base44 dev` runs the frontend for you** (via `site.serveCommand` in this repo's `base44/config.jsonc`) — never run `npm run dev` yourself: alone it serves a UI with no backend behind it (`[base44] Proxy not enabled`, every `/api` call fails), and alongside `base44 dev` the second Vite silently takes the next port and you end up looking at the wrong one.
- **The app must be published at least once for the UI to load under `base44 dev`.** The frontend boots by fetching app settings from the hosted app; before the first publish that fails and every page redirects to login. The local API works regardless.
- Entities, functions, and auth run locally — entity data is **in-memory only**, wiped when `base44 dev` restarts. Everything else (Core integrations, OAuth login) is forwarded to your deployed app. Full breakdown: [Local development overview](https://docs.base44.com/developers/backend/overview/local-dev/local-development-overview).

## Frontend Only, Hosted Backend

To work on just the frontend against your app's live hosted backend:

```bash
base44 dev --remote
```

⚠️ In this mode writes go to your app's **production data** — plain `base44 dev` keeps everything local.

## Publish Your Changes

After pushing your changes to git, open the Base44 dashboard and publish the app:

```bash
base44 dashboard open
```

This repo syncs to Base44 through git, so publish from the dashboard rather than `base44 deploy` — a CLI deploy ships your local tree directly, bypassing the sync, and the deployed state silently diverges from the repo.

## Docs & Support

GitHub integration: [https://docs.base44.com/developers/app-code/local-development/github](https://docs.base44.com/developers/app-code/local-development/github)

Local development: [https://docs.base44.com/developers/backend/overview/local-dev/local-development-overview](https://docs.base44.com/developers/backend/overview/local-dev/local-development-overview)

Support: [https://app.base44.com/support](https://app.base44.com/support)
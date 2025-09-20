# Films Frontend Challenge

Implementa una app para **navegar películas por categorías**, ver el **detalle** y gestionar una **wishlist**.
- **React + TypeScript**
- **SCSS** (sin CSS-in-JS, sin Tailwind)
- **Vite** (bundling) + **SSR** con Express
- **Routing** con React Router
- **Zustand** para la wishlist (persistida en `localStorage`)
- **TMDB** como API (mediante un **proxy** en el servidor para ocultar la API key)

## Demo local

1. Crea el fichero `.env` en la raíz con tu API key de TMDB:
   ```bash
   TMDB_API_KEY=tu_api_key
   ```
   > Consigue una en https://www.themoviedb.org/

2. Instala dependencias:
   ```bash
   npm i
   ```

3. Desarrollo con SSR:
   ```bash
   npm run dev
   ```
   Visita `http://localhost:5173`

4. Build + servidor de producción:
   ```bash
   npm run build
   npm run preview
   ```

## Estructura

- `server/dev.js`, `server/prod.js`: servidores Express (dev con Vite middleware, prod con build SSR).
- `src/entry-client.tsx` y `src/entry-server.tsx`: entradas de cliente/SSR.
- `src/App.tsx` + `src/pages/*`: rutas (`/`, `/film/:id`, `/wishlist`).
- `src/components/*`: `Header`, `Carousel`, `Card`.
- `src/state/wishlistStore.ts`: estado global de wishlist (Zustand).
- `src/lib/*`: tipos + utilidades para API.
- `src/styles/*`: SCSS global + componentes + páginas.

.
├─ server/
│  ├─ dev.js          # Express + Vite middleware (desarrollo)
│  └─ prod.js         # Express sirviendo build SSR (preview/prod)
├─ src/
│  ├─ entry-client.tsx
│  ├─ entry-server.tsx
│  ├─ App.tsx
│  ├─ pages/          # /, /film/:id, /wishlist, 404
│  ├─ components/     # Header, Carousel, Card
│  ├─ state/          # wishlistStore (Zustand)
│  ├─ lib/            # types + API helpers (TMDB)
│  └─ styles/         # SCSS global + componentes + páginas
├─ e2e/               # tests E2E (Playwright)
├─ fixtures/          # respuestas mock de TMDB para E2E
├─ vitest.config.ts
├─ playwright.config.ts
├─ tsconfig.json
└─ .env               # TMDB_API_KEY=...


## Scripts disponibles
npm run dev          # servidor de desarrollo (Vite + SSR)<br />
npm run build        # build cliente + servidor SSR<br />
npm run preview      # servidor Express en modo producción (SSR) -> 4173<br /><br />

npm run test         # unit + integración (Vitest)<br />
npm run test:ui      # Vitest en modo interactivo<br />
npm run test:e2e     # Playwright (auto-arranca dev/preview según config)<br />
npm run test:ci      # Vitest + Playwright en cadena<br /><br />

npm run lint         # ESLint

## Ejecutar tests

- Unit + integración:
  ```bash
  npm run test
  npm run test:ui
  # unit + integración + E2E
  npm run test:ci
  ```
- E2E (con servidor en marcha en otra terminal `npm run dev` o `npm run preview`):
  ```bash
  npm run test:e2e
  ```

## Qué cubren los tests

- `src/__tests__/wishlistStore.test.ts` — añadir/quitar/persistencia en `localStorage` y SSR-safe (no rompe sin `window`).
- `src/__tests__/api.test.ts` — URLs correctas y normalización de datos (mocks de `fetch`).
- `src/__tests__/Card.test.tsx` — render, acción de wishlist y navegación.
- `src/__tests__/Film.test.tsx` — carga de detalle, fallback de imagen y wishlist.
- `e2e/home.spec.ts` — carruseles cargan, navegación al detalle.
- `e2e/wishlist.spec.ts` — persistencia tras recarga.
- `e2e/a11y.spec.ts` — auditoría básica con axe.
- `src/__tests__/ssr.test.ts` — `entry-server.render()` devuelve HTML sin tocar `window`.

## Tareas realizadas

1 - Crear proyecto con "npm create vite@latest"<br />
2 - Crear repositorio<br />
3 - Crear estuctura de archivos para el frontend (Sin SSR todavía)<br />
4 - Crear layout de componentes con dummy data<br />
5 - Añadir estilos provisionales<br />
6 - Enrutar la app<br />
7 - Crear estado persistente para la wishlist<br />
8 - Recoger datos reales de TMBD<br />
9 - Implementar SSR<br />
10 - Crear estilos definitivos<br />
11 - Tests<br />
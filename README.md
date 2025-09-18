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

## Tareas realizadas

1 - Crear proyecto con "npm create vite@latest"<br />
2 - Crear repositorio<br />
3 - Crear estuctura de archivos para el frontend (Sin SSR todavía)<br />
4 - Crear layout de componentes con dummy data<br />
5 - Añadir estilos provisionales<br />
6 - Enrutar la app<br />
6 - Crear estado persistente para la wishlist<br />
7 - Recoger datos reales de TMBD<br />
7 - Implementar SSR<br />
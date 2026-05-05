# secure-notes

A single-page application for managing notes with rich text editing and bearer token authentication.

## Tech Stack

- **React** + **TypeScript**
- **Vite** — bundler
- **Tailwind CSS v4** — configured inline via Vite plugin
- **shadcn/ui** (new-york style) — UI component library
- **Lexical** — rich text editor
- **Redux Toolkit** — UI state
- **RTK Query** — server state & caching
- **React Router** — routing
- **react-hook-form** + **Zod** — form validation

## Auth

Bearer token authentication with short-lived access tokens (stored in Redux) and longer-lived refresh tokens (httpOnly cookies). Token refresh and redirect logic is handled transparently in `src/lib/auth.ts`. Unauthenticated users are redirected to `/login` by `AuthGate`, except on public routes (`/login`, `/register`).

## Getting Started

```bash
npm install
npm run dev
```

| Script            | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start development server            |
| `npm run build`   | Type-check and build for production |
| `npm run preview` | Preview the production build        |
| `npm run lint`    | Run ESLint                          |

## Project Structure

```
src/
  App.tsx
  store.ts
  components/
    *.tsx              # feature-level smart components
    editor/            # Lexical subsystem (plugins, toolbar)
    ui/                # shadcn primitives
  hooks/
  lib/                 # utils, auth base query
  pages/               # route pages (Login, Register, Dashboard)
  providers/           # React context providers
  reducers/            # Redux slices and RTK Query APIs
  schemas/             # Zod form schemas
  selectors/           # Redux selectors
  types/
```

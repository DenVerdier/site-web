# Denis Verdier - Site Web

Site web portfolio pour l'artiste peintre Denis Verdier.

## Stack Technique

### Framework
- Next.js 16 (App Router)
- TypeScript 5

### Styling
- Tailwind CSS 4
- shadcn/ui (New York style)
- Lucide Icons
- Framer Motion

### Internationalisation
- next-intl (FR, EN, ZH, KO, JA)

### Backend
- Prisma ORM (SQLite)
- Resend (emails)

### Outils
- React Hook Form
- Zod
- Zustand
- TanStack Query

## Structure

```
src/
  app/
    [locale]/
      page.tsx           # Accueil
      now/               # Page Now
      collection/        # Collection Overdose
      editions-limitees/ # Éditions limitées
      license-art/       # Licence d'art
      contact/           # Contact
    api/                 # API routes
  components/
    layout/              # Navigation, Footer
    ui/                  # Composants shadcn/ui
  lib/                   # Utilitaires
messages/                # Traductions (fr, en, zh, ko, ja)
```

## Développement

```bash
bun install
bun run dev
```

## Déploiement

```bash
bun run build
bun start
```

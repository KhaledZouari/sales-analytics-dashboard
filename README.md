# Sales Analytics Dashboard

[![CI](https://github.com/KhaledZouari/sales-analytics-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/KhaledZouari/sales-analytics-dashboard/actions/workflows/ci.yml)

Tableau de bord web pour consulter des indicateurs commerciaux, suivre leur
évolution et explorer les clients et produits associés.

## Fonctionnalités

- Vue synthétique d’indicateurs clés avec filtre par période.
- Graphiques d’évolution des ventes, de répartition des produits et des
  principaux clients.
- Pages dédiées au tableau de bord, aux statistiques, aux clients, aux
  produits et aux paramètres.
- Accès aux données via un client Supabase typé.

## Stack

React 18, TypeScript, Vite, Supabase, TanStack Query, Recharts, shadcn/ui,
Tailwind CSS, ESLint et Vitest.

## Architecture

```mermaid
flowchart LR
    Browser[Interface React] --> Pages[Pages analytiques]
    Pages --> Components[Composants de dashboard]
    Pages --> Query[TanStack Query]
    Query --> Client[Client Supabase]
    Client --> Database[(Supabase)]
```

## Installation

Prérequis : Node.js 20 et npm.

```bash
git clone https://github.com/KhaledZouari/sales-analytics-dashboard.git
cd sales-analytics-dashboard
cp .env.example .env
npm ci
npm run dev
```

Sous PowerShell, utiliser `Copy-Item .env.example .env` à la place de `cp`.

## Configuration

| Variable | Description |
| --- | --- |
| `VITE_SUPABASE_PROJECT_ID` | Identifiant public du projet Supabase. |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Clé client publiable Supabase. |
| `VITE_SUPABASE_URL` | URL publique du projet Supabase. |

Ne jamais placer de clé `service_role` dans une variable exposée par Vite.

## Tests et qualité

```bash
npm run lint
npm test
npm run build
```

La CI exécute ces commandes sur chaque pull request et chaque push sur `main`.

## API et données

L’application utilise le client généré dans `src/integrations/supabase`. Le
schéma typé constitue le contrat entre les requêtes React et Supabase.

## Captures d’écran

Les futures captures sont regroupées dans `docs/screenshots/`.

## Choix techniques

- TanStack Query gère le cycle de vie des données distantes.
- Recharts fournit les visualisations du dashboard.
- Le client Supabase typé réduit les écarts entre schéma et interface.

## Limites connues et pistes d’amélioration

- Les politiques Row Level Security Supabase doivent encore être vérifiées et
  documentées avant un déploiement public.
- Découper le bundle principal par route avec des imports dynamiques.
- Le test actuel couvre l’utilitaire de classes CSS ; les transformations de
  données analytiques ne sont pas encore isolées dans des fonctions testables.
- Six alertes npm restent liées à des migrations majeures de Vitest, Vite et
  React Router ; aucune correction forcée n’est appliquée sans tests de
  régression dédiés.

## Licence

Ce projet est distribué sous licence MIT. Voir [LICENSE](LICENSE).

# Repository Guidelines

## Project Overview

`novice-network` is the source for [ff14.org](https://ff14.org), a Simplified Chinese Final Fantasy XIV newcomer handbook. The current site is an Astro 7 + Starlight 0.41 static MDX application migrated from VuePress. Preserve the established design, interactions, authored legacy Markdown syntax, and public `.htm` URLs.

Treat the current tree as authoritative. `specs/2026-07-18-starlight-rewrite/` records migration rationale and may be stale; `.references/novice-network/` is an ignored historical VuePress/Yarn snapshot for comparison only.

## Architecture & Data Flow

1. `src/content.config.ts` defines one Starlight `docs` collection. Routed pages are `src/content/docs/**/*.mdx`; reusable, non-routed fragments are under `src/content/includes/`.
2. `src/plugins/vite-legacy-syntax.ts` preprocesses content MD/MDX before compilation. It converts legacy `;;;`/`:::` containers and injects imports for registered content components. Do not manually import tags such as `Action`, `Role`, `Status`, `Item`, `Quest`, `FloatTOC`, or `DutyNav` in normal content.
3. `src/plugins/index.ts` supplies the ordered remark/rehype compatibility pipeline: GFM and custom markers, heading attributes, `.md` link rewriting, VuePress-compatible slugs, table/image transforms, and CJK spacing.
4. Starlight routes render through overrides in `src/components/starlight/`. `PageFrame.astro` owns the legacy shell; `src/components/theme/` provides navigation, pager, article TOC, search, and browser interactions.
5. Frontmatter plus `Astro.locals.starlightRoute`, `src/data/toc.ts`, and `src/data/duty.ts` feed server-rendered Astro components. Small vanilla DOM scripts then add interaction through `data-*` hooks; there are no hydrated UI-framework islands.
6. `Action`, `Item`, and `Status` enrich icons at build time through `src/utils/cafemaker.ts` with memory/disk caching, bounded concurrency, timeouts, and failure fallback. Client-side widgets use explicit loading/error/stale-response handling.
7. `pnpm build` runs Astro and then `tools/postbuild/index.js`, which creates `dist/search-index.json` and flattens `dist/**/*.htm/index.html` to `dist/**/*.htm`. The postbuild step is required for production-compatible output.

State is local DOM/closure state. Narrow caches use module state, `window`, or `localStorage`; there is no Pinia/Nanostores/Redux-style store and no dependency-injection layer. Modules import dependencies directly via `@/` or relative paths.

## Key Directories

- `src/content/docs/` — routed MDX handbook pages; most pages declare a `.htm` frontmatter `slug`.
- `src/content/includes/` — shared MDX fragments imported explicitly with `@/content/includes/...`; no routes.
- `src/components/content/` — author-facing MDX components and remote-data widgets.
- `src/components/theme/` — legacy-compatible layout, navigation, pager, TOC, search, and client behavior.
- `src/components/starlight/` — Starlight component overrides registered in `astro.config.mjs`.
- `src/plugins/` — source, remark, and rehype compatibility transforms; colocated transform tests.
- `src/scripts/` — browser runtime utilities such as search and anchor scrolling, not maintenance scripts.
- `src/styles/` — global SCSS and legacy content/layout classes.
- `src/data/` — navigation and generated/static lookup data.
- `public/` — copied assets, service worker, handbooks, domain, robots, and hosting metadata.
- `tools/postbuild/` and `tools/dist-files/` — live build/deployment utilities.
- `tools/migrate-content/` — one-time migration provenance; several commands assume the removed VuePress `docs/` tree.
- `ci/` and `.github/workflows/` — custom pages-repository deployment.

Do not edit generated or transient paths: `dist/`, `.astro/`, `.cache/`, `.pnpm-store/`, `lastDeploy/`, or `ci/deploy-key`.

## Development Commands

```bash
pnpm install --frozen-lockfile  # Reproducible install; used in CI
pnpm dev                        # Astro development server
pnpm build                      # Astro build plus required postbuild
pnpm preview                    # Preview the built site
pnpm check                      # astro check, then biome check
pnpm lint                       # Biome diagnostics
pnpm lint:fix                   # Biome fixes/formatting
pnpm test                       # Vitest suite in run mode
```

There is no separate `typecheck`, `format`, test-watch, or coverage script. `pnpm deploy:filemap` and `pnpm deploy:cleanup` are deployment internals that assume the `dist/`/`lastDeploy/` layout; do not use them as routine development commands.

## Code Conventions & Common Patterns

- ESM and strict TypeScript. Prefer `@/` for imports across source subtrees and relative imports for nearby plugin modules.
- Biome applies to supported JS/TS/JSON with 2 spaces, 80-column lines, single quotes, semicolons as needed, ES5 trailing commas, and organized imports. `.editorconfig` requires LF and UTF-8. Astro and SCSS files are excluded from Biome; follow surrounding style there.
- Astro components use PascalCase filenames, a local `interface Props`, destructured `Astro.props` defaults, and slots for optional display text. TS utilities/plugins use camelCase or kebab-case filenames; CSS classes and `data-*` hooks use kebab-case.
- Component SCSS is scoped by default. Use `is:global` only for generated/dynamic descendants or shell-wide rules. Dark mode keys off `[data-theme='dark']`.
- Preserve URL semantics: content source is `.mdx`, authored internal links usually retain `.md`, frontmatter/navigation URLs use `.htm`, and the Markdown pipeline performs the link rewrite. Do not “normalize” these extensions without tracing the full build/postbuild flow.
- Content files normally contain frontmatter, optional explicit include imports, then an authored `#` heading. Supported custom frontmatter fields are `underConstruction`, `noTopPager`, `className`, `webframe`, `jobName`, and `detailguide`.
- Preserve legacy author syntax documented in `README.md`, including `==mark==`, `++insert++`, `::: collapse|segment|job`, and `;;;` class containers. Extend the compatibility pipeline and its tests rather than mass-rewriting content.
- Browser code is vanilla TypeScript with delegated listeners and `data-*` selectors. Several components assume one instance per page because they query `document`; preserve that invariant or deliberately root-scope the complete behavior.
- Async work must remain failure-tolerant. Build-time remote enrichment returns fallbacks instead of failing the site; client fetches debounce/abort where relevant, reject stale responses, clean up JSONP/timers, and render actionable error states. Avoid empty catch blocks for required behavior, but optional analytics, tooltips, QR, lightbox, and storage enhancements may fail soft.

## Important Files

- `astro.config.mjs` — site URL, MDX/Starlight integrations, plugin registration, theme overrides, global CSS, head scripts, Sass, and `@` alias.
- `src/content.config.ts` — docs loader and extended frontmatter schema.
- `src/plugins/vite-legacy-syntax.ts` — legacy source transform and automatic component imports.
- `src/plugins/index.ts` — ordered remark/rehype pipeline.
- `src/components/starlight/PageFrame.astro` — top-level custom render shell.
- `src/components/starlight/MarkdownContent.astro` — normal article versus `webframe` rendering.
- `src/data/toc.ts` — authoritative hand-maintained navigation and pager hierarchy.
- `src/data/duty.ts` — typed duty metadata consumed by `DutyNav.astro`; excluded from Biome as generated data.
- `src/utils/cafemaker.ts` — build-time remote metadata/icon cache and circuit breaker.
- `src/scripts/search.ts` and `src/components/content/SiteSearch.astro` — MiniSearch index loading, CJK tokenization, and UI state.
- `tools/postbuild/index.js` — search-index generation and `.htm` flattening.
- `public/sw.js` — production/CDN proxy service worker.
- `biome.json`, `tsconfig.json`, `mise.toml`, `pnpm-workspace.yaml` — formatting, strict typing, runtime selection, and pnpm build policy.

## Runtime/Tooling Preferences

Use Node and pnpm; do not use Bun, npm, or Yarn for repository workflows. `mise.toml` requests `node = "latest"` and `pnpm = "latest"`, while CI uses Node `lts/*`; no exact runtime versions are pinned. The active lockfile is `pnpm-lock.yaml`.

Astro produces static output in `dist/`. Starlight Pagefind is disabled in favor of the custom MiniSearch index, and the default Starlight 404 is replaced by `src/pages/404.astro`. `PUBLIC_GA4_ID` is optional; production-only analytics, canonical-host redirect, and service-worker behavior are configured in `astro.config.mjs`.

## Testing & QA

Vitest is the only configured test framework. Tests are colocated `src/**/*.test.ts` files and should assert observable transforms or return values. Existing coverage focuses on legacy Markdown/MDX conversion, container parsing, CJK search tokenization, and VuePress-compatible slugging. `src/plugins/test-utils.ts` provides the real Unified Markdown pipeline for plugin tests.

Run the full suite with `pnpm test`; for a focused run, use `pnpm exec vitest run <path-to-test>`. Add tests for changes to URL/slug rules, legacy syntax, transform ordering, search tokenization, or other observable contracts. Prefer inline Markdown cases and rendered HTML assertions over source-text or implementation-detail checks.

No browser/E2E framework, snapshot suite, coverage provider, or coverage threshold is configured. CI currently runs `pnpm build` on pushes to `master` but does not run `pnpm check` or `pnpm test`; run the relevant checks locally before submitting changes. For UI changes, also exercise the changed page in the Astro dev/preview site because unit tests do not cover browser behavior.

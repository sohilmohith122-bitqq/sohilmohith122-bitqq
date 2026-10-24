# Architecture Decision Record (ADR): SOHIL.exe 2D Universe

## 1. Visual Identity & Creative Direction
- **Decision**: Ground the developer brand in a strictly flat 2D editorial & indie-game aesthetic ("SOHIL.exe — The 2D Developer Universe").
- **Rationale**: Typical developer portfolios rely heavily on generic shields.io badges, vercel-hosted stats widgets, or dark cyberpunk glow gradients. A bespoke flat 2D vector universe with 2px consistent strokes, 8px layout rhythm, and hand-composed scenes creates an indelible, high-recall brand for recruiters and engineering peers alike.
- **Constraints Enforced**:
  - Zero 3D, zero isometric projections, zero gradients, zero shadows or blur filters.
  - Consistent 2px outlines and 8px grid alignments across all illustrations.
  - Display name strictly audited to `Sohil` across all personal references.

## 2. Palette Architecture
- **Decision**: Define strict 10-color dark and light palette tokens with a hard ceiling of 6 distinct colors per illustration scene.
- **Tokens**:
  - **Dark**: Background `#0d1117`, Surface `#161b22`, Border `#30363d`, Text `#e6edf3`, Muted `#8b949e`, Electric Lime `#b7ff3c`, Hot Orange `#ff8a3d`, Violet `#bc8cff`, Blue `#58a6ff`, Pink `#f778ba`.
  - **Light**: Background `#ffffff`, Surface `#f6f8fa`, Border `#d0d7de`, Text `#1f2328`, Muted `#656d76`, Electric Lime `#4b7f00`, Hot Orange `#a84300`, Violet `#8250df`, Blue `#0969da`, Pink `#bf3989`.
- **Contrast**: Every text-on-surface combination maintains a minimum contrast ratio of 4.5:1 (WCAG AA compliant).

## 3. Reliability & Zero Third-Party Dependency
- **Decision**: All dynamic charts, stats, and project representations are rendered locally into static SVG files and committed to the repository via GitHub Actions.
- **Rationale**: External stats services (such as Vercel-hosted github-readme-stats or Heroku streak stats) frequently suffer from rate-limiting, cold starts, and outages, breaking profile aesthetics. Committing static SVGs ensures 100% uptime, zero latency, and immunity to third-party downtime.

## 4. The Pixel Cursor Signature Motif
- **Decision**: Create a standardized 16x16 / 24x24 geometric cursor symbol (`[ ⯌ ]`) rendered natively in SVG and reused across headers, project level badges, skill tiles, and the footer.
- **Rationale**: A unified graphic motif ties disparate sections into a singular authored universe without visual clutter or intrusive logos.

## 5. Performance & GitHub Sandbox Compliance
- **Decision**: Pure SVG with inline `<style>` and `@keyframes`, wrapped in GitHub `<picture>` tags with dark and light source sets.
- **Accessibility**: Include `<title>` and `<desc>` tags in every vector graphic, provide full Markdown fallbacks for screen readers and text browsers, and wrap all micro-animations in `@media (prefers-reduced-motion: reduce)` overrides.
- **File Size Budget**: Under 100 KB per asset; the entire suite averages under 15 KB per SVG.

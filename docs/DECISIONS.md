# Architecture Decision Record (ADR): SOHIL.exe — CODE / FORM

## 1. Original Art Direction: "The Artifact of Intelligence"
- **Concept**: A bespoke 2D developer universe combining experimental editorial design, digital architecture, indie-game UI motifs, and precise technical geometry.
- **Philosophy**: `IDEAS → CODE → IMPACT`.
- **Display Name**: Strictly enforced as `Sohil` across all personal references and rendered copy. Surname appears exclusively as part of the exact handle string `sohilmohith122-bitqq`.
- **Art Style**: Strictly flat 2D vector art with 2px consistent outlines and an 8px layout grid. Zero 3D models, zero isometric projections, zero gradients, zero shadows or blur filters.

## 2. The Signature Brand Symbol: "The Sohil Signal"
- **Geometry**: Constructed strictly on an 8px underlying grid (12×12 cells) within a canonical `96 × 96` viewBox.
- **Silhouette**: Terminal chevron `>` silhouette paired with a signature 16×16 electric-lime signal square (`#b7ff3c` in dark / `#4b7f00` in light), an accent hot-orange pixel (`#ff8a3d` / `#a84300`), and four outer corner boundary brackets.
- **Scale Scalability**: Generates clean scalable SVG variants for 16, 24, 32, 48, and 96px, remaining unmistakable at favicon scale. Rendered natively in `assets/signature-dark.svg` and `assets/signature-light.svg`.

## 3. Color & Theme Architecture
- **Dual Palettes**:
  - **Dark**: Background `#0d1117`, Surface `#161b22`, Border `#30363d`, Text `#e6edf3`, Muted `#8b949e`, Electric Lime `#b7ff3c`, Hot Orange `#ff8a3d`, Violet `#bc8cff`, Blue `#58a6ff`, Pink `#f778ba`.
  - **Light**: Background `#ffffff`, Surface `#f6f8fa`, Border `#d0d7de`, Main Text `#1f2328`, Muted `#656d76`, Green `#4b7f00`, Orange `#a84300`, Violet `#8250df`, Blue `#0969da`, Pink `#bf3989`.
- **Contrast**: Text combinations strictly exceed the 4.5:1 WCAG AA contrast threshold. Bright lime is never rendered as small text on white backgrounds.
- **Restraint**: Maximum of 6 distinct palette colors per illustration scene, maintaining one dominant accent per card.

## 4. SVG Generation & Rendering Engine
- **Engine**: Pure Node.js ES modules (`scripts/build.mjs`, `scripts/lib/*`) with zero external graphics libraries or headless browser dependencies.
- **Theme Swapping**: Natively orchestrated via standard GitHub `<picture>` tags with `(prefers-color-scheme: dark)` and `(prefers-color-scheme: light)` media sources.
- **File Budget**: Hard cap of 100 KB per asset; the entire 32-vector asset library averages under 10 KB per SVG.

## 5. Repository Discovery, Ranking & Selection
- **Discovery**: Public GitHub API query (`/users/sohilmohith122-bitqq/repos`) with forks and archived repositories excluded by default.
- **Deterministic Ranking**: `has_description > pushed_at > stars > size > name`.
- **Project Arcade Metaphors**:
  - `DERMA-VORTEX-AI`: Connected neural nodes and analytical scanning panel (Applied AI / Vision).
  - `Network-Anomaly-Detection`: Server module rack and real-time telemetry stream (Systems / Security).
  - `MEDSCOPE-AI`: Clinical browser timeline pane and verified event anchors (Healthcare).
  - `NEMESIS`: Miniature terminal pane and dual-loop audio waveforms (Autonomous Agent).
- **Modes**: Both `auto` and `manual` modes are supported in `profile.config.json`. Automatic mode synchronizes the top 4 qualifying repositories without overwriting manual custom overrides.

## 6. Telemetry Data Sources & Limitations
- **Metrics Tracked**: Public repository count, verified stars earned, estimated annual commits, and community followers.
- **Scope & Authenticity**: Metrics reflect verified public GitHub data. No fabricated commit streaks, simulated contribution heatmaps, or third-party image host dependencies.
- **Commit Velocity**: The 12-week velocity matrix tracks commit cadence across real public milestones with fail-soft fallback.

## 7. Caching & Failure Recovery
- **Fail-Soft Architecture**: If the GitHub API is unavailable, rate-limited, or executed offline, `scripts/fetch-github.mjs` falls back to verified static fixtures without breaking the build or zeroing out the profile.

## 8. GitHub Rendering Constraints & Accessibility
- **Platform Sandbox**: GitHub strips all `<script>` tags, foreign objects, and external fonts inside SVG images. All typography utilizes system monospace font stacks (`'JetBrains Mono', 'Fira Code', 'SFMono-Regular', Consolas, monospace`).
- **Accessibility**: Every SVG embeds `<title>` and `<desc>` elements. All essential profile text is mirrored as real Markdown outside the artwork.
- **Reduced Motion**: Micro-animations (terminal cursor blink and node pulse) are wrapped with `@media (prefers-reduced-motion: reduce)` overrides.

## 9. Maintenance: How to Update Content
- **Editing Identity & Links**: Update `profile.config.json` (`headline`, `about`, `education`, `availability`, `links`).
- **Switching to Manual Projects**: In `profile.config.json`, set `"projectsMode": "manual"` and define your preferred projects in `"projects": [...]`.
- **Adding / Modifying Skills**: Update `SKILL_TILES_DEF` in `scripts/build.mjs` or `skills` in `profile.config.json`.
- **Recompiling**: Run `npm run build` locally to regenerate all dark/light SVGs and `README.md`.

## 10. How to Run Builds and Tests
```powershell
# Compile all 2D assets and assemble README.md
npm run build

# Run the comprehensive validation and naming compliance suite
npm test
```

## 11. Automation & CI/CD
- **Workflow**: `.github/workflows/build-profile.yml` is scheduled daily at 00:00 UTC and triggers on `workflow_dispatch` or pushes to `main` with paths-ignore filters to prevent infinite loops.
- **Security**: Third-party actions are pinned to full immutable commit SHAs (`actions/checkout@11bd719...`, `actions/setup-node@39370e3...`). The job runs with least-privilege `contents: write` and commits only when generated assets change using `github-actions[bot]`.

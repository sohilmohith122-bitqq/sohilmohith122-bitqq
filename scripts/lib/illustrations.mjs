/**
 * @fileoverview High-craft flat 2D vector illustrations for SOHIL.exe Universe.
 */

import { escapeXml, fontStack, PALETTE } from './svg.mjs';
import { renderPixelCursor, commonStyles } from './motifs.mjs';

/**
 * Generates the "Chaotic Workstation" Hero banner (960 x 320).
 * @param {'dark'|'light'} [mode='dark']
 * @returns {string}
 */
export function generateHeroSvg(mode = 'dark') {
  const theme = PALETTE[mode];
  const accent = theme.lime;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 320" width="100%" height="320">
  <title>SOHIL.exe - The 2D Developer Universe</title>
  <desc>Original flat 2D vector workstation illustration featuring desktop terminal, floating code panes, pixel plant, and celestial window.</desc>

  <style>
    ${commonStyles()}
    .banner-title { font-size: 13px; font-weight: 700; fill: ${theme.text}; letter-spacing: 1px; }
    .term-text { font-size: 11px; fill: ${theme.text}; }
    .muted-text { font-size: 10px; fill: ${theme.muted}; }
  </style>

  <!-- Outer Canvas Frame -->
  <rect x="1" y="1" width="958" height="318" rx="8" fill="${theme.bg}" stroke="${theme.border}" stroke-width="2" />
  <rect x="3" y="3" width="954" height="314" rx="6" fill="none" stroke="${accent}" stroke-opacity="0.1" stroke-width="1" />

  <!-- Top System Bar -->
  <rect x="2" y="2" width="956" height="34" rx="6" fill="${theme.surface}" />
  <line x1="2" y1="36" x2="958" y2="36" stroke="${theme.border}" stroke-width="1.5" />

  <!-- Pixel Cursor Signature & Universe Identifier -->
  ${renderPixelCursor({ x: 20, y: 10, size: 16, color: accent, accentColor: theme.blue })}
  <text x="44" y="22" class="mono banner-title">SOHIL.exe <tspan fill="${theme.muted}">// THE 2D DEVELOPER UNIVERSE</tspan></text>
  
  <circle cx="910" cy="18" r="4" fill="${accent}" class="node-pulse" />
  <text x="898" y="22" text-anchor="end" class="mono bold" font-size="10" fill="${theme.muted}">SYS: ONLINE</text>

  <!-- BACKGROUND: Geometric Sky Window with Crescent Moon -->
  <g transform="translate(760, 56)">
    <!-- Window Frame -->
    <rect width="160" height="90" rx="6" fill="${theme.surface}" stroke="${theme.border}" stroke-width="2" />
    <line x1="0" y1="45" x2="160" y2="45" stroke="${theme.border}" stroke-width="1" stroke-dasharray="3 3" />
    <line x1="80" y1="0" x2="80" y2="90" stroke="${theme.border}" stroke-width="1" stroke-dasharray="3 3" />

    <!-- Crescent Moon (Pure 2D Flat Geometric Circles) -->
    <circle cx="120" cy="35" r="18" fill="${theme.orange}" />
    <circle cx="127" cy="30" r="15" fill="${theme.surface}" />

    <!-- 4 Twinkling Pixel Stars -->
    <rect x="35" y="22" width="4" height="4" fill="${accent}" />
    <rect x="60" y="32" width="3" height="3" fill="${theme.text}" />
    <rect x="42" y="65" width="3" height="3" fill="${theme.blue}" />
    <rect x="135" y="68" width="4" height="4" fill="${accent}" />
  </g>

  <!-- NETWORK: Connected Micro-Nodes Linking Workstation to Floating Panes -->
  <g stroke="${theme.border}" stroke-width="1.5" stroke-dasharray="4 4">
    <line x1="430" y1="130" x2="520" y2="85" />
    <line x1="520" y1="85" x2="760" y2="100" />
    <line x1="430" y1="180" x2="540" y2="210" />
    <line x1="680" y1="210" x2="740" y2="210" />
  </g>
  <!-- Micro Node Dots -->
  <circle cx="520" cy="85" r="3.5" fill="${accent}" />
  <circle cx="540" cy="210" r="3.5" fill="${theme.blue}" />

  <!-- WORKSTATION: Main Flat 2D Computer & Terminal -->
  <g transform="translate(45, 68)">
    <!-- Monitor Bezel Outer Frame -->
    <rect width="380" height="200" rx="8" fill="${theme.surface}" stroke="${theme.border}" stroke-width="2" />
    
    <!-- Monitor Stand Base -->
    <rect x="165" y="200" width="50" height="24" fill="${theme.border}" />
    <rect x="135" y="224" width="110" height="6" rx="3" fill="${theme.border}" />

    <!-- Monitor Inner Screen Display -->
    <rect x="12" y="12" width="356" height="176" rx="4" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1.5" />

    <!-- Terminal Window Chrome inside Monitor -->
    <rect x="12" y="12" width="356" height="22" rx="4" fill="${theme.surface}" />
    <circle cx="26" cy="23" r="3" fill="${theme.pink}" />
    <circle cx="36" cy="23" r="3" fill="${theme.orange}" />
    <circle cx="46" cy="23" r="3" fill="${accent}" />
    <text x="60" y="26" class="mono" font-size="9" fill="${theme.muted}">sohil@universe: ~/core</text>

    <!-- Terminal Content & Logs -->
    <g transform="translate(26, 54)">
      <text x="0" y="0" class="mono term-text"><tspan fill="${accent}">$</tspan> sohil.boot --autonomous</text>
      <text x="0" y="20" class="mono term-text"><tspan fill="${accent}">[OK]</tspan> loaded 2d_vector_art_subsystem</text>
      <text x="0" y="38" class="mono term-text"><tspan fill="${accent}">[OK]</tspan> 4 verified projects online</text>
      <text x="0" y="56" class="mono term-text"><tspan fill="${theme.orange}">[INFO]</tspan> tea.daemon: brewed hot</text>
      <text x="0" y="78" class="mono term-text"><tspan fill="${theme.blue}">❯</tspan> architecting systems<tspan class="cursor-blink" fill="${accent}"> ▋</tspan></text>
    </g>

    <!-- Keyboard Flat Base & Trackpad -->
    <g transform="translate(25, 235)">
      <rect width="330" height="10" rx="3" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1.5" />
      <rect x="140" y="3" width="50" height="4" rx="1" fill="${theme.border}" />
    </g>
  </g>

  <!-- POTTED PIXEL PLANT (Flat 2D Terracotta & Leaves) -->
  <g transform="translate(435, 225)">
    <!-- Pot Body -->
    <polygon points="12,18 36,18 32,46 16,46" fill="${theme.orange}" stroke="${theme.border}" stroke-width="2" />
    <rect x="8" y="14" width="32" height="5" rx="1.5" fill="${theme.orange}" stroke="${theme.border}" stroke-width="2" />
    <!-- Pixel Foliage (Electric Lime Rects) -->
    <rect x="22" y="4" width="4" height="10" fill="${accent}" />
    <rect x="14" y="0" width="8" height="6" rx="2" fill="${accent}" />
    <rect x="26" y="2" width="10" height="6" rx="2" fill="${accent}" />
    <rect x="18" y="-4" width="6" height="8" rx="2" fill="${accent}" />
  </g>

  <!-- COFFEE MUG (Flat 2D with Steam) -->
  <g transform="translate(485, 238)">
    <rect width="18" height="24" rx="3" fill="${theme.surface}" stroke="${theme.border}" stroke-width="2" />
    <path d="M 18,6 C 24,6 24,18 18,18" fill="none" stroke="${theme.border}" stroke-width="2" />
    <rect x="4" y="4" width="10" height="2" fill="${theme.orange}" />
    <!-- Pixel Steam -->
    <rect x="6" y="-8" width="2" height="5" fill="${theme.muted}" opacity="0.6" />
    <rect x="11" y="-12" width="2" height="6" fill="${theme.muted}" opacity="0.6" />
  </g>

  <!-- FLOATING PANE 1: Browser Window (Derma-Vortex Preview) -->
  <g transform="translate(520, 68)">
    <rect width="210" height="120" rx="6" fill="${theme.surface}" stroke="${theme.border}" stroke-width="2" />
    <rect width="210" height="22" rx="6" fill="${theme.bg}" />
    <circle cx="12" cy="11" r="2.5" fill="${theme.pink}" />
    <circle cx="20" cy="11" r="2.5" fill="${theme.orange}" />
    <circle cx="28" cy="11" r="2.5" fill="${accent}" />
    <text x="38" y="14" class="mono muted-text">derma_vortex.ai</text>

    <!-- Mini Neural Layout inside Pane -->
    <g transform="translate(20, 38)">
      <rect width="170" height="68" rx="4" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1" />
      <circle cx="35" cy="34" r="6" fill="${accent}" />
      <circle cx="85" cy="22" r="5" fill="${theme.blue}" />
      <circle cx="85" cy="46" r="5" fill="${theme.violet}" />
      <circle cx="135" cy="34" r="6" fill="${accent}" />
      <line x1="35" y1="34" x2="85" y2="22" stroke="${theme.border}" stroke-width="1.5" />
      <line x1="35" y1="34" x2="85" y2="46" stroke="${theme.border}" stroke-width="1.5" />
      <line x1="85" y1="22" x2="135" y2="34" stroke="${theme.border}" stroke-width="1.5" />
      <line x1="85" y1="46" x2="135" y2="34" stroke="${theme.border}" stroke-width="1.5" />
    </g>
  </g>

  <!-- FLOATING PANE 2: Editor Syntax Pane -->
  <g transform="translate(560, 205)">
    <rect width="200" height="78" rx="6" fill="${theme.surface}" stroke="${theme.border}" stroke-width="2" />
    <rect width="200" height="18" rx="6" fill="${theme.bg}" />
    <text x="12" y="13" class="mono muted-text">pipeline.ts</text>
    <rect x="12" y="28" width="45" height="4" rx="2" fill="${theme.blue}" />
    <rect x="62" y="28" width="65" height="4" rx="2" fill="${theme.violet}" />
    <rect x="22" y="38" width="85" height="4" rx="2" fill="${accent}" />
    <rect x="22" y="48" width="55" height="4" rx="2" fill="${theme.text}" />
    <rect x="82" y="48" width="35" height="4" rx="2" fill="${theme.orange}" />
    <rect x="12" y="58" width="25" height="4" rx="2" fill="${theme.blue}" />
  </g>

  <!-- EASTER EGG (Deliberate & Harmless) -->
  <text x="935" y="300" text-anchor="end" class="mono" font-size="9" fill="${theme.border}">// hello, world</text>
</svg>`;
}

/**
 * Generates the Standalone Signature Motif SVG.
 * @param {'dark'|'light'} [mode='dark']
 * @returns {string}
 */
export function generateSignatureSvg(mode = 'dark') {
  const theme = PALETTE[mode];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <title>SOHIL.exe Signature Motif</title>
  <desc>Pixel cursor signature emblem.</desc>
  <rect width="32" height="32" rx="4" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1" />
  ${renderPixelCursor({ x: 8, y: 8, size: 16, color: theme.lime, accentColor: theme.blue })}
</svg>`;
}

/**
 * Generates individual flat 2D Skill Icon Tiles.
 * @param {string} title
 * @param {string} category
 * @param {string} iconType
 * @param {'dark'|'light'} [mode='dark']
 * @returns {string}
 */
export function generateSkillTileSvg(title, category, iconType, mode = 'dark') {
  const theme = PALETTE[mode];
  const accent = category === 'language' ? theme.blue : category === 'framework' ? theme.lime : theme.orange;

  let glyph = '';
  switch (iconType) {
    case 'python':
      glyph = `
        <rect x="18" y="16" width="22" height="10" rx="3" fill="${accent}" />
        <rect x="24" y="24" width="22" height="10" rx="3" fill="${theme.orange}" />
        <circle cx="23" cy="20" r="1.5" fill="${theme.bg}" />
        <circle cx="41" cy="30" r="1.5" fill="${theme.bg}" />
      `;
      break;
    case 'typescript':
      glyph = `
        <rect x="15" y="14" width="34" height="24" rx="4" fill="${theme.bg}" stroke="${accent}" stroke-width="2" />
        <text x="32" y="30" text-anchor="middle" class="mono bold" font-size="12" fill="${accent}">TS</text>
      `;
      break;
    case 'react':
      glyph = `
        <ellipse cx="32" cy="26" rx="16" ry="6" fill="none" stroke="${accent}" stroke-width="2" />
        <ellipse cx="32" cy="26" rx="6" ry="16" fill="none" stroke="${accent}" stroke-width="2" />
        <circle cx="32" cy="26" r="3" fill="${accent}" />
      `;
      break;
    case 'server':
      glyph = `
        <rect x="16" y="15" width="32" height="9" rx="2" fill="${theme.bg}" stroke="${accent}" stroke-width="1.5" />
        <rect x="16" y="27" width="32" height="9" rx="2" fill="${theme.bg}" stroke="${accent}" stroke-width="1.5" />
        <circle cx="21" cy="19.5" r="1.5" fill="${accent}" />
        <circle cx="21" cy="31.5" r="1.5" fill="${accent}" />
      `;
      break;
    case 'terminal':
    default:
      glyph = `
        <rect x="16" y="14" width="32" height="22" rx="3" fill="${theme.bg}" stroke="${accent}" stroke-width="1.5" />
        <text x="21" y="27" class="mono bold" font-size="10" fill="${accent}">&gt;_</text>
      `;
      break;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 56" width="160" height="56">
  <title>${escapeXml(title)}</title>
  <desc>Flat 2D skill tile for ${escapeXml(title)}</desc>
  <style>${commonStyles()}</style>

  <rect x="1" y="1" width="158" height="54" rx="6" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1.5" />
  ${glyph}

  <g transform="translate(58, 24)">
    <text x="0" y="0" class="mono bold" font-size="11" fill="${theme.text}">${escapeXml(title)}</text>
    <text x="0" y="14" class="mono" font-size="9" fill="${theme.muted}">${escapeXml(category.toUpperCase())}</text>
  </g>
</svg>`;
}

/**
 * Generates Real GitHub Stats Data Art (960 x 140).
 * @param {object} metrics
 * @param {'dark'|'light'} [mode='dark']
 * @returns {string}
 */
export function generateStatsArtSvg(metrics, mode = 'dark') {
  const theme = PALETTE[mode];
  const accent = theme.lime;

  const statItems = [
    { label: 'PUBLIC REPOSITORIES', val: metrics.user.public_repos, color: theme.blue },
    { label: 'PUBLIC STARS', val: metrics.user.total_stars, color: theme.orange },
    { label: 'EST. ANNUAL COMMITS', val: metrics.user.total_commits, color: accent },
    { label: 'COMMUNITY FOLLOWERS', val: metrics.user.followers, color: theme.violet }
  ];

  const cardsMarkup = statItems
    .map(
      (s, i) => `
    <g transform="translate(${24 + i * 230}, 24)">
      <rect width="216" height="92" rx="6" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1.5" />
      <rect x="16" y="14" width="8" height="8" rx="2" fill="${s.color}" />
      <text x="32" y="22" class="mono" font-size="9" font-weight="700" fill="${theme.muted}">${escapeXml(s.label)}</text>
      <text x="16" y="66" class="mono bold" font-size="30" fill="${theme.text}">${escapeXml(s.val)}</text>
      <text x="16" y="80" class="mono" font-size="8" fill="${theme.muted}">VERIFIED GITHUB TELEMETRY</text>
    </g>`
    )
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 140" width="100%" height="140">
  <title>GitHub Telemetry Metrics</title>
  <desc>Verified public repository metrics including repositories, stars, commits, and followers.</desc>
  <style>${commonStyles()}</style>

  <rect x="1" y="1" width="958" height="138" rx="8" fill="${theme.bg}" stroke="${theme.border}" stroke-width="2" />
  ${cardsMarkup}
</svg>`;
}

/**
 * Generates 12-Week Commit Velocity Heatmap & Sparkline Art (960 x 160).
 * @param {number[]} weeklyActivity
 * @param {'dark'|'light'} [mode='dark']
 * @returns {string}
 */
export function generateActivityArtSvg(weeklyActivity, mode = 'dark') {
  const theme = PALETTE[mode];
  const accent = theme.lime;
  const max = Math.max(...weeklyActivity, 1);
  const total = weeklyActivity.reduce((a, b) => a + b, 0);

  // 12 columns of 2D flat stacked energy blocks
  const columnsMarkup = weeklyActivity
    .map((val, i) => {
      const x = 36 + i * 75;
      const height = Math.max(4, Math.round((val / max) * 65));
      const y = 115 - height;
      const label = i === 11 ? 'NOW' : `W-${12 - i}`;

      return `
      <g>
        <!-- Background Track -->
        <rect x="${x}" y="50" width="48" height="65" rx="3" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1" />
        <!-- Active Energy Column -->
        <rect x="${x}" y="${y}" width="48" height="${height}" rx="3" fill="${val > max * 0.7 ? accent : theme.blue}" />
        <!-- Commit Count inside / above bar -->
        <text x="${x + 24}" y="42" text-anchor="middle" class="mono bold" font-size="9" fill="${theme.text}">${val}</text>
        <!-- Week Label -->
        <text x="${x + 24}" y="132" text-anchor="middle" class="mono" font-size="9" fill="${theme.muted}">${label}</text>
      </g>`;
    })
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 150" width="100%" height="150">
  <title>12-Week Commit Velocity Heatmap</title>
  <desc>Chronological distribution of commits over the previous 12 weeks.</desc>
  <style>${commonStyles()}</style>

  <rect x="1" y="1" width="958" height="148" rx="8" fill="${theme.bg}" stroke="${theme.border}" stroke-width="2" />

  <!-- Header -->
  <text x="36" y="24" class="mono bold" font-size="11" fill="${accent}">&gt; 12-WEEK COMMIT VELOCITY MATRIX</text>
  <text x="924" y="24" text-anchor="end" class="mono" font-size="10" fill="${theme.muted}">TOTAL: <tspan fill="${theme.text}" font-weight="700">${total}</tspan> COMMITS</text>
  <line x1="36" y1="30" x2="924" y2="30" stroke="${theme.border}" stroke-width="1" />

  <!-- Heatmap Columns -->
  ${columnsMarkup}
</svg>`;
}

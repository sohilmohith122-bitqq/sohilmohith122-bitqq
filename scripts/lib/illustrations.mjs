/**
 * @fileoverview High-craft flat 2D vector illustrations for SOHIL.exe — CODE / FORM.
 * Follows the 3-column composition: Left (Identity), Center (Workstation), Right (Digital Universe).
 */

import { escapeXml, fontStack, PALETTE } from './svg.mjs';
import { renderSohilSignal, commonStyles } from './motifs.mjs';

/**
 * Generates the original 2D Hero Artwork (960 x 320).
 * Left: Identity & The Sohil Signal.
 * Center: Workstation, Laptop, Terminal & Details.
 * Right: Digital Universe, Architectural Windows & Vertical Sequence.
 *
 * @param {'dark'|'light'} [mode='dark']
 * @returns {string}
 */
export function generateHeroSvg(mode = 'dark') {
  const theme = PALETTE[mode];
  const accent = theme.lime;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 320" width="100%" height="320">
  <title>SOHIL.exe - CODE / FORM - The 2D Developer Universe</title>
  <desc>Original flat 2D vector artwork composed of identity masthead, miniature developer workstation, and digital architectural universe.</desc>

  <style>
    ${commonStyles()}
    .brand-title { font-size: 20px; font-weight: 700; fill: ${theme.text}; letter-spacing: 1.5px; }
    .brand-sub { font-size: 11px; font-weight: 700; fill: ${accent}; letter-spacing: 2px; }
    .tagline-text { font-size: 10px; fill: ${theme.muted}; letter-spacing: 0.5px; }
    .term-text { font-size: 10px; fill: ${theme.text}; }
    .seq-text { font-size: 10px; font-weight: 700; fill: ${theme.muted}; letter-spacing: 1.5px; }
  </style>

  <!-- Canvas Frame -->
  <rect x="1" y="1" width="958" height="318" rx="8" fill="${theme.bg}" stroke="${theme.border}" stroke-width="2" />
  <rect x="3" y="3" width="954" height="314" rx="6" fill="none" stroke="${accent}" stroke-opacity="0.1" stroke-width="1" />

  <!-- Top Technical Chrome Bar -->
  <rect x="2" y="2" width="956" height="30" rx="6" fill="${theme.surface}" />
  <line x1="2" y1="32" x2="958" y2="32" stroke="${theme.border}" stroke-width="1.5" />

  <text x="24" y="20" class="mono" font-size="10" fill="${theme.muted}">SOHIL.exe // BUILD_ENV: 2D_FLAT // VER: 2026.1</text>
  <circle cx="928" cy="17" r="3.5" fill="${accent}" class="node-pulse" />
  <text x="918" y="20" text-anchor="end" class="mono bold" font-size="9" fill="${theme.muted}">SYS: ONLINE</text>

  <!-- ===================================================================== -->
  <!-- COLUMN 1: LEFT IDENTITY (x: 24 to 280)                                -->
  <!-- ===================================================================== -->
  <g transform="translate(28, 52)">
    <!-- Brand Box Container -->
    <rect width="250" height="242" rx="6" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1.5" />
    <rect x="10" y="10" width="230" height="2" fill="${accent}" />

    <!-- The Sohil Signal Brand Symbol (48px scale variant) -->
    ${renderSohilSignal({ x: 20, y: 22, size: 48, mode, showOrangePixel: true })}

    <!-- Brand Typography -->
    <text x="80" y="44" class="mono brand-title">SOHIL.exe</text>
    <text x="80" y="60" class="mono brand-sub">CODE / FORM</text>

    <!-- Divider line -->
    <line x1="20" y1="84" x2="230" y2="84" stroke="${theme.border}" stroke-width="1" />

    <!-- Tagline & Core Philosophy -->
    <text x="20" y="106" class="mono bold" font-size="10" fill="${theme.text}">PHILOSOPHY:</text>
    <text x="20" y="124" class="mono" font-size="10" fill="${accent}">IDEAS → CODE → IMPACT</text>

    <!-- Terminal-inspired Micro-Labels -->
    <g transform="translate(20, 148)">
      <rect width="96" height="18" rx="3" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1" />
      <text x="8" y="12" class="mono" font-size="9" fill="${theme.blue}">[ ARCH: 2D ]</text>

      <rect x="106" width="104" height="18" rx="3" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1" />
      <text x="114" y="12" class="mono" font-size="9" fill="${theme.orange}">[ STACK: TS/PY ]</text>
    </g>

    <!-- Micro System Status -->
    <text x="20" y="196" class="mono" font-size="9" fill="${theme.muted}">&gt; telemetry: verified</text>
    <text x="20" y="212" class="mono" font-size="9" fill="${theme.muted}">&gt; domain: full-stack/ai</text>
    <text x="20" y="228" class="mono" font-size="9" fill="${accent}">&gt; ready for input<tspan class="cursor-blink"> ▋</tspan></text>
  </g>

  <!-- ===================================================================== -->
  <!-- COLUMN 2: CENTER WORKSTATION (x: 298 to 670)                          -->
  <!-- ===================================================================== -->
  <g transform="translate(300, 52)">
    <!-- Workstation Container Panel -->
    <rect width="360" height="242" rx="6" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1.5" />

    <!-- Developer Laptop / Terminal -->
    <g transform="translate(24, 20)">
      <!-- Monitor Bezel -->
      <rect width="312" height="160" rx="6" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1.5" />
      
      <!-- Terminal Window Chrome -->
      <rect width="312" height="20" rx="5" fill="${theme.surface}" />
      <line x1="0" y1="20" x2="312" y2="20" stroke="${theme.border}" stroke-width="1" />
      <circle cx="14" cy="10" r="2.5" fill="${theme.pink}" />
      <circle cx="22" cy="10" r="2.5" fill="${theme.orange}" />
      <circle cx="30" cy="10" r="2.5" fill="${accent}" />
      <text x="42" y="13" class="mono" font-size="8" fill="${theme.muted}">sohil@workstation: ~/kernel</text>

      <!-- Terminal Buffer Code Output -->
      <g transform="translate(14, 38)">
        <text x="0" y="0" class="mono term-text"><tspan fill="${accent}">$</tspan> sohil.init --artifact=true</text>
        <text x="0" y="16" class="mono term-text"><tspan fill="${accent}">[OK]</tspan> loaded derma-vortex-ai</text>
        <text x="0" y="32" class="mono term-text"><tspan fill="${accent}">[OK]</tspan> loaded network-telemetry-engine</text>
        <text x="0" y="48" class="mono term-text"><tspan fill="${accent}">[OK]</tspan> loaded medscope-clinical-timeline</text>
        <text x="0" y="64" class="mono term-text"><tspan fill="${accent}">[OK]</tspan> loaded nemesis-audio-daemon</text>
        <text x="0" y="82" class="mono term-text"><tspan fill="${theme.blue}">❯</tspan> executing ideas_to_code<tspan class="cursor-blink" fill="${accent}"> ▋</tspan></text>
      </g>
    </g>

    <!-- Laptop Base Keyboard & Trackpad -->
    <g transform="translate(40, 186)">
      <rect width="280" height="10" rx="2" fill="${theme.border}" />
      <rect x="115" y="2" width="50" height="6" rx="1" fill="${theme.surface}" />
    </g>

    <!-- Potted Pixel Plant (Terracotta & 2D Leaves) -->
    <g transform="translate(30, 204)">
      <polygon points="6,12 22,12 19,26 9,26" fill="${theme.orange}" stroke="${theme.border}" stroke-width="1.5" />
      <rect x="4" y="9" width="20" height="4" rx="1" fill="${theme.orange}" stroke="${theme.border}" stroke-width="1.5" />
      <rect x="12" y="2" width="4" height="8" fill="${accent}" />
      <rect x="7" y="0" width="6" height="5" rx="1" fill="${accent}" />
      <rect x="15" y="1" width="7" height="5" rx="1" fill="${accent}" />
    </g>

    <!-- Coffee Mug -->
    <g transform="translate(68, 208)">
      <rect width="14" height="18" rx="2" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1.5" />
      <path d="M 14,4 C 18,4 18,14 14,14" fill="none" stroke="${theme.border}" stroke-width="1.5" />
      <rect x="3" y="3" width="8" height="2" fill="${theme.orange}" />
      <rect x="5" y="-5" width="1.5" height="4" fill="${theme.muted}" opacity="0.6" />
      <rect x="9" y="-8" width="1.5" height="5" fill="${theme.muted}" opacity="0.6" />
    </g>

    <!-- Micro Technical Coordinate Annotation -->
    <text x="340" y="230" text-anchor="end" class="mono" font-size="8" fill="${theme.muted}">LOC: 13.0827°N, 80.2707°E</text>
  </g>

  <!-- ===================================================================== -->
  <!-- COLUMN 3: RIGHT DIGITAL UNIVERSE (x: 680 to 932)                      -->
  <!-- ===================================================================== -->
  <g transform="translate(680, 52)">
    <rect width="252" height="242" rx="6" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1.5" />

    <!-- Architectural Celestial Window (Top) -->
    <g transform="translate(16, 16)">
      <rect width="220" height="74" rx="4" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1.5" />
      <line x1="0" y1="37" x2="220" y2="37" stroke="${theme.border}" stroke-width="1" stroke-dasharray="2 2" />
      <line x1="110" y1="0" x2="110" y2="74" stroke="${theme.border}" stroke-width="1" stroke-dasharray="2 2" />

      <!-- Crescent Moon -->
      <circle cx="170" cy="36" r="16" fill="${theme.orange}" />
      <circle cx="176" cy="32" r="13" fill="${theme.bg}" />

      <!-- Pixel Stars -->
      <rect x="30" y="18" width="4" height="4" fill="${accent}" />
      <rect x="75" y="25" width="3" height="3" fill="${theme.text}" />
      <rect x="45" y="52" width="3" height="3" fill="${theme.blue}" />
      <rect x="125" y="20" width="3" height="3" fill="${theme.violet}" />
      <rect x="135" y="55" width="4" height="4" fill="${accent}" />
    </g>

    <!-- Interrupted Grid & Floating Node Cluster (Middle) -->
    <g transform="translate(16, 100)">
      <line x1="10" y1="20" x2="70" y2="10" stroke="${theme.border}" stroke-width="1.5" stroke-dasharray="3 3" />
      <line x1="70" y1="10" x2="140" y2="25" stroke="${theme.border}" stroke-width="1.5" stroke-dasharray="3 3" />
      <line x1="140" y1="25" x2="210" y2="12" stroke="${theme.border}" stroke-width="1.5" stroke-dasharray="3 3" />

      <circle cx="10" cy="20" r="3" fill="${theme.blue}" />
      <circle cx="70" cy="10" r="4" fill="${accent}" class="node-pulse" />
      <circle cx="140" cy="25" r="3" fill="${theme.pink}" />
      <circle cx="210" cy="12" r="4" fill="${theme.orange}" />
    </g>

    <!-- Vertical Sequence: IDEA_, CODE_, BUILD_, LEARN_ (Bottom) -->
    <g transform="translate(24, 150)">
      <rect width="204" height="74" rx="4" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1" />
      <line x1="16" y1="18" x2="16" y2="58" stroke="${accent}" stroke-width="2" />

      <text x="28" y="22" class="mono seq-text"><tspan fill="${accent}">01.</tspan> IDEA_</text>
      <text x="28" y="36" class="mono seq-text"><tspan fill="${theme.blue}">02.</tspan> CODE_</text>
      <text x="28" y="50" class="mono seq-text"><tspan fill="${theme.orange}">03.</tspan> BUILD_</text>
      <text x="28" y="64" class="mono seq-text"><tspan fill="${theme.violet}">04.</tspan> LEARN_</text>
    </g>
  </g>
</svg>`;
}

/**
 * Generates the Canonical 96x96 "The Sohil Signal" SVG.
 * @param {'dark'|'light'} [mode='dark']
 * @returns {string}
 */
export function generateSignatureSvg(mode = 'dark') {
  const theme = PALETTE[mode];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96">
  <title>The Sohil Signal - Signature Brand Symbol</title>
  <desc>Original 96x96 geometric pixel-grid developer symbol constructed on an 8px grid with signature lime signal square.</desc>
  <style>${commonStyles()}</style>

  <rect width="96" height="96" rx="8" fill="${theme.surface}" stroke="${theme.border}" stroke-width="2" />
  ${renderSohilSignal({ x: 0, y: 0, size: 96, mode, showOrangePixel: true })}
</svg>`;
}

/**
 * Generates individual flat 2D Skill Icon Tiles (160 x 56).
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
 * Generates 12-Week Commit Velocity Heatmap & Sparkline Art (960 x 150).
 * @param {number[]} weeklyActivity
 * @param {'dark'|'light'} [mode='dark']
 * @returns {string}
 */
export function generateActivityArtSvg(weeklyActivity, mode = 'dark') {
  const theme = PALETTE[mode];
  const accent = theme.lime;
  const max = Math.max(...weeklyActivity, 1);
  const total = weeklyActivity.reduce((a, b) => a + b, 0);

  const columnsMarkup = weeklyActivity
    .map((val, i) => {
      const x = 36 + i * 75;
      const height = Math.max(4, Math.round((val / max) * 65));
      const y = 115 - height;
      const label = i === 11 ? 'NOW' : `W-${12 - i}`;

      return `
      <g>
        <rect x="${x}" y="50" width="48" height="65" rx="3" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1" />
        <rect x="${x}" y="${y}" width="48" height="${height}" rx="3" fill="${val > max * 0.7 ? accent : theme.blue}" />
        <text x="${x + 24}" y="42" text-anchor="middle" class="mono bold" font-size="9" fill="${theme.text}">${val}</text>
        <text x="${x + 24}" y="132" text-anchor="middle" class="mono" font-size="9" fill="${theme.muted}">${label}</text>
      </g>`;
    })
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 150" width="100%" height="150">
  <title>12-Week Commit Velocity Heatmap</title>
  <desc>Chronological distribution of commits over the previous 12 weeks.</desc>
  <style>${commonStyles()}</style>

  <rect x="1" y="1" width="958" height="148" rx="8" fill="${theme.bg}" stroke="${theme.border}" stroke-width="2" />

  <text x="36" y="24" class="mono bold" font-size="11" fill="${accent}">&gt; 12-WEEK COMMIT VELOCITY MATRIX</text>
  <text x="924" y="24" text-anchor="end" class="mono" font-size="10" fill="${theme.muted}">TOTAL: <tspan fill="${theme.text}" font-weight="700">${total}</tspan> COMMITS</text>
  <line x1="36" y1="30" x2="924" y2="30" stroke="${theme.border}" stroke-width="1" />

  ${columnsMarkup}
</svg>`;
}

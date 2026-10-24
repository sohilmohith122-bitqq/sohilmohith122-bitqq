/**
 * @fileoverview Project Arcade card renderer for collectible 2D levels.
 */

import { escapeXml, PALETTE } from './svg.mjs';
import { renderPixelCursor, commonStyles } from './motifs.mjs';

/**
 * Renders a bespoke 2D vector motif scene for a project based on its category.
 * @param {string} motifType
 * @param {object} theme
 * @param {string} accent
 * @returns {string}
 */
function renderCardScene(motifType, theme, accent) {
  switch (motifType) {
    case 'neural':
      // Connected neural nodes and scanning target
      return `
        <g transform="translate(18, 52)">
          <!-- Background Grid Plane -->
          <rect width="404" height="64" rx="4" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1" />
          
          <!-- Neural Graph Nodes & Links -->
          <line x1="40" y1="32" x2="110" y2="18" stroke="${accent}" stroke-width="2" />
          <line x1="40" y1="32" x2="110" y2="46" stroke="${accent}" stroke-width="2" />
          <line x1="110" y1="18" x2="190" y2="32" stroke="${accent}" stroke-width="2" />
          <line x1="110" y1="46" x2="190" y2="32" stroke="${accent}" stroke-width="2" />
          <line x1="190" y1="32" x2="270" y2="18" stroke="${theme.blue}" stroke-width="2" />
          <line x1="190" y1="32" x2="270" y2="46" stroke="${theme.blue}" stroke-width="2" />
          <line x1="270" y1="18" x2="350" y2="32" stroke="${theme.blue}" stroke-width="2" />
          <line x1="270" y1="46" x2="350" y2="32" stroke="${theme.blue}" stroke-width="2" />

          <!-- Nodes -->
          <circle cx="40" cy="32" r="5" fill="${accent}" />
          <circle cx="110" cy="18" r="4.5" fill="${theme.surface}" stroke="${accent}" stroke-width="2" />
          <circle cx="110" cy="46" r="4.5" fill="${theme.surface}" stroke="${accent}" stroke-width="2" />
          
          <!-- Central Pulse Node -->
          <circle cx="190" cy="32" r="6" fill="${accent}" class="node-pulse" />
          
          <circle cx="270" cy="18" r="4.5" fill="${theme.surface}" stroke="${theme.blue}" stroke-width="2" />
          <circle cx="270" cy="46" r="4.5" fill="${theme.surface}" stroke="${theme.blue}" stroke-width="2" />
          <circle cx="350" cy="32" r="5" fill="${theme.blue}" />

          <!-- Target Scan Brackets -->
          <rect x="178" y="20" width="24" height="2" fill="${theme.muted}" />
          <rect x="178" y="42" width="24" height="2" fill="${theme.muted}" />
        </g>
      `;

    case 'telemetry':
      // Telemetry stream and server rack
      return `
        <g transform="translate(18, 52)">
          <rect width="404" height="64" rx="4" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1" />
          <!-- Mini Server Unit -->
          <rect x="25" y="14" width="70" height="36" rx="3" fill="${theme.surface}" stroke="${accent}" stroke-width="1.5" />
          <line x1="32" y1="24" x2="70" y2="24" stroke="${theme.muted}" stroke-width="1.5" />
          <line x1="32" y1="32" x2="60" y2="32" stroke="${theme.muted}" stroke-width="1.5" />
          <circle cx="85" cy="24" r="2.5" fill="${accent}" />
          <circle cx="85" cy="32" r="2.5" fill="${theme.blue}" />

          <!-- Pulse Stream Bar Graph -->
          <g transform="translate(125, 14)">
            <rect x="0" y="24" width="8" height="12" fill="${accent}" />
            <rect x="16" y="16" width="8" height="20" fill="${accent}" />
            <rect x="32" y="8" width="8" height="28" fill="${theme.orange}" />
            <rect x="48" y="20" width="8" height="16" fill="${accent}" />
            <rect x="64" y="4" width="8" height="32" fill="${theme.pink}" />
            <rect x="80" y="14" width="8" height="22" fill="${accent}" />
            <rect x="96" y="26" width="8" height="10" fill="${theme.muted}" />
          </g>

          <!-- Waveform Line -->
          <path d="M 250,32 L 280,32 L 290,14 L 305,48 L 320,18 L 335,32 L 380,32" fill="none" stroke="${accent}" stroke-width="2" />
        </g>
      `;

    case 'timeline':
      // Clinical browser timeline pane
      return `
        <g transform="translate(18, 52)">
          <rect width="404" height="64" rx="4" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1" />
          <!-- Browser Header Bar -->
          <rect x="25" y="12" width="354" height="14" rx="2" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1" />
          <circle cx="34" cy="19" r="2" fill="${theme.pink}" />
          <circle cx="42" cy="19" r="2" fill="${theme.orange}" />
          <circle cx="50" cy="19" r="2" fill="${accent}" />
          
          <!-- Chronological Anchors -->
          <line x1="45" y1="44" x2="360" y2="44" stroke="${theme.border}" stroke-width="2" />
          <rect x="75" y="38" width="12" height="12" rx="2" fill="${accent}" />
          <rect x="165" y="38" width="12" height="12" rx="2" fill="${theme.blue}" />
          <rect x="255" y="38" width="12" height="12" rx="2" fill="${theme.violet}" />
          <rect x="330" y="38" width="12" height="12" rx="2" fill="${accent}" />
        </g>
      `;

    case 'terminal':
    default:
      // Dual-loop terminal & audio waveforms
      return `
        <g transform="translate(18, 52)">
          <rect width="404" height="64" rx="4" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1" />
          <!-- Mini Terminal Pane -->
          <rect x="25" y="14" width="160" height="36" rx="3" fill="${theme.surface}" stroke="${accent}" stroke-width="1.5" />
          <text x="35" y="30" class="mono bold" font-size="9" fill="${accent}">&gt; vad.stream</text>
          <text x="35" y="42" class="mono" font-size="8" fill="${theme.muted}">2-way duplex ok</text>

          <!-- Audio Frequency Bars -->
          <g transform="translate(215, 20)">
            <rect x="0" y="8" width="4" height="16" fill="${accent}" />
            <rect x="10" y="2" width="4" height="22" fill="${accent}" />
            <rect x="20" y="0" width="4" height="26" fill="${theme.blue}" />
            <rect x="30" y="6" width="4" height="20" fill="${theme.blue}" />
            <rect x="40" y="10" width="4" height="14" fill="${accent}" />
            <rect x="50" y="4" width="4" height="22" fill="${theme.orange}" />
            <rect x="60" y="12" width="4" height="12" fill="${theme.muted}" />
            <rect x="70" y="8" width="4" height="16" fill="${accent}" />
            <rect x="80" y="2" width="4" height="24" fill="${theme.blue}" />
            <rect x="90" y="9" width="4" height="14" fill="${accent}" />
            <rect x="100" y="13" width="4" height="8" fill="${theme.muted}" />
          </g>

          <line x1="335" y1="16" x2="335" y2="48" stroke="${theme.border}" stroke-width="1" />
          <circle cx="360" cy="32" r="7" fill="${theme.surface}" stroke="${accent}" stroke-width="2" />
          <circle cx="360" cy="32" r="3" fill="${accent}" />
        </g>
      `;
  }
}

/**
 * Determines motif classification from project metadata.
 * @param {string} name
 * @param {string} desc
 * @returns {string}
 */
export function classifyMotif(name = '', desc = '') {
  const text = `${name} ${desc}`.toLowerCase();
  if (text.includes('dermatol') || text.includes('vortex') || text.includes('vision') || text.includes('medscope') && text.includes('model')) {
    return 'neural';
  }
  if (text.includes('anomaly') || text.includes('network') || text.includes('telemetry') || text.includes('security')) {
    return 'telemetry';
  }
  if (text.includes('clinical') || text.includes('record') || text.includes('timeline') || text.includes('medscope')) {
    return 'timeline';
  }
  return 'terminal';
}

/**
 * Renders a complete collectible Project Arcade card.
 * @param {object} options
 * @param {string} options.level - e.g. "LVL 01"
 * @param {string} options.name - Repository name
 * @param {string} options.description - Factual description
 * @param {string[]} options.tags - Up to 3 verified technologies
 * @param {string} options.url - Link to repository
 * @param {string} options.language - Primary language
 * @param {'dark'|'light'} [options.mode='dark']
 * @returns {string}
 */
export function renderProjectCard({
  level = 'LVL 01',
  name = 'PROJECT',
  description = 'Autonomous developer universe prototype',
  tags = ['TypeScript', 'AI', 'Vite'],
  url = 'https://github.com/sohilmohith122-bitqq',
  language = 'TypeScript',
  mode = 'dark'
}) {
  const theme = PALETTE[mode];
  const accent = language === 'Python' ? theme.orange : theme.lime;
  const motif = classifyMotif(name, description);
  const scene = renderCardScene(motif, theme, accent);

  let currentX = 18;
  const tagsMarkup = tags
    .slice(0, 3)
    .map(tag => {
      const tagText = escapeXml(tag);
      const pillWidth = Math.min(102, Math.max(54, Math.round(tag.length * 7.4 + 14)));
      if (currentX + pillWidth > 342) return '';
      const markup = `
      <g transform="translate(${currentX}, 206)">
        <rect width="${pillWidth}" height="20" rx="4" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1" />
        <text x="${Math.round(pillWidth / 2)}" y="14" text-anchor="middle" class="mono" font-size="10" fill="${theme.text}">${tagText}</text>
      </g>`;
      currentX += pillWidth + 6;
      return markup;
    })
    .filter(Boolean)
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 240" width="440" height="240">
  <title>${escapeXml(name)} - ${escapeXml(level)}</title>
  <desc>${escapeXml(description)}</desc>

  <style>
    ${commonStyles()}
    .card-title { font-size: 14px; font-weight: 700; fill: ${theme.text}; letter-spacing: 0.5px; }
    .card-desc { font-size: 11px; fill: ${theme.muted}; }
    .card-link { font-size: 11px; font-weight: 700; fill: ${accent}; }
  </style>

  <a href="${escapeXml(url)}" target="_blank" rel="noopener noreferrer">
    <!-- Card Outer Frame -->
    <rect x="1" y="1" width="438" height="238" rx="8" fill="${theme.surface}" stroke="${theme.border}" stroke-width="2" />
    <rect x="3" y="3" width="434" height="234" rx="6" fill="none" stroke="${accent}" stroke-opacity="0.12" stroke-width="1" />

    <!-- Top Navigation Bar -->
    <rect x="2" y="2" width="436" height="36" rx="6" fill="${theme.bg}" />
    <line x1="2" y1="38" x2="438" y2="38" stroke="${theme.border}" stroke-width="1.5" />

    <!-- Pixel Cursor & Level Identifier -->
    ${renderPixelCursor({ x: 16, y: 11, size: 16, color: accent, accentColor: theme.blue })}
    <text x="40" y="22" class="mono bold" font-size="11" fill="${accent}">${escapeXml(level)}</text>
    <text x="105" y="22" class="mono" font-size="11" fill="${theme.muted}">// COLLECTIBLE REPO</text>

    <!-- Status Indicator -->
    <circle cx="410" cy="20" r="3.5" fill="${accent}" />
    <text x="400" y="23" text-anchor="end" class="mono bold" font-size="10" fill="${theme.muted}">ACTIVE</text>

    <!-- 2D Vector Motif Scene -->
    ${scene}

    <!-- Content Area: Name & Factual Description -->
    <text x="18" y="142" class="mono card-title">${escapeXml(name)}</text>
    <text x="18" y="162" class="mono card-desc">${escapeXml(description.length > 58 ? description.slice(0, 55) + '...' : description)}</text>
    <text x="18" y="178" class="mono card-desc">${escapeXml(description.length > 58 ? description.slice(55, 115) : '')}</text>

    <!-- Technology Tags -->
    ${tagsMarkup}

    <!-- Access CTA Button -->
    <g transform="translate(348, 206)">
      <rect width="74" height="20" rx="4" fill="${theme.bg}" stroke="${accent}" stroke-width="1.2" />
      <text x="37" y="14" text-anchor="middle" class="mono card-link">VIEW ↗</text>
    </g>
  </a>
</svg>`;
}

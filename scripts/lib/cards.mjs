/**
 * @fileoverview Project Arcade card renderer for collectible 2D levels (480 x 270).
 */

import { escapeXml, PALETTE } from './svg.mjs';
import { renderSohilSignal, commonStyles } from './motifs.mjs';

/**
 * Maps repository to category label.
 * @param {string} name
 * @returns {string}
 */
function getCategoryLabel(name = '') {
  const n = name.toUpperCase();
  if (n.includes('DERMA') || n.includes('VORTEX')) return 'APPLIED_AI / COMPUTER_VISION';
  if (n.includes('ANOMALY') || n.includes('NETWORK')) return 'SYSTEMS / TELEMETRY';
  if (n.includes('MEDSCOPE')) return 'HEALTHCARE / TIMELINE_ENGINE';
  if (n.includes('NEMESIS')) return 'AUTONOMOUS / AUDIO_SECURITY';
  if (n.includes('LANDVAULT') || n.includes('LAND')) return 'GEOSPATIAL / LAND_INTELLIGENCE';
  if (n.includes('PROCURE')) return 'ENTERPRISE / RFQ_OPTIMIZATION';
  if (n.includes('ARCTIC')) return 'DEVSEC / STATIC_ANALYSIS';
  return 'CORE_ENGINEERING';
}

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
      // Connected neural nodes and analytical scanning panel
      return `
        <g transform="translate(18, 52)">
          <rect width="444" height="74" rx="4" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1.2" />
          
          <!-- Neural Graph Nodes & Links -->
          <line x1="45" y1="37" x2="120" y2="20" stroke="${accent}" stroke-width="2" />
          <line x1="45" y1="37" x2="120" y2="54" stroke="${accent}" stroke-width="2" />
          <line x1="120" y1="20" x2="210" y2="37" stroke="${accent}" stroke-width="2" />
          <line x1="120" y1="54" x2="210" y2="37" stroke="${accent}" stroke-width="2" />
          <line x1="210" y1="37" x2="300" y2="20" stroke="${theme.blue}" stroke-width="2" />
          <line x1="210" y1="37" x2="300" y2="54" stroke="${theme.blue}" stroke-width="2" />
          <line x1="300" y1="20" x2="390" y2="37" stroke="${theme.blue}" stroke-width="2" />
          <line x1="300" y1="54" x2="390" y2="37" stroke="${theme.blue}" stroke-width="2" />

          <!-- Nodes -->
          <circle cx="45" cy="37" r="5.5" fill="${accent}" />
          <circle cx="120" cy="20" r="5" fill="${theme.surface}" stroke="${accent}" stroke-width="2" />
          <circle cx="120" cy="54" r="5" fill="${theme.surface}" stroke="${accent}" stroke-width="2" />
          
          <!-- Central Pulse Node -->
          <circle cx="210" cy="37" r="7" fill="${accent}" class="node-pulse" />
          
          <circle cx="300" cy="20" r="5" fill="${theme.surface}" stroke="${theme.blue}" stroke-width="2" />
          <circle cx="300" cy="54" r="5" fill="${theme.surface}" stroke="${theme.blue}" stroke-width="2" />
          <circle cx="390" cy="37" r="5.5" fill="${theme.blue}" />

          <!-- Target Scan Brackets -->
          <rect x="196" y="22" width="28" height="2" fill="${theme.muted}" />
          <rect x="196" y="50" width="28" height="2" fill="${theme.muted}" />
        </g>
      `;

    case 'telemetry':
      // Telemetry stream and connected server rack
      return `
        <g transform="translate(18, 52)">
          <rect width="444" height="74" rx="4" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1.2" />
          <!-- Server Module Unit -->
          <rect x="25" y="16" width="80" height="42" rx="3" fill="${theme.surface}" stroke="${accent}" stroke-width="1.5" />
          <line x1="33" y1="28" x2="75" y2="28" stroke="${theme.muted}" stroke-width="1.5" />
          <line x1="33" y1="38" x2="65" y2="38" stroke="${theme.muted}" stroke-width="1.5" />
          <circle cx="95" cy="28" r="2.5" fill="${accent}" />
          <circle cx="95" cy="38" r="2.5" fill="${theme.blue}" />

          <!-- Telemetry Pulse Histogram -->
          <g transform="translate(135, 16)">
            <rect x="0" y="28" width="8" height="14" fill="${accent}" />
            <rect x="16" y="18" width="8" height="24" fill="${accent}" />
            <rect x="32" y="8" width="8" height="34" fill="${theme.orange}" />
            <rect x="48" y="22" width="8" height="20" fill="${accent}" />
            <rect x="64" y="4" width="8" height="38" fill="${theme.pink}" />
            <rect x="80" y="16" width="8" height="26" fill="${accent}" />
            <rect x="96" y="30" width="8" height="12" fill="${theme.muted}" />
          </g>

          <!-- Waveform Stream -->
          <path d="M 270,37 L 305,37 L 315,16 L 332,58 L 350,22 L 368,37 L 420,37" fill="none" stroke="${accent}" stroke-width="2" />
        </g>
      `;

    case 'timeline':
      // Clinical browser timeline pane
      return `
        <g transform="translate(18, 52)">
          <rect width="444" height="74" rx="4" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1.2" />
          <!-- Browser Header Bar -->
          <rect x="25" y="12" width="394" height="16" rx="2" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1" />
          <circle cx="36" cy="20" r="2.5" fill="${theme.pink}" />
          <circle cx="46" cy="20" r="2.5" fill="${theme.orange}" />
          <circle cx="56" cy="20" r="2.5" fill="${accent}" />
          
          <!-- Chronological Timeline Path -->
          <line x1="45" y1="48" x2="400" y2="48" stroke="${theme.border}" stroke-width="2" />
          <rect x="85" y="41" width="14" height="14" rx="2" fill="${accent}" />
          <rect x="185" y="41" width="14" height="14" rx="2" fill="${theme.blue}" />
          <rect x="285" y="41" width="14" height="14" rx="2" fill="${theme.violet}" />
          <rect x="370" y="41" width="14" height="14" rx="2" fill="${accent}" />
        </g>
      `;

    case 'spatial':
      // GIS cadastral boundary polygons, coordinate pins, and terrain scan
      return `
        <g transform="translate(18, 52)">
          <rect width="444" height="74" rx="4" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1.2" />
          <!-- Coordinate Label -->
          <text x="25" y="24" class="mono bold" font-size="9" fill="${accent}">GIS: 13.0827° N, 80.2707° E</text>
          <text x="25" y="38" class="mono" font-size="8" fill="${theme.muted}">CADASTRAL_PARCEL_VERIFIED</text>

          <!-- Cadastral Polygon Mesh -->
          <g transform="translate(210, 10)">
            <polygon points="10,40 45,15 110,25 95,58 35,52" fill="${theme.surface}" stroke="${accent}" stroke-width="1.5" />
            <polygon points="110,25 155,10 190,35 145,55 95,58" fill="${theme.surface}" stroke="${theme.blue}" stroke-width="1.5" />
            <circle cx="45" cy="15" r="3" fill="${accent}" />
            <circle cx="110" cy="25" r="3" fill="${theme.orange}" />
            <circle cx="155" cy="10" r="3" fill="${theme.blue}" />
            <line x1="45" y1="15" x2="95" y2="58" stroke="${theme.border}" stroke-width="1" stroke-dasharray="2 2" />
          </g>
        </g>
      `;

    case 'ledger':
      // Automated RFQ normalization ledger and pricing index bars
      return `
        <g transform="translate(18, 52)">
          <rect width="444" height="74" rx="4" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1.2" />
          <!-- RFQ Scoreboard Table -->
          <rect x="25" y="14" width="190" height="46" rx="3" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1" />
          <text x="35" y="28" class="mono bold" font-size="9" fill="${accent}">RFQ_NORMALIZER // v2.4</text>
          <text x="35" y="42" class="mono" font-size="8" fill="${theme.text}">SUPPLIER_SCORE: 98.4% [PASS]</text>
          <text x="35" y="52" class="mono" font-size="7" fill="${theme.muted}">VARIANCE_DELTA: -14.2%</text>

          <!-- Distribution Waterfall Bars -->
          <g transform="translate(245, 14)">
            <rect x="0" y="24" width="22" height="22" rx="2" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1" />
            <rect x="0" y="32" width="22" height="14" rx="2" fill="${theme.blue}" />
            <rect x="30" y="14" width="22" height="32" rx="2" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1" />
            <rect x="30" y="20" width="22" height="26" rx="2" fill="${accent}" />
            <rect x="60" y="8" width="22" height="38" rx="2" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1" />
            <rect x="60" y="12" width="22" height="34" rx="2" fill="${theme.orange}" />
            <rect x="90" y="2" width="22" height="44" rx="2" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1" />
            <rect x="90" y="6" width="22" height="40" rx="2" fill="${accent}" />
          </g>
        </g>
      `;

    case 'terminal':
    default:
      // Dual-loop terminal & audio waveforms
      return `
        <g transform="translate(18, 52)">
          <rect width="444" height="74" rx="4" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1.2" />
          <!-- Mini Terminal Pane -->
          <rect x="25" y="15" width="180" height="44" rx="3" fill="${theme.surface}" stroke="${accent}" stroke-width="1.5" />
          <text x="35" y="32" class="mono bold" font-size="9" fill="${accent}">&gt; vad.stream --cuda</text>
          <text x="35" y="46" class="mono" font-size="8" fill="${theme.muted}">2-way duplex link: ok</text>

          <!-- Audio Frequency Bars -->
          <g transform="translate(235, 22)">
            <rect x="0" y="10" width="5" height="18" fill="${accent}" />
            <rect x="12" y="3" width="5" height="25" fill="${accent}" />
            <rect x="24" y="0" width="5" height="28" fill="${theme.blue}" />
            <rect x="36" y="8" width="5" height="20" fill="${theme.blue}" />
            <rect x="48" y="12" width="5" height="16" fill="${accent}" />
            <rect x="60" y="5" width="5" height="23" fill="${theme.orange}" />
            <rect x="72" y="14" width="5" height="14" fill="${theme.muted}" />
            <rect x="84" y="10" width="5" height="18" fill="${accent}" />
            <rect x="96" y="2" width="5" height="26" fill="${theme.blue}" />
            <rect x="108" y="11" width="5" height="17" fill="${accent}" />
            <rect x="120" y="15" width="5" height="13" fill="${theme.muted}" />
          </g>

          <line x1="375" y1="18" x2="375" y2="56" stroke="${theme.border}" stroke-width="1" />
          <circle cx="405" cy="37" r="8" fill="${theme.surface}" stroke="${accent}" stroke-width="2" />
          <circle cx="405" cy="37" r="3.5" fill="${accent}" />
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
  if (text.includes('dermatol') || text.includes('vortex') || text.includes('vision')) {
    return 'neural';
  }
  if (text.includes('anomaly') || text.includes('network') || text.includes('telemetry')) {
    return 'telemetry';
  }
  if (text.includes('clinical') || text.includes('timeline') || text.includes('medscope')) {
    return 'timeline';
  }
  if (text.includes('landvault') || text.includes('land') || text.includes('gis') || text.includes('deed')) {
    return 'spatial';
  }
  if (text.includes('procure') || text.includes('rfq') || text.includes('quotation')) {
    return 'ledger';
  }
  if (text.includes('arctic') || text.includes('sens') || text.includes('vulnerability')) {
    return 'security';
  }
  return 'terminal';
}

/**
 * Renders a complete collectible Project Arcade card (480 x 270).
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
  tags = ['TypeScript', 'React 19', 'Vite'],
  url = 'https://github.com/sohilmohith122-bitqq',
  language = 'TypeScript',
  mode = 'dark'
}) {
  const theme = PALETTE[mode];
  const accent = language === 'Python' ? theme.orange : theme.lime;
  const motif = classifyMotif(name, description);
  const categoryLabel = getCategoryLabel(name);
  const scene = renderCardScene(motif, theme, accent);

  let currentX = 18;
  const tagsMarkup = tags
    .slice(0, 3)
    .map(tag => {
      const tagText = escapeXml(tag);
      const pillWidth = Math.min(108, Math.max(54, Math.round(tag.length * 7.4 + 14)));
      if (currentX + pillWidth > 380) return '';
      const markup = `
      <g transform="translate(${currentX}, 232)">
        <rect width="${pillWidth}" height="22" rx="4" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1" />
        <text x="${Math.round(pillWidth / 2)}" y="15" text-anchor="middle" class="mono" font-size="10" fill="${theme.text}">${tagText}</text>
      </g>`;
      currentX += pillWidth + 8;
      return markup;
    })
    .filter(Boolean)
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270" width="480" height="270">
  <title>${escapeXml(name)} - ${escapeXml(level)}</title>
  <desc>${escapeXml(description)}</desc>

  <style>
    ${commonStyles()}
    .card-title { font-size: 15px; font-weight: 700; fill: ${theme.text}; letter-spacing: 0.5px; }
    .card-desc { font-size: 11px; fill: ${theme.muted}; }
    .card-link { font-size: 11px; font-weight: 700; fill: ${accent}; }
    .category-label { font-size: 9px; font-weight: 700; fill: ${theme.muted}; letter-spacing: 1px; }
  </style>

  <a href="${escapeXml(url)}" target="_blank" rel="noopener noreferrer">
    <!-- Card Outer Frame -->
    <rect x="1" y="1" width="478" height="268" rx="8" fill="${theme.surface}" stroke="${theme.border}" stroke-width="2" />
    <rect x="3" y="3" width="474" height="264" rx="6" fill="none" stroke="${accent}" stroke-opacity="0.12" stroke-width="1" />

    <!-- Top Technical Banner -->
    <rect x="2" y="2" width="476" height="38" rx="6" fill="${theme.bg}" />
    <line x1="2" y1="40" x2="478" y2="40" stroke="${theme.border}" stroke-width="1.5" />

    <!-- Brand Symbol Sequence Badge -->
    ${renderSohilSignal({ x: 14, y: 11, size: 18, mode, showOrangePixel: false })}
    <text x="38" y="24" class="mono bold" font-size="11" fill="${accent}">${escapeXml(level)}</text>
    <text x="100" y="24" class="mono category-label">// ${escapeXml(categoryLabel)}</text>

    <!-- Active Indicator -->
    <circle cx="452" cy="21" r="3.5" fill="${accent}" />
    <text x="442" y="24" text-anchor="end" class="mono bold" font-size="9" fill="${theme.muted}">ONLINE</text>

    <!-- 2D Vector Motif Scene -->
    ${scene}

    <!-- Content Area: Name & Factual Description -->
    <text x="18" y="156" class="mono card-title">${escapeXml(name)}</text>
    ${
      description.length <= 64
        ? `<text x="18" y="184" class="mono card-desc">${escapeXml(description)}</text>`
        : `<text x="18" y="176" class="mono card-desc">${escapeXml(description.slice(0, 60))}...</text>
    <text x="18" y="194" class="mono card-desc">${escapeXml(description.slice(60, 125))}</text>`
    }

    <!-- Technology Tags -->
    ${tagsMarkup}

    <!-- Access CTA Button -->
    <g transform="translate(390, 232)">
      <rect width="72" height="22" rx="4" fill="${theme.bg}" stroke="${accent}" stroke-width="1.2" />
      <text x="36" y="15" text-anchor="middle" class="mono card-link">VIEW ↗</text>
    </g>
  </a>
</svg>`;
}

/**
 * @fileoverview Brand Symbol (The Sohil Signal) and 2D flat geometric primitives.
 * Constructed strictly on an 8px grid within a 96x96 canonical viewBox.
 */

import { escapeXml, fontStack, PALETTE } from './svg.mjs';

/**
 * Generates The Sohil Signal SVG markup.
 * Built on an 8px underlying grid (12x12 cells) inside a 96x96 viewBox.
 * Recognizable at 16, 24, 32, 48, and 96px scales.
 *
 * @param {object} options
 * @param {number} [options.x=0]
 * @param {number} [options.y=0]
 * @param {number} [options.size=96]
 * @param {'dark'|'light'} [options.mode='dark']
 * @param {boolean} [options.showOrangePixel=true]
 * @returns {string}
 */
export function renderSohilSignal({
  x = 0,
  y = 0,
  size = 96,
  mode = 'dark',
  showOrangePixel = true
} = {}) {
  const theme = PALETTE[mode];
  const scale = (size / 96).toFixed(4);
  const limeColor = theme.lime;
  const orangeColor = theme.orange;
  const frameColor = theme.border;
  const coreColor = theme.blue;

  return `<g transform="translate(${x}, ${y}) scale(${scale})">
    <!-- 8px Grid Outer Corner Brackets (Cells 1,1; 10,1; 1,10; 10,10) -->
    <!-- Top-Left -->
    <rect x="8" y="8" width="16" height="8" fill="${frameColor}" />
    <rect x="8" y="16" width="8" height="16" fill="${frameColor}" />

    <!-- Top-Right -->
    <rect x="72" y="8" width="16" height="8" fill="${frameColor}" />
    <rect x="80" y="16" width="8" height="16" fill="${frameColor}" />

    <!-- Bottom-Left -->
    <rect x="8" y="80" width="16" height="8" fill="${frameColor}" />
    <rect x="8" y="64" width="8" height="16" fill="${frameColor}" />

    <!-- Bottom-Right -->
    <rect x="72" y="80" width="16" height="8" fill="${frameColor}" />
    <rect x="80" y="64" width="8" height="16" fill="${frameColor}" />

    <!-- Terminal Chevron '>' Silhouette (Cells 3,3 to 6,5 to 3,8) -->
    <rect x="24" y="24" width="8" height="8" fill="${coreColor}" />
    <rect x="32" y="32" width="8" height="8" fill="${coreColor}" />
    <rect x="40" y="40" width="8" height="8" fill="${coreColor}" />
    <rect x="48" y="40" width="8" height="8" fill="${coreColor}" />
    <rect x="40" y="48" width="8" height="8" fill="${coreColor}" />
    <rect x="32" y="56" width="8" height="8" fill="${coreColor}" />
    <rect x="24" y="64" width="8" height="8" fill="${coreColor}" />

    <!-- The Signature Lime-Green Signal Block (16x16: Cells 7,6 & 8,6) -->
    <rect x="56" y="48" width="16" height="16" rx="2" fill="${limeColor}" class="node-pulse" />

    ${
      showOrangePixel
        ? `<!-- Optional Accent Orange Pixel (Cell 7,4) -->
    <rect x="56" y="32" width="8" height="8" rx="1" fill="${orangeColor}" />`
        : ''
    }

    <!-- Auxiliary Data Node (Cell 8,9) -->
    <rect x="64" y="72" width="8" height="8" rx="1" fill="${theme.muted}" />
  </g>`;
}

/**
 * Backward-compatible alias for compact cursor uses.
 */
export function renderPixelCursor({ x = 0, y = 0, size = 16, mode = 'dark' } = {}) {
  return renderSohilSignal({ x, y, size, mode, showOrangePixel: size >= 24 });
}

/**
 * Standard CSS rules including reduced-motion overrides.
 * @returns {string}
 */
export function commonStyles() {
  return `
    .mono { font-family: ${fontStack()}; }
    .bold { font-weight: 700; }
    
    @keyframes blink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
    @keyframes pulseNode {
      0%, 100% { transform: scale(1); opacity: 0.9; }
      50% { transform: scale(1.08); opacity: 1; }
    }

    .cursor-blink {
      animation: blink 1s infinite step-start;
    }
    .node-pulse {
      animation: pulseNode 3s infinite ease-in-out;
      transform-origin: center;
    }

    @media (prefers-reduced-motion: reduce) {
      .cursor-blink, .node-pulse, * {
        animation: none !important;
        transition: none !important;
      }
    }
  `;
}

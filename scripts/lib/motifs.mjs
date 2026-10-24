/**
 * @fileoverview Geometric signature motifs and flat 2D frame primitives for SOHIL.exe.
 */

import { escapeXml, fontStack } from './svg.mjs';

/**
 * Renders the signature "Pixel Cursor" geometric symbol.
 * A crisp 16x16 pixel-reticle motif [ ⯌ ] representing the 2D universe.
 * @param {object} options
 * @param {number} [options.x=0]
 * @param {number} [options.y=0]
 * @param {number} [options.size=16]
 * @param {string} [options.color="#b7ff3c"]
 * @param {string} [options.accentColor="#58a6ff"]
 * @returns {string}
 */
export function renderPixelCursor({ x = 0, y = 0, size = 16, color = '#b7ff3c', accentColor = '#58a6ff' } = {}) {
  const scale = size / 16;
  return `<g transform="translate(${x}, ${y}) scale(${scale})">
    <!-- Outer Corner Brackets (2px flat pixel strokes) -->
    <rect x="0" y="0" width="4" height="2" fill="${color}" />
    <rect x="0" y="2" width="2" height="2" fill="${color}" />

    <rect x="12" y="0" width="4" height="2" fill="${color}" />
    <rect x="14" y="2" width="2" height="2" fill="${color}" />

    <rect x="0" y="14" width="4" height="2" fill="${color}" />
    <rect x="0" y="12" width="2" height="2" fill="${color}" />

    <rect x="12" y="14" width="4" height="2" fill="${color}" />
    <rect x="14" y="12" width="2" height="2" fill="${color}" />

    <!-- Center Geometric Core Node -->
    <rect x="6" y="6" width="4" height="4" fill="${accentColor}" />
  </g>`;
}

/**
 * Generates standard CSS styles including prefers-reduced-motion support.
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
      0%, 100% { transform: scale(1); opacity: 0.85; }
      50% { transform: scale(1.15); opacity: 1; }
    }

    .cursor-blink {
      animation: blink 0.9s infinite step-start;
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

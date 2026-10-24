/**
 * @fileoverview Core SVG primitives and design tokens for SOHIL.exe 2D Universe.
 */

export const PALETTE = {
  dark: {
    bg: '#0d1117',
    surface: '#161b22',
    border: '#30363d',
    text: '#e6edf3',
    muted: '#8b949e',
    lime: '#b7ff3c',
    orange: '#ff8a3d',
    violet: '#bc8cff',
    blue: '#58a6ff',
    pink: '#f778ba'
  },
  light: {
    bg: '#ffffff',
    surface: '#f6f8fa',
    border: '#d0d7de',
    text: '#1f2328',
    muted: '#656d76',
    lime: '#4b7f00',
    orange: '#a84300',
    violet: '#8250df',
    blue: '#0969da',
    pink: '#bf3989'
  }
};

/**
 * Escapes characters for valid XML output.
 * @param {string|number} str
 * @returns {string}
 */
export function escapeXml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Returns standard system monospace font stack string.
 * @returns {string}
 */
export function fontStack() {
  return "'JetBrains Mono', 'Fira Code', 'SFMono-Regular', Consolas, monospace";
}

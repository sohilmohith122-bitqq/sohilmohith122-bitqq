/**
 * @fileoverview SVG utility functions for generating hacker/terminal-themed cards.
 */

/**
 * Escapes unsafe characters for valid XML/SVG output.
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
 * Generates matrix rain background columns.
 * Keeps CPU load low by rendering at most 14 staggered columns.
 * @param {number} width
 * @param {number} height
 * @returns {string}
 */
export function generateMatrixRain(width = 800, height = 300) {
  const chars = '01アイウエオカキクケコサシスセソタチツテト0101<>{}/*=+-';
  const cols = Math.min(14, Math.floor(width / 50));
  let output = '<g opacity="0.06" font-family="monospace" font-size="11" fill="#00ff9c">\n';

  for (let i = 0; i < cols; i++) {
    const x = Math.floor((i + 0.5) * (width / cols));
    const dur = (4 + (i % 5) * 0.8).toFixed(1);
    const delay = ((i * 0.4) % 3).toFixed(1);
    
    // Pick 8 random characters for this column
    let colText = '';
    for (let j = 0; j < 8; j++) {
      colText += chars[(i * 7 + j * 3) % chars.length] + ' ';
    }

    output += `  <text x="${x}" y="0">
    <animateTransform attributeName="transform" type="translate"
      values="0,-40; 0,${height + 40}" dur="${dur}s" begin="-${delay}s" repeatCount="indefinite" />
    ${escapeXml(colText)}
  </text>\n`;
  }

  output += '</g>';
  return output;
}

/**
 * Wraps content inside a terminal window chrome frame.
 * @param {object} options
 * @param {string} options.title - Title bar text (e.g. "sohil@dev: ~")
 * @param {number} options.width - Overall width
 * @param {number} options.height - Overall height
 * @param {string} options.content - Inner SVG content
 * @param {boolean} [options.showScanlines=true] - Whether to render subtle scanlines
 * @param {boolean} [options.showMatrix=false] - Whether to render falling matrix rain
 * @param {string} [options.accentColor="#00ff9c"] - Accent border color
 * @returns {string}
 */
export function terminalWindow({
  title = 'sohil@dev: ~',
  width = 800,
  height = 300,
  content = '',
  showScanlines = true,
  showMatrix = false,
  accentColor = '#00ff9c'
}) {
  const scanlinesPattern = showScanlines
    ? `
    <pattern id="scanlines" width="100%" height="4" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="100%" y2="0" stroke="#000000" stroke-width="1.2" opacity="0.25" />
    </pattern>
    <rect width="${width}" height="${height}" fill="url(#scanlines)" pointer-events="none" />`
    : '';

  const matrixBg = showMatrix ? generateMatrixRain(width, height) : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}">
  <defs>
    <!-- Dark Glass Linear Gradient -->
    <linearGradient id="termBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0e141d" />
      <stop offset="100%" stop-color="#0a0e14" />
    </linearGradient>
    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0f1620" />
      <stop offset="100%" stop-color="#141c28" />
    </linearGradient>
  </defs>

  <style>
    .mono { font-family: 'JetBrains Mono', 'Fira Code', 'SFMono-Regular', Consolas, monospace; }
    .term-title { font-size: 12px; fill: #5c6b7a; letter-spacing: 0.5px; }
  </style>

  <!-- Terminal Body Frame -->
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="8" fill="url(#termBg)" stroke="#1a2433" stroke-width="1.5" />
  <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="7" fill="none" stroke="${accentColor}" stroke-opacity="0.15" stroke-width="1" />

  <!-- Terminal Window Header -->
  <path d="M 1,9 A 8,8 0 0 1 9,1 L ${width - 9},1 A 8,8 0 0 1 ${width - 1},9 L ${width - 1},32 L 1,32 Z" fill="url(#headerGrad)" />
  <line x1="1" y1="32" x2="${width - 1}" y2="32" stroke="#1c2736" stroke-width="1" />

  <!-- 3 Chrome Controls -->
  <circle cx="18" cy="16" r="4.5" fill="#ff5370" />
  <circle cx="34" cy="16" r="4.5" fill="#ffb86b" />
  <circle cx="50" cy="16" r="4.5" fill="#00ff9c" />

  <!-- Title -->
  <text x="${width / 2}" y="20" text-anchor="middle" class="mono term-title">${escapeXml(title)}</text>

  <!-- Matrix Background (Optional) -->
  ${matrixBg}

  <!-- Main Content Group -->
  <g transform="translate(0, 32)">
    ${content}
  </g>

  <!-- Scanlines Overlay (Optional) -->
  ${scanlinesPattern}
</svg>`;
}

/**
 * Renders a progress / stat bar.
 * @param {object} options
 * @param {string} options.label - Bar label (e.g. "Python")
 * @param {number} options.percentage - 0 to 100
 * @param {string} options.valueText - Formatted stat string (e.g. "42.5%")
 * @param {string} options.color - Hex code
 * @param {number} options.x - X position
 * @param {number} options.y - Y position
 * @param {number} options.width - Max bar width
 * @returns {string}
 */
export function renderBar({ label, percentage, valueText, color = '#00ff9c', x = 0, y = 0, width = 240 }) {
  const safePercent = Math.min(100, Math.max(0, percentage));
  const fillWidth = Math.round((safePercent / 100) * width);

  return `<g transform="translate(${x}, ${y})">
    <text x="0" y="11" class="mono" font-size="12" fill="#c9d1d9">${escapeXml(label)}</text>
    <text x="${width + 65}" y="11" text-anchor="end" class="mono" font-size="11" fill="#5c6b7a">${escapeXml(valueText)}</text>
    <rect x="0" y="18" width="${width + 65}" height="5" rx="2.5" fill="#141c28" />
    <rect x="0" y="18" width="${fillWidth}" height="5" rx="2.5" fill="${color}">
      <animate attributeName="width" from="0" to="${fillWidth}" dur="0.8s" fill="freeze" calcMode="spline" keySplines="0.25 0.1 0.25 1" />
    </rect>
  </g>`;
}

/**
 * Generates an SVG path for an activity sparkline with gradient fill.
 * @param {object} options
 * @param {number[]} options.points - Array of numeric data points
 * @param {number} options.width - Sparkline width
 * @param {number} options.height - Sparkline height
 * @param {string} [options.color="#00ff9c"] - Stroke color
 * @param {string} [options.id="spark"] - Unique gradient ID
 * @returns {string}
 */
export function renderSparkline({ points = [], width = 700, height = 90, color = '#00ff9c', id = 'spark' }) {
  if (!points || points.length < 2) return '';

  const max = Math.max(...points, 1);
  const stepX = width / (points.length - 1);
  const paddingY = 8;
  const usableHeight = height - paddingY * 2;

  const coords = points.map((p, i) => {
    const x = Math.round(i * stepX);
    const y = Math.round(height - paddingY - (p / max) * usableHeight);
    return { x, y, val: p };
  });

  const linePath = coords.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x},${pt.y}`, '');
  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

  // Dots for each data point
  const dots = coords
    .map(
      pt => `<circle cx="${pt.x}" cy="${pt.y}" r="2.5" fill="${color}" opacity="0.85">
        <title>${escapeXml(pt.val)} commits</title>
      </circle>`
    )
    .join('\n');

  return `<g>
    <defs>
      <linearGradient id="${id}Grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.35" />
        <stop offset="100%" stop-color="${color}" stop-opacity="0.0" />
      </linearGradient>
    </defs>
    <!-- Background Area Fill -->
    <path d="${areaPath}" fill="url(#${id}Grad)" />
    <!-- Line Stroke -->
    <path d="${linePath}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <!-- Data Points -->
    ${dots}
  </g>`;
}

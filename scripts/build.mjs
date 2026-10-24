/**
 * @fileoverview Main build script for assembling the terminal profile README and dynamic SVGs.
 *
 * HOW TO ADD A NEW GENERATED CARD:
 * 1. Define a generator function in this file or inside scripts/lib/svg.mjs.
 * 2. Wrap your SVG content with terminalWindow({ title, width, height, content }).
 * 3. Call your generator in the main build() function below.
 * 4. Write the output SVG into the assets/ directory.
 * 5. Reference the generated asset in README.template.md.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { escapeXml, terminalWindow, renderBar, renderSparkline } from './lib/svg.mjs';
import { fetchGitHubMetrics } from './fetch-github.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

/**
 * Calculates human-readable uptime from starting year.
 * @param {string|number} startYear
 * @returns {string}
 */
function calculateUptime(startYear) {
  const currentYear = new Date().getFullYear();
  const parsed = parseInt(startYear, 10);
  if (!isNaN(parsed) && parsed > 2000 && parsed <= currentYear) {
    const diff = currentYear - parsed;
    return `${diff} year${diff === 1 ? '' : 's'} (${parsed}-present)`;
  }
  return 'since day 1';
}

/**
 * Generates the assets/neofetch.svg system card.
 * @param {object} config
 * @returns {string}
 */
export function generateNeofetchSvg(config) {
  const uptime = calculateUptime(config.years_coding_start);
  const languagesStr = config.languages.slice(0, 4).join(', ');

  // Stylized cyberpunk operator ASCII emblem
  const asciiArt = [
    '    .----.',
    '   /  --  \\',
    '  |  (..)  |',
    '  |   ==   |',
    '   \\  __  /',
    '    `----`',
    '   [CYBER]',
    '   [SH-01]'
  ];

  const asciiRows = asciiArt
    .map((line, i) => `<text x="35" y="${60 + i * 18}" class="mono" font-size="13" font-weight="bold" fill="#00ff9c">${escapeXml(line)}</text>`)
    .join('\n');

  // Key-value specs
  const specs = [
    { label: 'OS', val: config.os_of_choice },
    { label: 'Host', val: 'Dev Station (x86_64)' },
    { label: 'Kernel', val: 'Linux 6.x / Cloud Native' },
    { label: 'Uptime', val: uptime },
    { label: 'Shell', val: config.shell },
    { label: 'Editor', val: config.editor },
    { label: 'Languages', val: languagesStr },
    { label: 'Base', val: `${config.location} (${config.timezone.split(' ')[0]})` },
    { label: 'Status', val: config.status }
  ];

  const specRows = specs
    .map(
      (s, i) => `<g transform="translate(190, ${58 + i * 20})">
      <text x="0" y="0" class="mono" font-size="12" font-weight="bold" fill="#22e6ff">${escapeXml(s.label)}:</text>
      <text x="95" y="0" class="mono" font-size="12" fill="#c9d1d9">${escapeXml(s.val)}</text>
    </g>`
    )
    .join('\n');

  // 8 Color chips for terminal theme palette
  const chips = ['#0a0e14', '#ff5370', '#00ff9c', '#ffb86b', '#22e6ff', '#b26bff', '#c9d1d9', '#5c6b7a'];
  const colorChips = chips
    .map((c, i) => `<rect x="${190 + i * 22}" y="246" width="16" height="10" rx="2" fill="${c}" stroke="#1c2736" stroke-width="1" />`)
    .join('\n');

  const content = `
    <!-- Header identity line -->
    <text x="190" y="24" class="mono" font-size="15" font-weight="bold" fill="#00ff9c">${escapeXml(config.handle)}<tspan fill="#5c6b7a">@</tspan><tspan fill="#b26bff">operator</tspan></text>
    <line x1="190" y1="34" x2="480" y2="34" stroke="#1c2736" stroke-width="1.5" />

    <!-- ASCII Emblem -->
    ${asciiRows}

    <!-- Neofetch Spec List -->
    ${specRows}

    <!-- Terminal Color Palette Palette -->
    ${colorChips}
  `;

  return terminalWindow({
    title: 'sohil@operator: ~/neofetch',
    width: 800,
    height: 310,
    content,
    showScanlines: true,
    showMatrix: false,
    accentColor: '#00ff9c'
  });
}

/**
 * Generates the assets/stats.svg metrics card.
 * @param {object} metrics
 * @returns {string}
 */
export function generateStatsSvg(metrics) {
  const statRows = [
    { label: 'PUBLIC REPOS', val: metrics.user.public_repos, color: '#22e6ff' },
    { label: 'STARS EARNED', val: metrics.user.total_stars, color: '#ffb86b' },
    { label: 'TOTAL COMMITS (1Y)', val: metrics.user.total_commits, color: '#00ff9c' },
    { label: 'FOLLOWERS', val: metrics.user.followers, color: '#b26bff' }
  ];

  const statBoxes = statRows
    .map(
      (s, i) => `<g transform="translate(35, ${25 + i * 48})">
      <rect width="250" height="38" rx="6" fill="#111823" stroke="#1a2535" stroke-width="1" />
      <text x="16" y="24" class="mono" font-size="11" font-weight="bold" fill="#5c6b7a">${escapeXml(s.label)}</text>
      <text x="234" y="24" text-anchor="end" class="mono" font-size="15" font-weight="bold" fill="${s.color}">${escapeXml(s.val)}</text>
    </g>`
    )
    .join('\n');

  // Top languages bars
  const langBars = metrics.topLanguages
    .map((lang, i) =>
      renderBar({
        label: lang.name,
        percentage: lang.percentage,
        valueText: `${lang.percentage}%`,
        color: lang.color,
        x: 330,
        y: 28 + i * 36,
        width: 320
      })
    )
    .join('\n');

  const content = `
    <!-- Left Column: Metrics -->
    ${statBoxes}

    <!-- Divider Line -->
    <line x1="305" y1="20" x2="305" y2="215" stroke="#1a2535" stroke-width="1" stroke-dasharray="4 4" />

    <!-- Right Column: Language Distribution -->
    <text x="330" y="16" class="mono" font-size="11" font-weight="bold" fill="#5c6b7a">TOP LANGUAGES (CODE DISTRIBUTION)</text>
    ${langBars}
  `;

  return terminalWindow({
    title: 'sohil@stats: ~/metrics',
    width: 800,
    height: 260,
    content,
    showScanlines: true,
    showMatrix: false,
    accentColor: '#22e6ff'
  });
}

/**
 * Generates the assets/activity.svg 12-week velocity sparkline.
 * @param {number[]} weeklyActivity
 * @returns {string}
 */
export function generateActivitySvg(weeklyActivity) {
  const sparkline = renderSparkline({
    points: weeklyActivity,
    width: 720,
    height: 85,
    color: '#00ff9c',
    id: 'activitySpark'
  });

  const weekLabels = Array.from({ length: 12 }, (_, i) => {
    const x = Math.round(i * (720 / 11));
    const label = i === 11 ? 'NOW' : `W-${12 - i}`;
    return `<text x="${x}" y="105" text-anchor="middle" class="mono" font-size="10" fill="#5c6b7a">${label}</text>`;
  }).join('\n');

  const total12w = weeklyActivity.reduce((a, b) => a + b, 0);

  const content = `
    <g transform="translate(40, 20)">
      <text x="0" y="0" class="mono" font-size="12" font-weight="bold" fill="#00ff9c">&gt; COMMIT VELOCITY</text>
      <text x="720" y="0" text-anchor="end" class="mono" font-size="11" fill="#5c6b7a">TOTAL 12-WEEK COMMITS: <tspan fill="#22e6ff" font-weight="bold">${total12w}</tspan></text>

      <!-- Sparkline plot area -->
      <g transform="translate(0, 15)">
        <!-- Subtle horizontal grid lines -->
        <line x1="0" y1="0" x2="720" y2="0" stroke="#16222f" stroke-width="1" stroke-dasharray="3 3" />
        <line x1="0" y1="42" x2="720" y2="42" stroke="#16222f" stroke-width="1" stroke-dasharray="3 3" />
        <line x1="0" y1="85" x2="720" y2="85" stroke="#16222f" stroke-width="1" />

        ${sparkline}
        ${weekLabels}
      </g>
    </g>
  `;

  return terminalWindow({
    title: 'sohil@activity: ~/sparkline',
    width: 800,
    height: 190,
    content,
    showScanlines: true,
    showMatrix: false,
    accentColor: '#00ff9c'
  });
}

/**
 * Builds the Markdown projects table.
 * @param {Array<object>} projects
 * @returns {string}
 */
function buildProjectsTable(projects) {
  const rows = projects.map(p => {
    const link = p.url ? `[\`launch →\`](${p.url})` : '`-`';
    return `| \`drwxr-xr-x\` | **[${p.name}](${p.url})** | ${p.description} | \`${p.language}\` | ${link} |`;
  });

  if (projects.length < 3) {
    rows.push(`| \`drwxr-xr-x\` | **next-project/** | [ in progress ] | \`-\` | \`-\` |`);
  }

  return [
    '| Perms | Repository | Description | Stack | Link |',
    '| :--- | :--- | :--- | :---: | :---: |',
    ...rows
  ].join('\n');
}

/**
 * Main assemble pipeline.
 */
async function build() {
  console.log('⚡ Initializing terminal profile build...');

  // 1. Read configuration
  const configPath = path.join(ROOT_DIR, 'profile.config.json');
  const rawConfig = await fs.readFile(configPath, 'utf8');
  const config = JSON.parse(rawConfig);

  // 2. Fetch GitHub metrics
  console.log('📡 Fetching GitHub telemetry & metrics...');
  const metrics = await fetchGitHubMetrics();

  // 3. Update projects in config if in AUTO mode
  if (config.projects_mode === 'auto') {
    config.projects = metrics.topProjects;
    await fs.writeFile(configPath, JSON.stringify(config, null, 2) + '\n', 'utf8');
    console.log(`✓ Synchronized ${config.projects.length} qualifying projects to profile.config.json`);
  }

  // 4. Ensure assets directory exists
  const assetsDir = path.join(ROOT_DIR, 'assets');
  await fs.mkdir(assetsDir, { recursive: true });

  // 5. Generate and write SVGs
  console.log('🎨 Generating terminal SVGs...');
  const neofetchSvg = generateNeofetchSvg(config);
  await fs.writeFile(path.join(assetsDir, 'neofetch.svg'), neofetchSvg, 'utf8');

  const statsSvg = generateStatsSvg(metrics);
  await fs.writeFile(path.join(assetsDir, 'stats.svg'), statsSvg, 'utf8');

  const activitySvg = generateActivitySvg(metrics.weeklyActivity);
  await fs.writeFile(path.join(assetsDir, 'activity.svg'), activitySvg, 'utf8');

  // 6. Generate README from template
  console.log('📄 Assembling README.md from template...');
  const templatePath = path.join(ROOT_DIR, 'README.template.md');
  const template = await fs.readFile(templatePath, 'utf8');

  const skillsJson = JSON.stringify(
    {
      languages: config.languages,
      frameworks_tools: config.frameworks_tools,
      learning: config.learning
    },
    null,
    2
  );

  const projectsTable = buildProjectsTable(config.projects);

  const pingLinks = [
    config.links.linkedin && !config.links.linkedin.includes('[EDIT')
      ? `- **LinkedIn**: [${config.links.linkedin}](${config.links.linkedin})`
      : `- **LinkedIn**: \`[EDIT: Add LinkedIn URL in profile.config.json]\``,
    config.links.email && !config.links.email.includes('[EDIT')
      ? `- **Email**: [${config.links.email}](mailto:${config.links.email})`
      : `- **Email**: \`[EDIT: Add contact email in profile.config.json]\``,
    config.links.portfolio && !config.links.portfolio.includes('[EDIT')
      ? `- **Portfolio**: [${config.links.portfolio}](${config.links.portfolio})`
      : null
  ]
    .filter(Boolean)
    .join('\n');

  const renderedReadme = template
    .replace(/\{\{NAME\}\}/g, config.name)
    .replace(/\{\{HANDLE\}\}/g, config.handle)
    .replace(/\{\{ROLE\}\}/g, config.role)
    .replace(/\{\{TAGLINE\}\}/g, config.tagline)
    .replace(/\{\{LOCATION\}\}/g, config.location)
    .replace(/\{\{SKILLS_JSON\}\}/g, skillsJson)
    .replace(/\{\{PROJECTS_TABLE\}\}/g, projectsTable)
    .replace(/\{\{PING_LINKS\}\}/g, pingLinks);

  await fs.writeFile(path.join(ROOT_DIR, 'README.md'), renderedReadme, 'utf8');
  console.log('✓ Successfully assembled README.md');
  console.log('✨ Build pipeline completed.');
}

build().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});

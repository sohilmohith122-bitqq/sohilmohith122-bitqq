/**
 * @fileoverview Main build script for SOHIL.exe - The 2D Developer Universe.
 * Generates dark and light SVG vector assets, populates project cards, and compiles README.md.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchGitHubMetrics } from './fetch-github.mjs';
import { renderProjectCard } from './lib/cards.mjs';
import {
  generateHeroSvg,
  generateSignatureSvg,
  generateSkillTileSvg,
  generateStatsArtSvg,
  generateActivityArtSvg
} from './lib/illustrations.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const SKILL_TILES_DEF = [
  { id: 'lang-python', title: 'Python', category: 'language', glyph: 'python' },
  { id: 'lang-ts', title: 'TypeScript', category: 'language', glyph: 'typescript' },
  { id: 'lang-js', title: 'JavaScript', category: 'language', glyph: 'terminal' },
  { id: 'tool-react', title: 'React 19', category: 'framework', glyph: 'react' },
  { id: 'tool-node', title: 'Node.js', category: 'framework', glyph: 'server' },
  { id: 'tool-fastapi', title: 'FastAPI', category: 'framework', glyph: 'server' },
  { id: 'tool-git', title: 'Git / CI', category: 'tool', glyph: 'terminal' },
  { id: 'tool-linux', title: 'Linux / WSL', category: 'tool', glyph: 'terminal' }
];

/**
 * Builds the Markdown projects table fallback.
 * @param {Array<object>} projects
 * @returns {string}
 */
function buildProjectsMarkdown(projects) {
  const rows = projects.map(p => {
    const tagsStr = (p.tags || []).map(t => `\`${t}\``).join(' ');
    return `| \`${p.level}\` | **[${p.name}](${p.url})** | ${p.description} | ${tagsStr} | [\`launch →\`](${p.url}) |`;
  });

  return [
    '| Level | Project | Description | Stack | Link |',
    '| :---: | :--- | :--- | :--- | :---: |',
    ...rows
  ].join('\n');
}

/**
 * Builds the Project Arcade cards HTML gallery using <picture> elements.
 * @param {Array<object>} projects
 * @returns {string}
 */
function buildProjectCardsGallery(projects) {
  const cardsHtml = projects.map(p => {
    const slug = `${p.level.toLowerCase().replace(' ', '-')}-${p.slug}`;
    return `<a href="${p.url}"><picture><source media="(prefers-color-scheme: dark)" srcset="./assets/projects/card-${slug}-dark.svg" /><source media="(prefers-color-scheme: light)" srcset="./assets/projects/card-${slug}-light.svg" /><img src="./assets/projects/card-${slug}-dark.svg" width="48%" alt="${p.name} - ${p.level}" /></picture></a>`;
  });

  return `<div align="center">
  ${cardsHtml[0] || ''}&nbsp;&nbsp;${cardsHtml[1] || ''}
  <br/><br/>
  ${cardsHtml[2] || ''}&nbsp;&nbsp;${cardsHtml[3] || ''}
</div>`;
}

/**
 * Builds the Skill Tiles HTML gallery.
 * @returns {string}
 */
function buildSkillsGallery() {
  const tileMarkup = SKILL_TILES_DEF.map(skill => {
    return `<picture><source media="(prefers-color-scheme: dark)" srcset="./assets/skills/${skill.id}-dark.svg" /><source media="(prefers-color-scheme: light)" srcset="./assets/skills/${skill.id}-light.svg" /><img src="./assets/skills/${skill.id}-dark.svg" width="160" height="56" alt="${skill.title}" /></picture>`;
  });

  const row1 = tileMarkup.slice(0, 4).join('\n  ');
  const row2 = tileMarkup.slice(4, 8).join('\n  ');

  return `<div align="center">
  ${row1}
  <br/><br/>
  ${row2}
</div>`;
}

/**
 * Main assemble pipeline.
 */
async function build() {
  console.log('⚡ Initializing SOHIL.exe 2D Universe build...');

  // 1. Load profile configuration
  const configPath = path.join(ROOT_DIR, 'profile.config.json');
  const rawConfig = await fs.readFile(configPath, 'utf8');
  const config = JSON.parse(rawConfig);

  // Strict naming rule check
  if (config.name !== 'Sohil') {
    throw new Error(`CRITICAL: config.name must strictly be "Sohil". Found: "${config.name}"`);
  }

  // 2. Fetch GitHub metrics
  console.log('📡 Fetching verified repository telemetry...');
  const metrics = await fetchGitHubMetrics();

  // 3. Update projects in config if in AUTO mode
  const isAuto = (config.projectsMode || config.projects_mode) === 'auto';
  if (isAuto) {
    const max = config.maxProjects || 4;
    config.projects = metrics.topProjects.slice(0, max);
    await fs.writeFile(configPath, JSON.stringify(config, null, 2) + '\n', 'utf8');
    console.log(`✓ Synchronized ${config.projects.length} collectible levels to profile.config.json`);
  }

  // 4. Ensure target asset directories
  const assetsDir = path.join(ROOT_DIR, 'assets');
  const skillsDir = path.join(assetsDir, 'skills');
  const projectsDir = path.join(assetsDir, 'projects');
  await fs.mkdir(assetsDir, { recursive: true });
  await fs.mkdir(skillsDir, { recursive: true });
  await fs.mkdir(projectsDir, { recursive: true });

  // 5. Generate Hero Headers (Dark and Light)
  console.log('🎨 Generating Hero Workstation (Dark & Light)...');
  await fs.writeFile(path.join(assetsDir, 'header-dark.svg'), generateHeroSvg('dark'), 'utf8');
  await fs.writeFile(path.join(assetsDir, 'header-light.svg'), generateHeroSvg('light'), 'utf8');

  // 6. Generate Signature Motifs
  console.log('🎨 Generating Signature Pixel Cursor Motifs...');
  await fs.writeFile(path.join(assetsDir, 'signature-dark.svg'), generateSignatureSvg('dark'), 'utf8');
  await fs.writeFile(path.join(assetsDir, 'signature-light.svg'), generateSignatureSvg('light'), 'utf8');

  // 7. Generate Skill Tiles (Dark & Light)
  console.log('🎨 Generating 2D Skill Icon Tiles...');
  for (const skill of SKILL_TILES_DEF) {
    await fs.writeFile(
      path.join(skillsDir, `${skill.id}-dark.svg`),
      generateSkillTileSvg(skill.title, skill.category, skill.glyph, 'dark'),
      'utf8'
    );
    await fs.writeFile(
      path.join(skillsDir, `${skill.id}-light.svg`),
      generateSkillTileSvg(skill.title, skill.category, skill.glyph, 'light'),
      'utf8'
    );
  }

  // 8. Generate Project Arcade Cards (Dark & Light)
  console.log('🎨 Generating Project Arcade Collectible Cards...');
  for (const p of config.projects) {
    const slug = `${p.level.toLowerCase().replace(' ', '-')}-${p.slug}`;
    const darkCard = renderProjectCard({ ...p, mode: 'dark' });
    const lightCard = renderProjectCard({ ...p, mode: 'light' });
    await fs.writeFile(path.join(projectsDir, `card-${slug}-dark.svg`), darkCard, 'utf8');
    await fs.writeFile(path.join(projectsDir, `card-${slug}-light.svg`), lightCard, 'utf8');
  }

  // 9. Generate GitHub Stats Data Art & 12-Week Velocity
  console.log('🎨 Generating Real GitHub Data Art...');
  await fs.writeFile(path.join(assetsDir, 'stats-dark.svg'), generateStatsArtSvg(metrics, 'dark'), 'utf8');
  await fs.writeFile(path.join(assetsDir, 'stats-light.svg'), generateStatsArtSvg(metrics, 'light'), 'utf8');
  await fs.writeFile(path.join(assetsDir, 'activity-dark.svg'), generateActivityArtSvg(metrics.weeklyActivity, 'dark'), 'utf8');
  await fs.writeFile(path.join(assetsDir, 'activity-light.svg'), generateActivityArtSvg(metrics.weeklyActivity, 'light'), 'utf8');

  // 10. Assemble README.md from template
  console.log('📄 Assembling README.md from template...');
  const templatePath = path.join(ROOT_DIR, 'README.template.md');
  const template = await fs.readFile(templatePath, 'utf8');

  const renderedReadme = template
    .replace(/\{\{NAME\}\}/g, config.name)
    .replace(/\{\{HANDLE\}\}/g, config.handle)
    .replace(/\{\{HEADLINE\}\}/g, config.headline)
    .replace(/\{\{TAGLINE\}\}/g, config.tagline)
    .replace(/\{\{ABOUT\}\}/g, config.about)
    .replace(/\{\{LOCATION\}\}/g, config.location)
    .replace(/\{\{EDUCATION\}\}/g, config.education || 'B.Tech AI & Data Science')
    .replace(/\{\{AVAILABILITY\}\}/g, config.availability)
    .replace(/\{\{PROJECT_CARDS_GALLERY\}\}/g, buildProjectCardsGallery(config.projects))
    .replace(/\{\{PROJECTS_TABLE\}\}/g, buildProjectsMarkdown(config.projects))
    .replace(/\{\{SKILLS_TILES_GALLERY\}\}/g, buildSkillsGallery())
    .replace(
      /\{\{LEARNING_LIST\}\}/g,
      config.learning.map(item => `\`[ ⯌ ]\` ${item}`).join(' &nbsp;•&nbsp; ')
    )
    .replace(
      /\{\{LINKEDIN_LINK\}\}/g,
      config.links.linkedin.includes('[EDIT')
        ? '`[EDIT: Add LinkedIn in profile.config.json]`'
        : `[Connect on LinkedIn →](${config.links.linkedin})`
    )
    .replace(
      /\{\{EMAIL_LINK\}\}/g,
      config.links.email.includes('[EDIT')
        ? '`[EDIT: Add Email in profile.config.json]`'
        : `[${config.links.email}](mailto:${config.links.email})`
    );

  await fs.writeFile(path.join(ROOT_DIR, 'README.md'), renderedReadme, 'utf8');
  console.log('✓ Successfully assembled README.md');
  console.log('✨ Build pipeline completed.');
}

build().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});

/**
 * @fileoverview Lints generated SVGs for valid XML structure, size budget, and link integrity.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

/**
 * Validates XML well-formedness using regex/bracket parsing.
 * @param {string} xmlString
 * @param {string} filename
 */
function validateXml(xmlString, filename) {
  // Check basic XML boundaries
  if (!xmlString.includes('<svg') || !xmlString.includes('</svg>')) {
    throw new Error(`${filename} is missing <svg> or </svg> root tags.`);
  }

  // Strip comments for entity and tag balance analysis
  const contentWithoutComments = xmlString.replace(/<!--[\s\S]*?-->/g, '');

  // Check unescaped raw ampersands
  const unescapedAmp = contentWithoutComments.match(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/);
  if (unescapedAmp) {
    throw new Error(`${filename} contains unescaped ampersand at position ${unescapedAmp.index}.`);
  }

  // Basic open/close tag balance for major containers
  const majorTags = ['g', 'defs', 'clipPath', 'text', 'style'];
  for (const tag of majorTags) {
    const openCount = (contentWithoutComments.match(new RegExp(`<${tag}[\\s>]`, 'g')) || []).length;
    const closeCount = (contentWithoutComments.match(new RegExp(`</${tag}>`, 'g')) || []).length;
    if (openCount !== closeCount) {
      throw new Error(`${filename} has mismatched <${tag}> tags (opened: ${openCount}, closed: ${closeCount}).`);
    }
  }
}

async function lint() {
  console.log('🔍 Running profile lint suite...');
  let errors = 0;

  // 1. Lint SVGs in assets
  const assetsDir = path.join(ROOT_DIR, 'assets');
  const files = await fs.readdir(assetsDir);
  const svgFiles = files.filter(f => f.endsWith('.svg'));

  for (const file of svgFiles) {
    const filePath = path.join(assetsDir, file);
    const content = await fs.readFile(filePath, 'utf8');
    const stats = await fs.stat(filePath);

    // Size budget check (< 100 KB)
    if (stats.size > 100 * 1024) {
      console.error(`❌ [SIZE BUDGET] ${file} exceeds 100KB budget: ${(stats.size / 1024).toFixed(1)}KB`);
      errors++;
    }

    try {
      validateXml(content, file);
      console.log(`✓ [XML OK] assets/${file} (${(stats.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`❌ [XML ERROR] assets/${file}: ${err.message}`);
      errors++;
    }
  }

  // 2. Lint README.md local asset links
  const readmePath = path.join(ROOT_DIR, 'README.md');
  try {
    const readme = await fs.readFile(readmePath, 'utf8');
    const localAssetMatches = readme.matchAll(/src=["'](\.\/assets\/[^"']+)["']/g);
    for (const match of localAssetMatches) {
      const assetRelPath = match[1];
      const assetAbsPath = path.resolve(ROOT_DIR, assetRelPath);
      try {
        await fs.access(assetAbsPath);
        console.log(`✓ [LINK RESOLVED] ${assetRelPath}`);
      } catch {
        console.error(`❌ [BROKEN LINK] Local file missing: ${assetRelPath}`);
        errors++;
      }
    }
  } catch (err) {
    console.error(`❌ [README] Could not read README.md: ${err.message}`);
    errors++;
  }

  if (errors > 0) {
    console.error(`\n❌ Lint finished with ${errors} error(s).`);
    process.exit(1);
  } else {
    console.log('\n✨ All SVGs and links validated successfully.');
  }
}

lint().catch(err => {
  console.error('Fatal lint error:', err);
  process.exit(1);
});

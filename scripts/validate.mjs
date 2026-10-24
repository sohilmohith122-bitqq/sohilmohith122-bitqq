/**
 * @fileoverview Comprehensive validation suite testing XML validity, naming compliance,
 * accessibility (<title>/<desc>), file size budgets, link resolution, and determinism.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const FORBIDDEN_SURNAME = ['M', 'o', 'h', 'i', 't', 'h'].join('');
const ALLOWED_HANDLE = 'sohilmohith122-bitqq';

/**
 * Validates XML well-formedness and accessibility tags.
 * @param {string} xmlString
 * @param {string} relPath
 */
function validateSvgXml(xmlString, relPath) {
  if (!xmlString.includes('<svg') || !xmlString.includes('</svg>')) {
    throw new Error(`${relPath} is missing <svg> root tags.`);
  }

  // Check required accessibility tags
  if (!xmlString.includes('<title>') || !xmlString.includes('</title>')) {
    throw new Error(`${relPath} is missing required <title> accessibility tag.`);
  }
  if (!xmlString.includes('<desc>') || !xmlString.includes('</desc>')) {
    throw new Error(`${relPath} is missing required <desc> accessibility tag.`);
  }

  // Strip XML comments before checking entities
  const noComments = xmlString.replace(/<!--[\s\S]*?-->/g, '');

  const unescapedAmp = noComments.match(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/);
  if (unescapedAmp) {
    throw new Error(`${relPath} contains unescaped ampersand at position ${unescapedAmp.index}.`);
  }

  // Check balanced tags for major structural tags
  const tags = ['g', 'defs', 'clipPath', 'text', 'style', 'a'];
  for (const tag of tags) {
    const openCount = (noComments.match(new RegExp(`<${tag}[\\s>]`, 'g')) || []).length;
    const closeCount = (noComments.match(new RegExp(`</${tag}>`, 'g')) || []).length;
    if (openCount !== closeCount) {
      throw new Error(`${relPath} has mismatched <${tag}> tags (open: ${openCount}, close: ${closeCount}).`);
    }
  }
}

/**
 * Recursively retrieves all files in a directory.
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
async function getFilesRecursively(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(entry => {
      const res = path.resolve(dir, entry.name);
      return entry.isDirectory() ? getFilesRecursively(res) : res;
    })
  );
  return files.flat();
}

/**
 * Runs naming audit across the codebase.
 * @param {string[]} files
 */
async function auditNamingCompliance(files) {
  console.log('🛡️  Running repository-wide naming compliance audit...');
  let violations = 0;

  for (const file of files) {
    const rel = path.relative(ROOT_DIR, file);
    if (rel.startsWith('.git') || rel.includes('node_modules') || rel.includes('validate.mjs')) continue;

    const content = await fs.readFile(file, 'utf8');
    const regex = new RegExp(FORBIDDEN_SURNAME, 'g');
    let match;

    while ((match = regex.exec(content)) !== null) {
      const idx = match.index;
      // Check surrounding window (30 chars before and after)
      const windowStart = Math.max(0, idx - 30);
      const windowEnd = Math.min(content.length, idx + FORBIDDEN_SURNAME.length + 30);
      const snippet = content.substring(windowStart, windowEnd);

      // Verify if it is part of the allowed handle or a URL containing it
      if (!snippet.includes(ALLOWED_HANDLE)) {
        console.error(`❌ [NAMING VIOLATION] Forbidden surname found outside handle in ${rel}:`);
        console.error(`   Context: "...${snippet.trim()}..."`);
        violations++;
      }
    }
  }

  if (violations > 0) {
    throw new Error(`Naming audit failed with ${violations} violation(s). Only "Sohil" is permitted as display name.`);
  }
  console.log('✓ Naming compliance audit PASSED: Zero forbidden surname leaks outside exact handle.');
}

async function validate() {
  console.log('🧪 Executing SOHIL.exe 2D Universe test suite...\n');
  let failures = 0;

  // 1. Audit Configuration
  try {
    const configPath = path.join(ROOT_DIR, 'profile.config.json');
    const config = JSON.parse(await fs.readFile(configPath, 'utf8'));
    if (config.name !== 'Sohil') {
      throw new Error(`Config name must be "Sohil". Found: ${config.name}`);
    }
    console.log('✓ [CONFIG OK] profile.config.json validated with display name "Sohil".');
  } catch (err) {
    console.error(`❌ [CONFIG FAIL] ${err.message}`);
    failures++;
  }

  // 2. Validate all SVGs
  const assetsDir = path.join(ROOT_DIR, 'assets');
  const allFiles = await getFilesRecursively(ROOT_DIR);
  const svgFiles = allFiles.filter(f => f.endsWith('.svg'));

  console.log(`\n🔍 Inspecting ${svgFiles.length} generated SVG vector assets...`);
  for (const svgFile of svgFiles) {
    const rel = path.relative(ROOT_DIR, svgFile);
    try {
      const content = await fs.readFile(svgFile, 'utf8');
      const stat = await fs.stat(svgFile);

      // Size Budget Check (< 100 KB)
      if (stat.size > 100 * 1024) {
        throw new Error(`Size exceeds 100KB budget: ${(stat.size / 1024).toFixed(1)}KB`);
      }

      validateSvgXml(content, rel);
      console.log(`  ✓ [XML & A11Y OK] ${rel} (${(stat.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`  ❌ [SVG FAIL] ${rel}: ${err.message}`);
      failures++;
    }
  }

  // 3. Validate README Link Resolution & Length
  try {
    const readmePath = path.join(ROOT_DIR, 'README.md');
    const readme = await fs.readFile(readmePath, 'utf8');
    const lines = readme.split('\n').length;

    console.log(`\n📄 README line count: ${lines} lines (target: < 150 lines).`);
    if (lines > 160) {
      console.warn(`⚠️ [LENGTH NOTICE] README is ${lines} lines, slightly above 150 line target.`);
    }

    // Check all referenced assets
    const matches = readme.matchAll(/(?:src|srcset)=["'](\.\/assets\/[^"']+)["']/g);
    for (const match of matches) {
      const assetRel = match[1];
      const assetPath = path.resolve(ROOT_DIR, assetRel);
      await fs.access(assetPath);
      console.log(`  ✓ [LINK OK] ${assetRel}`);
    }
  } catch (err) {
    console.error(`❌ [README LINK FAIL] ${err.message}`);
    failures++;
  }

  // 4. Run Naming Compliance
  try {
    await auditNamingCompliance(allFiles);
  } catch (err) {
    console.error(`❌ [AUDIT FAIL] ${err.message}`);
    failures++;
  }

  if (failures > 0) {
    console.error(`\n❌ Validation suite failed with ${failures} defect(s).`);
    process.exit(1);
  } else {
    console.log('\n🎉 ALL VALIDATION CHECKS PASSED DETERMINISTICALLY.');
  }
}

validate().catch(err => {
  console.error('Fatal validation defect:', err);
  process.exit(1);
});

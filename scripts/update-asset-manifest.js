const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PUBLIC_IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const MANIFEST_PATH = path.join(__dirname, '..', 'lib', 'asset-manifest.json');

const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg', '.gif']);

function scanDirectory(dir, baseDir = PUBLIC_IMAGES_DIR) {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(scanDirectory(fullPath, baseDir));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (SUPPORTED_EXTENSIONS.has(ext)) {
        const relativeToPublic = path.relative(path.join(baseDir, '..'), fullPath).replace(/\\/g, '/');
        const webPath = '/' + relativeToPublic;
        results.push({ fullPath, webPath });
      }
    }
  }
  return results;
}

function computeFileHash(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(buffer).digest('hex').slice(0, 8);
  } catch (_e) {
    return null;
  }
}

function generateManifest({ quiet = false } = {}) {
  if (!quiet) console.log('--- Generating Asset Manifest for public/images ---');
  const files = scanDirectory(PUBLIC_IMAGES_DIR);

  let existingManifest = {};
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      existingManifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    } catch (_e) {
      existingManifest = {};
    }
  }

  const newManifest = {};
  let updatedCount = 0;
  let newCount = 0;
  let unchangedCount = 0;
  let removedCount = 0;

  // Sort web paths for deterministic output
  files.sort((a, b) => a.webPath.localeCompare(b.webPath));

  for (const { fullPath, webPath } of files) {
    const hash = computeFileHash(fullPath);
    if (!hash) continue;
    newManifest[webPath] = hash;

    if (!existingManifest[webPath]) {
      console.log(`[ASSET NEW] ${webPath} -> v=${hash}`);
      newCount++;
    } else if (existingManifest[webPath] !== hash) {
      console.log(`[ASSET UPDATED] ${webPath}: v=${existingManifest[webPath]} -> v=${hash}`);
      updatedCount++;
    } else {
      unchangedCount++;
    }
  }

  // Check for deleted files
  for (const oldPath of Object.keys(existingManifest)) {
    if (!newManifest[oldPath]) {
      console.log(`[ASSET REMOVED] ${oldPath}`);
      removedCount++;
    }
  }

  const hasChanges = newCount > 0 || updatedCount > 0 || removedCount > 0 || !fs.existsSync(MANIFEST_PATH);

  if (hasChanges) {
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(newManifest, null, 2) + '\n', 'utf8');
    console.log(`Manifest updated at lib/asset-manifest.json (${files.length} assets)`);
  } else if (!quiet) {
    console.log(`Manifest is up to date (${files.length} assets, no changes)`);
  }

  if (!quiet) console.log('----------------------------------------------------');
  return { hasChanges, newCount, updatedCount, removedCount, total: files.length };
}

if (require.main === module) {
  generateManifest();
}

module.exports = {
  generateManifest,
  computeFileHash,
  scanDirectory,
  PUBLIC_IMAGES_DIR,
  MANIFEST_PATH,
  SUPPORTED_EXTENSIONS
};

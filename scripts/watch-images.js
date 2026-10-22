const fs = require('fs');
const path = require('path');
const { generateManifest, PUBLIC_IMAGES_DIR, SUPPORTED_EXTENSIONS } = require('./update-asset-manifest');

let debounceTimer = null;
const DEBOUNCE_MS = 200;

function handleFileChange(event, filename) {
  if (!filename) return;
  const ext = path.extname(filename).toLowerCase();
  if (ext && !SUPPORTED_EXTENSIONS.has(ext)) return;

  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    debounceTimer = null;
    try {
      const res = generateManifest({ quiet: true });
      if (res.hasChanges) {
        console.log(`[WATCHER] Detected image change (${filename || 'asset'}). Manifest refreshed.`);
      }
    } catch (err) {
      console.error('[WATCHER] Error refreshing manifest:', err.message);
    }
  }, DEBOUNCE_MS);
}

function startWatching() {
  if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
    console.warn('[WATCHER] Warning: public/images directory not found.');
    return null;
  }

  // Initial pass on start
  generateManifest({ quiet: false });

  console.log('[WATCHER] Watching public/images for added, replaced, or deleted images...');
  const watcher = fs.watch(PUBLIC_IMAGES_DIR, { recursive: true }, (event, filename) => {
    handleFileChange(event, filename);
  });

  watcher.on('error', (err) => {
    console.error('[WATCHER] Watch error:', err.message);
  });

  return watcher;
}

if (require.main === module) {
  startWatching();
}

module.exports = { startWatching };

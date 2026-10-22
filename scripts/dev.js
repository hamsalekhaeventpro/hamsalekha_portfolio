const { spawn } = require('child_process');
const { startWatching } = require('./watch-images');

// 1. Start the image file watcher (performs initial manifest check synchronously)
const watcher = startWatching();

// 2. Launch Next.js dev server with inherited arguments
const args = process.argv.slice(2);
const nextCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';

const nextProcess = spawn(nextCmd, ['next', 'dev', ...args], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

function cleanup() {
  if (watcher) {
    try {
      watcher.close();
    } catch (_e) {}
  }
  if (nextProcess && !nextProcess.killed) {
    try {
      if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', String(nextProcess.pid), '/f', '/t'], { shell: true });
      } else {
        nextProcess.kill('SIGTERM');
      }
    } catch (_e) {}
  }
}

process.on('SIGINT', () => {
  cleanup();
  process.exit(0);
});

process.on('SIGTERM', () => {
  cleanup();
  process.exit(0);
});

process.on('exit', () => {
  cleanup();
});

nextProcess.on('exit', (code) => {
  if (watcher) {
    try {
      watcher.close();
    } catch (_e) {}
  }
  process.exit(code || 0);
});

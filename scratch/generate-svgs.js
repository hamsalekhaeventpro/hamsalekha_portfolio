const fs = require('fs');
const path = require('path');
const http = require('http');

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'services', path: '/services' },
  { name: 'signature-sets', path: '/signature-sets' },
  { name: 'the-vault', path: '/the-vault' },
  { name: 'how-we-work', path: '/how-we-work' },
  { name: 'portfolio', path: '/portfolio' },
  { name: 'contact', path: '/contact' }
];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 4500 },
  { name: 'tablet', width: 834, height: 5000 },
  { name: 'mobile', width: 390, height: 6000 }
];

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function processHtml(html) {
  // Remove doctype
  html = html.replace(/<!DOCTYPE html>/i, '');
  
  // Remove script tags
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Inject html namespace
  html = html.replace(/<html([^>]*)>/, '<html xmlns="http://www.w3.org/1999/xhtml"$1>');
  
  // Inject SVG namespaces only if missing
  html = html.replace(/<svg([^>]*)>/g, (match, attrs) => {
    if (attrs.includes('xmlns')) return match;
    return `<svg xmlns="http://www.w3.org/2000/svg"${attrs}>`;
  });
  
  // Clean up next/image
  // 1. Remove srcset completely to force fallback to src
  html = html.replace(/\s+srcSet="[^"]*"/g, '');
  html = html.replace(/\s+srcset="[^"]*"/g, '');
  
  // 2. Decode next/image URLs to normal URLs
  // src="/_next/image?url=%2Fimages%2Fhero.jpg&amp;w=3840&amp;q=95"
  html = html.replace(/src="\/_next\/image\?url=([^&"]+)&[^"]+"/g, (match, urlParam) => {
    try {
      const decoded = decodeURIComponent(urlParam);
      return `src="${decoded}"`;
    } catch(e) {
      return match;
    }
  });

  // 3. Rewrite all /images/... to absolute local files
  html = html.replace(/(src|href|url\()(["']?)\/images\//g, '$1$2file:///D:/hamsalekha-portfolio/public/images/');

  // Fetch and inline CSS
  const cssRegex = /<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g;
  let match;
  let cssContent = '';
  // Needs to be done safely because exec moves index
  const links = [];
  while ((match = cssRegex.exec(html)) !== null) {
    links.push({ full: match[0], url: match[1] });
  }
  
  for (const link of links) {
    let cssUrl = link.url.split('?')[0];
    if (cssUrl.startsWith('/')) {
      try {
        const css = await fetchUrl('http://localhost:3000' + cssUrl);
        cssContent += css + '\n';
      } catch (e) {
        console.error('Failed to fetch CSS:', cssUrl);
      }
    }
    html = html.replace(link.full, '');
  }
  
  // Add base style and injected CSS
  const injectedStyles = `
    html, body { margin: 0; padding: 0; width: 100%; min-height: 100%; overflow-x: hidden; }
    ::-webkit-scrollbar { display: none; }
    ${cssContent}
  `;
  html = html.replace('</head>', `<style type="text/css"><![CDATA[\n${injectedStyles}\n]]></style></head>`);
  
  // Wrap any other existing <style> tags in CDATA
  html = html.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, (match, attrs, content) => {
    // avoid double CDATA
    if (content.includes('<![CDATA[')) return match;
    return `<style${attrs}><![CDATA[${content}]]></style>`;
  });
  
  return html;
}

async function generate() {
  const baseDir = path.join(__dirname, '../design-reference');
  if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir);

  for (const page of PAGES) {
    const pageDir = path.join(baseDir, page.name);
    if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir);

    console.log(`Fetching ${page.name}...`);
    let rawHtml = await fetchUrl(`http://localhost:3000${page.path}`);
    let cleanHtml = await processHtml(rawHtml);

    for (const vp of VIEWPORTS) {
      const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${vp.width}" height="${vp.height}" viewBox="0 0 ${vp.width} ${vp.height}">
  <metadata>
    <page>${page.path}</page>
    <viewport>${vp.width}px</viewport>
    <generationDate>${new Date().toISOString()}</generationDate>
    <source>current implementation</source>
  </metadata>
  <g id="header">
    <!-- Preserved semantic structure: Header is visually rendered inside the embedded foreignObject HTML -->
  </g>
  <g id="page-content">
    <foreignObject width="100%" height="100%">
      ${cleanHtml}
    </foreignObject>
  </g>
  <g id="footer">
    <!-- Preserved semantic structure: Footer is visually rendered inside the embedded foreignObject HTML -->
  </g>
</svg>`;
      fs.writeFileSync(path.join(pageDir, `${vp.name}.svg`), svg);
    }
  }
  console.log('All SVGs generated successfully!');
}

generate().catch(console.error);

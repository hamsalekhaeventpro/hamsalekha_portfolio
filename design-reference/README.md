# Hamsalekha Event Production - SVG Design References

This directory contains static SVG visual snapshots of the currently implemented website across 8 core pages and 3 viewports. 

## Reference Index

| Page | Desktop SVG | Tablet SVG | Mobile SVG |
|------|--------------|-------------|------------|
| Home | [desktop.svg](./home/desktop.svg) | [tablet.svg](./home/tablet.svg) | [mobile.svg](./home/mobile.svg) |
| About | [desktop.svg](./about/desktop.svg) | [tablet.svg](./about/tablet.svg) | [mobile.svg](./about/mobile.svg) |
| Services | [desktop.svg](./services/desktop.svg) | [tablet.svg](./services/tablet.svg) | [mobile.svg](./services/mobile.svg) |
| Signature Sets | [desktop.svg](./signature-sets/desktop.svg) | [tablet.svg](./signature-sets/tablet.svg) | [mobile.svg](./signature-sets/mobile.svg) |
| The Vault | [desktop.svg](./the-vault/desktop.svg) | [tablet.svg](./the-vault/tablet.svg) | [mobile.svg](./the-vault/mobile.svg) |
| How We Work | [desktop.svg](./how-we-work/desktop.svg) | [tablet.svg](./how-we-work/tablet.svg) | [mobile.svg](./how-we-work/mobile.svg) |
| Portfolio | [desktop.svg](./portfolio/desktop.svg) | [tablet.svg](./portfolio/tablet.svg) | [mobile.svg](./portfolio/mobile.svg) |
| Contact | [desktop.svg](./contact/desktop.svg) | [tablet.svg](./contact/tablet.svg) | [mobile.svg](./contact/mobile.svg) |

## Documentation

### Viewport Dimensions
- **Desktop**: `1440px` wide
- **Tablet**: `834px` wide
- **Mobile**: `390px` wide
*(Note: Heights are set generously to accommodate full-page scrolling content, ensuring the entire page from header to footer is captured within the SVG bounding box).*

### Assets Used
The SVGs directly embed the live Next.js HTML DOM structure via `<foreignObject>` tags, utilizing inline compiled CSS extracted from the active development server.
Image assets are hard-linked via absolute file URI paths (`file:///D:/hamsalekha-portfolio/public/images/...`) to bypass Next.js image optimization (`/_next/image`) dependencies and ensure they render fully when the SVG is opened locally in a web browser.

### Missing Assets
- `/images/about/founder.jpg` is actively missing from the source repository and thus could not be resolved or rendered in the About SVGs.

### Reproduction Limitations
- **Animation States**: The snapshots capture the static, initial page load state (i.e. `opacity: 0` or translated positions for elements utilizing `RevealOnScroll` prior to intersection). Since SVG `<foreignObject>` does not execute JavaScript intersection observers, scrolled animations remain in their pre-revealed static state. 
- **Software Compatibility**: Because these are high-fidelity structural SVGs utilizing `<foreignObject>` to flawlessly map the HTML/CSS box-model, they must be opened in a modern web browser (Chrome, Edge, Firefox, Safari) for perfect visual 1:1 rendering. Vector editing software (Illustrator, Figma) does not support `<foreignObject>` HTML/CSS rendering engines and will not display the layout correctly.

### Implementation Discrepancies
- The overall layout perfectly mirrors `http://localhost:3000`. No structural differences exist between these snapshots and the live Next.js codebase as of the generation date.

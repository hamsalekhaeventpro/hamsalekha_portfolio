import re

files = ['Home.svg', 'about1.svg', 'services.svg', 'portfolio.svg', 'signature_set.svg', 'vault1.svg', 'contact1.svg', 'work.svg']
for fname in files:
    path = 'figma pdfs/' + fname
    try:
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read(2000000)
        
        # Extract viewBox / canvas size
        vb = re.search(r'viewBox="([^"]+)"', content)
        w = re.search(r'<svg[^>]+width="([^"]+)"', content)
        h = re.search(r'<svg[^>]+height="([^"]+)"', content)
        
        # Count images / rect elements
        img_count = len(re.findall(r'<image ', content))
        rect_count = len(re.findall(r'<rect ', content))
        text_count = len(re.findall(r'<text ', content))
        path_count = len(re.findall(r'<path ', content))
        
        # Get all fill colors used
        colors = re.findall(r'fill="(#[A-Fa-f0-9]{6})"', content)
        ucolors = list(dict.fromkeys(colors))
        
        # Get stroke colors
        strokes = re.findall(r'stroke="(#[A-Fa-f0-9]{6})"', content)
        ustrokes = list(dict.fromkeys(strokes))
        
        # Extract font sizes / families from style attrs
        font_sizes = re.findall(r'font-size:([^;px"]+)', content)
        font_sizes = list(dict.fromkeys(font_sizes))[:15]
        font_families = re.findall(r'font-family:([^;"]+)', content)
        font_families = list(dict.fromkeys(font_families))[:10]
        
        # Get text content
        tspans = re.findall(r'<tspan[^>]*>([^<]+)<', content)
        text_content = re.findall(r'<text[^>]*>([^<]+)<', content)
        all_text = tspans + text_content
        all_text = [t.strip() for t in all_text if t.strip() and len(t.strip()) > 1]
        
        print(f'=== {fname} ===')
        print(f'  Canvas: viewBox={vb.group(1) if vb else "?"}, w={w.group(1) if w else "?"}, h={h.group(1) if h else "?"}')
        print(f'  Elements: images={img_count}, rects={rect_count}, texts={text_count}, paths={path_count}')
        print(f'  Fill colors: {", ".join(ucolors)}')
        print(f'  Stroke colors: {", ".join(ustrokes)}')
        print(f'  Font sizes: {", ".join(font_sizes)}')
        print(f'  Font families: {", ".join(font_families)}')
        if all_text:
            print(f'  Text content ({len(all_text)} items):')
            for t in all_text[:60]:
                print(f'    "{t}"')
        print()
    except Exception as e:
        print(f'Error with {fname}: {e}')

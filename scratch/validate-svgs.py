import os
import xml.etree.ElementTree as ET

pages = [
    'home', 'about', 'services', 'signature-sets', 
    'the-vault', 'how-we-work', 'portfolio', 'contact'
]
viewports = ['desktop.svg', 'tablet.svg', 'mobile.svg']
base_dir = r"D:\hamsalekha-portfolio\design-reference"

broken_files = []
total = 0
valid = 0

print("SVG VALIDATION\n")

for page in pages:
    print(f"{page.replace('-', ' ').title()}")
    for vp in viewports:
        file_path = os.path.join(base_dir, page, vp)
        total += 1
        
        # Check existence
        if not os.path.exists(file_path):
            print(f"- {vp}: FAIL (Missing)")
            broken_files.append((file_path, "File does not exist"))
            continue
            
        # Check non-zero size
        size = os.path.getsize(file_path)
        if size == 0:
            print(f"- {vp}: FAIL (Empty file)")
            broken_files.append((file_path, "File is empty"))
            continue
            
        # Parse XML
        try:
            tree = ET.parse(file_path)
            root = tree.getroot()
            
            # Check basic structure
            if not root.tag.endswith('svg'):
                raise Exception("Root element is not svg")
                
            if 'width' not in root.attrib or 'height' not in root.attrib or 'viewBox' not in root.attrib:
                raise Exception("Missing width, height, or viewBox attributes")
                
            print(f"- {vp}: PASS")
            valid += 1
        except Exception as e:
            print(f"- {vp}: FAIL ({str(e)})")
            broken_files.append((file_path, str(e)))

print(f"\nTOTAL:\n{valid}/{total} VALID XML")

if broken_files:
    print("\nBROKEN FILES:")
    for path, err in broken_files:
        print(f"{path} - {err}")
else:
    print("\nBROKEN FILES:\nNone")

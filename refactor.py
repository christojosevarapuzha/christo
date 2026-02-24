import re
import os

html_path = 'src/main/resources/templates/index.html'
css_path = 'src/main/resources/static/css/style.css'
js_path = 'src/main/resources/static/js/main.js'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract standard style blocks
styles = re.findall(r'<style>(.*?)</style>', content, flags=re.DOTALL)
css_content = '\n'.join(styles).strip()

# Extract script blocks (excluding tailwind CDN / matter JS / external src scripts)
# Only grab scripts that don't have 'src' or 'tailwind' in them
scripts = []
for m in re.finditer(r'<script([^>]*)>(.*?)</script>', content, flags=re.DOTALL):
    attrs = m.group(1)
    body = m.group(2)
    if 'src=' not in attrs and 'tailwind.config' not in body:
        scripts.append(body.strip())

js_content = '\n\n'.join(scripts).strip()

# Write to new files
os.makedirs(os.path.dirname(css_path), exist_ok=True)
os.makedirs(os.path.dirname(js_path), exist_ok=True)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css_content)

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

# Replace in HTML
# Remove all style blocks
content = re.sub(r'<style>.*?</style>', '', content, flags=re.DOTALL)
# Insert the link to stylesheet in the head (before </head>)
content = content.replace('</head>', '    <link rel="stylesheet" href="/css/style.css">\n</head>')

# Remove all inline script blocks we extracted
for script_body in scripts:
    content = content.replace(f'<script>{script_body}</script>\n', '')
    content = content.replace(f'<script>\n{script_body}\n</script>', '')
    # More robust removal:
    content = re.sub(r'<script>\s*' + re.escape(script_body) + r'\s*</script>', '', content, flags=re.DOTALL)

# Add the main.js script before closing body
content = content.replace('</body>', '    <script src="/js/main.js"></script>\n</body>')

# Write back to index.html
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Refactoring complete.")

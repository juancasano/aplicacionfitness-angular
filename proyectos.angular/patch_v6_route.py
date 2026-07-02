from pathlib import Path

path = Path('aplicaciontfitness.angular/src/app/app.routes.ts')
text = path.read_text()
old = "  { path: 'v4', component: AppV4 },\n  { path: 'v5a', component: AppV5a },\n  { path: 'v5b', component: AppV5b }\n];\n"
new = "  { path: 'v4', component: AppV4 },\n  { path: 'v5a', component: AppV5a },\n  { path: 'v5b', component: AppV5b },\n  { path: 'v6', component: AppV6 }\n];\n"
if old not in text:
    raise SystemExit('Expected text block not found. Actual content:\n' + text)
path.write_text(text.replace(old, new))
print('patched app.routes.ts')

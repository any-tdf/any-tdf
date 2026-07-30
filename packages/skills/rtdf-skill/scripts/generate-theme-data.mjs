import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDir, '..');
const rtdfRoot = path.resolve(packageRoot, '../..');
const anyRoot = path.resolve(rtdfRoot, '..');

const sourcePath = path.join(anyRoot, 'packages/common/src/theme/plugin.ts');
const source = readFileSync(sourcePath, 'utf-8');
const startMarker = 'const builtInThemes: ThemeConfig[] = [';
const start = source.indexOf(startMarker);
const arrayStart = source.indexOf('[', start);
const arrayEnd = source.indexOf('\n];', arrayStart) + 2;
const arrayText = source.slice(arrayStart, arrayEnd);
const themes = new Function(`return ${arrayText};`)();

writeFileSync(path.join(packageRoot, 'skill/data/themes.json'), `${JSON.stringify(themes, null, '\t')}\n`, 'utf-8');
console.log(`Generated ${themes.length} themes.`);

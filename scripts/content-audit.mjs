import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const dataDir = path.resolve(projectRoot, 'src/data');

const MARKER_STR = '[CONTENT TO BE VERIFIED]';
const MARKER_VAR = 'CONTENT_TO_BE_VERIFIED_MARKER';

console.log('\n================================================================');
console.log('  CLINICAL CONTENT VERIFICATION AUDIT — DR. SOUMYA SENGUPTA');
console.log('================================================================\n');

if (!fs.existsSync(dataDir)) {
  console.error(`Data directory not found at: ${dataDir}`);
  process.exit(1);
}

const files = fs.readdirSync(dataDir).filter((f) => f.endsWith('.ts') || f.endsWith('.tsx'));
const findings = [];

for (const file of files) {
  const filePath = path.join(dataDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Exclude the import / export statements
    if (
      (line.includes(MARKER_STR) || line.includes(MARKER_VAR)) &&
      !line.includes('import { CONTENT_TO_BE_VERIFIED_MARKER') &&
      !line.includes('export { CONTENT_TO_BE_VERIFIED_MARKER') &&
      !line.includes('export const CONTENT_TO_BE_VERIFIED_MARKER') &&
      !line.trim().startsWith('*') &&
      !line.trim().startsWith('//')
    ) {
      findings.push({
        file: `src/data/${file}`,
        line: index + 1,
        snippet: line.trim().slice(0, 95),
      });
    }
  });
}

if (findings.length === 0) {
  console.log('✓ All clinical data has been formally verified. Zero placeholders detected.\n');
} else {
  console.log(
    `⚠️  Detected ${findings.length} registered placeholder instances across clinical data files:\n`
  );
  findings.forEach((item, idx) => {
    console.log(`  [${idx + 1}] ${item.file}:${item.line}`);
    console.log(`      Content: ${item.snippet}`);
  });
  console.log('\n----------------------------------------------------------------');
  console.log(`Total Pending Items: ${findings.length}`);
  console.log('Action: Review each flagged credential/logistics item before Phase 5 deployment.');
  console.log('----------------------------------------------------------------\n');
}

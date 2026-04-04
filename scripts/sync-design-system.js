#!/usr/bin/env node

/**
 * Design System Sync Utility
 * 
 * Syncs changes from design/design-system.json to the codebase
 * Ensures components and configurations match the design system
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Read design system
const designSystemPath = path.join(rootDir, 'design/design-system.json');
if (!fs.existsSync(designSystemPath)) {
  console.error('❌ design/design-system.json not found!');
  process.exit(1);
}

const designSystem = JSON.parse(fs.readFileSync(designSystemPath, 'utf-8'));

console.log('🎨 Olive Green Martinborough Design System - Sync Utility\n');
console.log(`📋 Source: design/design-system.json (v${designSystem.meta.version})\n`);

// Validate and sync Tailwind config
console.log('✅ Syncing Tailwind configuration...');
const tailwindConfigPath = path.join(rootDir, 'tailwind.config.js');
const tailwindConfigContent = fs.readFileSync(tailwindConfigPath, 'utf-8');

const colors = designSystem.colors;
const expectedColors = {
  'olive-green': colors.core.oliveGreen.value,
  'warm-off-white': colors.core.warmOffWhite.value,
  'soft-charcoal': colors.core.softCharcoal.value,
  'deep-olive': colors.core.deepOlive.value,
  'muted-gold': colors.accent.mutedGold.value,
  'white': colors.utility.white.value,
};

let colorErrors = [];
Object.entries(expectedColors).forEach(([name, value]) => {
  if (!tailwindConfigContent.includes(`'${name}': '${value}'`)) {
    colorErrors.push(`Missing or incorrect: ${name} = ${value}`);
  }
});

if (colorErrors.length > 0) {
  console.log('⚠️  Color mismatches found:');
  colorErrors.forEach(err => console.log(`   ${err}`));
  console.log('   Run: npm run generate:tailwind to fix');
} else {
  console.log('   ✓ Colors are correctly configured');
}

// Validate spacing
console.log('\n✅ Validating spacing...');
const spacing = designSystem.spacing.scale;
let spacingErrors = [];
Object.entries(spacing).forEach(([name, config]) => {
  const value = config.value || config;
  if (!tailwindConfigContent.includes(`'${name}': '${value}'`)) {
    spacingErrors.push(`Missing or incorrect: ${name} = ${value}`);
  }
});

if (spacingErrors.length > 0) {
  console.log('⚠️  Spacing mismatches found:');
  spacingErrors.forEach(err => console.log(`   ${err}`));
  console.log('   Run: npm run generate:tailwind to fix');
} else {
  console.log('   ✓ Spacing values are correctly configured');
}

// Validate font families
console.log('\n✅ Validating font families...');
const fonts = designSystem.typography.fontFamilies;
let fontErrors = [];
Object.entries(fonts).forEach(([name, config]) => {
  const family = config.family || config;
  if (!tailwindConfigContent.includes(`'${name}'`)) {
    fontErrors.push(`Missing font family: ${name}`);
  }
});

if (fontErrors.length > 0) {
  console.log('⚠️  Font family mismatches found:');
  fontErrors.forEach(err => console.log(`   ${err}`));
  console.log('   Run: npm run generate:tailwind to fix');
} else {
  console.log('   ✓ Font families are correctly configured');
}

// Summary
const totalErrors = colorErrors.length + spacingErrors.length + fontErrors.length;
if (totalErrors === 0) {
  console.log('\n✨ All validations passed! Design system is in sync.');
  console.log('\n📝 Next steps:');
  console.log('   - Components should match design-system.json specifications');
  console.log('   - Use design-system.json as reference when building features');
} else {
  console.log(`\n⚠️  Found ${totalErrors} validation error(s).`);
  console.log('   Run: npm run generate:tailwind to sync Tailwind config');
  process.exit(1);
}

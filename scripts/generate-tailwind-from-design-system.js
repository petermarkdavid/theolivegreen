#!/usr/bin/env node

/**
 * Generate Tailwind Config from Design System
 * 
 * Generates tailwind.config.js from design/design-system.json
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

const colors = designSystem.colors;
const spacing = designSystem.spacing.scale;
const fonts = designSystem.typography.fontFamilies;

// Generate Tailwind config
const tailwindConfig = `/** @type {import('tailwindcss').Config} */
// This file is generated from design/design-system.json - DO NOT EDIT MANUALLY
// Run: npm run generate:tailwind
// Source of truth: design/design-system.json
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'olive-green': '${colors.core.oliveGreen.value}',
        'warm-off-white': '${colors.core.warmOffWhite.value}',
        'soft-charcoal': '${colors.core.softCharcoal.value}',
        'deep-olive': '${colors.core.deepOlive.value}',
        'muted-gold': '${colors.accent.mutedGold.value}',
        'white': '${colors.utility.white.value}',
      },
      fontFamily: {
        'serif': ['serif'],
        'sans': ['sans-serif'],
        'modern': ${JSON.stringify(fonts.modern.family.split(', '))},
      },
      spacing: {
        'xs': '${spacing.xs.value || spacing.xs}',
        'sm': '${spacing.sm.value || spacing.sm}',
        'md': '${spacing.md.value || spacing.md}',
        'lg': '${spacing.lg.value || spacing.lg}',
        'xl': '${spacing.xl.value || spacing.xl}',
        '2xl': '${spacing['2xl'].value || spacing['2xl']}',
        '3xl': '${spacing['3xl'].value || spacing['3xl']}',
        '4xl': '${spacing['4xl'].value || spacing['4xl']}',
      },
    },
  },
  plugins: [],
}
`;

// Write config file
const outputPath = path.join(rootDir, 'tailwind.config.js');
fs.writeFileSync(outputPath, tailwindConfig, 'utf-8');

console.log('✅ Generated tailwind.config.js from design/design-system.json');
console.log('   Design system is the source of truth!');

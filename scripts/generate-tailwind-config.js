#!/usr/bin/env node

/**
 * Generate Tailwind Config from Design System
 * 
 * This script generates a Tailwind config file from design.json
 * ensuring the design system is the single source of truth.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Read design system
const designSystemPath = path.join(rootDir, 'design.json');
const designSystem = JSON.parse(fs.readFileSync(designSystemPath, 'utf-8'));

const config = designSystem.designSystem.implementation.tailwindConfig;

// Generate Tailwind config
const tailwindConfig = `/** @type {import('tailwindcss').Config} */
// This file is generated from design.json - DO NOT EDIT MANUALLY
// Run: npm run generate:tailwind-config
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'olive-green': '${config.colors['olive-green']}',
        'golden-yellow': '${config.colors['golden-yellow']}',
        'light-blue': '${config.colors['light-blue']}',
        'deep-purple': '${config.colors['deep-purple']}',
      },
      fontFamily: {
        'serif': ['serif'],
        'sans': ['sans-serif'],
        'modern': ${JSON.stringify(config.fontFamily.modern)},
      },
      spacing: {
        'xs': '${config.spacing.xs}',
        'sm': '${config.spacing.sm}',
        'md': '${config.spacing.md}',
        'lg': '${config.spacing.lg}',
        'xl': '${config.spacing.xl}',
        '2xl': '${config.spacing['2xl']}',
        '3xl': '${config.spacing['3xl']}',
        '4xl': '${config.spacing['4xl']}',
      },
    },
  },
  plugins: [],
}
`;

// Write config file
const outputPath = path.join(rootDir, 'tailwind.config.js');
fs.writeFileSync(outputPath, tailwindConfig, 'utf-8');

console.log('✅ Generated tailwind.config.js from design.json');
console.log('   Design system is the source of truth!');

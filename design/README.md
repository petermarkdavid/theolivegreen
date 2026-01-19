# Design System Documentation

## Overview

The `design-system.json` file in this folder is the **single source of truth** for all design decisions in The Olive Green application.

## Purpose

This design system provides:
- **Exact styling specifications** for all components
- **Complete component APIs** with props and usage
- **Design principles** and guidelines
- **Color palette** with exact values and usage
- **Typography scale** with Tailwind classes
- **Spacing system** with exact values
- **Layout patterns** and responsive guidelines

## For AI and Developers

**ALWAYS reference `design-system.json` when:**
- Building new features
- Creating new components
- Modifying existing components
- Making design decisions
- Styling elements

## File Structure

```
design/
  ├── design-system.json    # Main design system file (SOURCE OF TRUTH)
  └── README.md              # This file
```

## Usage

### When Building Features

1. **Read `design-system.json`** first
2. Use exact Tailwind classes specified in component implementations
3. Follow component props API exactly
4. Maintain spacing and color consistency
5. Apply design principles

### When Making Design Changes

1. **Update `design-system.json`** first
2. Run `npm run sync:design-system` to validate
3. Run `npm run generate:tailwind` if colors/spacing/fonts changed
4. Update component files to match new specifications
5. Test changes

## Sync Scripts

- `npm run sync:design-system` - Validates and syncs design system
- `npm run generate:tailwind` - Generates Tailwind config from design system
- `npm run validate:design-system` - Validates codebase matches design system

## Key Sections

### Colors
All colors are defined with exact hex values and usage guidelines.

### Typography
Font families, scales, and exact Tailwind classes for all text styles.

### Components
Complete specifications for every component including:
- Props API
- Exact Tailwind classes
- Usage examples
- File locations

### Spacing
Consistent spacing scale with exact pixel values.

### Layout
Layout patterns and responsive guidelines.

## Important Notes

- **Never create custom colors** outside the palette
- **Never use arbitrary spacing values** - use the scale
- **Never modify components** without updating design-system.json
- **Always use exact Tailwind classes** specified in the design system

## Questions?

Refer to `design-system.json` - it contains comprehensive specifications for everything.

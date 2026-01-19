# The Olive Green Design System

## Source of Truth

**`design.json` is the single source of truth** for all design decisions in this project. All configurations, components, and styling should align with the specifications in this file.

## Using the Design System

### Validation

To ensure your configurations match the design system:

```bash
npm run sync:design
```

This validates that:
- Tailwind colors match design.json
- Spacing values match design.json
- Font families match design.json

### Generating Configurations

To generate `tailwind.config.js` from `design.json`:

```bash
npm run generate:tailwind
```

This ensures your Tailwind configuration is always in sync with the design system.

## Design System Structure

### Colors

All colors are defined in `design.json` under `colorPalette`:

- **olive-green** (#6B8E23) - Primary background
- **golden-yellow** (#d4af37) - Logo and accents
- **light-blue** (#e8f4f8) - Content sections
- **deep-purple** (#4a2c5a) - Accents and gradients

### Typography

Font families and scales are defined in `typography`:

- **modern** - Logo font stack (system fonts)
- **sansSerif** - Body text and UI elements

### Spacing

Spacing scale is defined in `spacing.scale`:

- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px
- 4xl: 96px

### Components

All component specifications, including:
- Props and API
- Tailwind class mappings
- Variants and states
- Usage guidelines

Are documented in `design.json` under `components`.

## Making Changes

When making design changes:

1. **Update `design.json` first** - This is the source of truth
2. Run `npm run sync:design` to validate
3. Run `npm run generate:tailwind` if you changed colors, spacing, or fonts
4. Update components to match the new specifications

## Component Development

When creating or updating components:

1. Check `design.json` for component specifications
2. Use the exact Tailwind classes specified in `components.{componentName}.tailwindClasses`
3. Follow the props API defined in `components.{componentName}.props`
4. Ensure variants match the design system

## Design Principles

The design system follows these principles:

1. **Nature First** - Connection to natural elements
2. **Quality** - Premium feel without pretension
3. **Approachability** - Welcoming and accessible
4. **Clarity** - Clear communication and hierarchy
5. **Breathing Room** - Generous spacing

All principles are documented in `design.json` under `designPrinciples`.

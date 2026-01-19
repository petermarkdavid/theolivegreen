# The Olive Green Design System

A comprehensive design system implementation built with React, Vite, and Tailwind CSS v3.

## Source of Truth

**`design/design-system.json` is the single source of truth** for all design decisions. This comprehensive file contains exact styling specifications, component APIs, and design guidelines for AI and developers.

See [design/README.md](./design/README.md) for details on using and maintaining the design system.

## Features

- Complete design system with all UI components
- Tailwind CSS v3 configuration matching design.json specifications
- Responsive design following the design principles
- Component showcase dashboard

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Design System Utilities

```bash
# Sync and validate design system (from design/design-system.json)
npm run sync:design-system

# Generate tailwind.config.js from design-system.json
npm run generate:tailwind

# Validate codebase matches design system
npm run validate:design-system
```

**Important:** Always reference `design/design-system.json` when building features. It contains exact styling specifications for all components.

## Design System Components

The design system includes:

- **Header** - Full-width navigation with logo, announcement, and user actions
- **Hero** - Large impactful section with background image and text overlay
- **Content Section** - Split layout sections with headings and body text
- **Buttons** - Primary, accent, and secondary variants
- **Icons** - Simple, clean line icons (cart, user, menu, close, arrow)
- **Text Blocks** - Typography components with various heading sizes
- **Cards** - Default, elevated, and dark variants
- **Navigation** - Uppercase navigation links with hover states
- **Cart Icon** - Shopping cart with count badge

## Color Palette

- **Olive Green** (#6B8E23) - Primary background (OliveDrab)
- **Golden Yellow** (#d4af37) - Logo and accents
- **Light Blue** (#e8f4f8) - Content sections
- **Deep Purple** (#4a2c5a) - Accents and depth
- **White** (#ffffff) - Text on dark backgrounds
- **Black** (#000000) - Text on light backgrounds

## Typography

- **Serif** - Logo and brand name
- **Sans-serif** - All other text (navigation, headings, body)

## Design Principles

- Nature First
- Quality
- Approachability
- Clarity
- Breathing Room

## Project Structure

```
src/
  components/
    Header.jsx
    Hero.jsx
    Button.jsx
    Navigation.jsx
    ContentSection.jsx
    Icon.jsx
    TextBlock.jsx
    Card.jsx
    CartIcon.jsx
    Logo.jsx
  App.jsx
  main.jsx
  index.css
```

# Olive Green Martinborough

A premium olive oil brand website built with React, Vite, and Tailwind CSS. This site showcases the brand's commitment to quality, tradition, and the grove through a clean, editorial design system.

## 🌐 Live Site

**Website:** [https://petermarkdavid.github.io/theolivegreen/](https://petermarkdavid.github.io/theolivegreen/)

## ✨ Features

- **Multi-page website** with React Router
- **Premium design system** following brand guidelines
- **Responsive design** optimized for all devices
- **Modern stack**: React 18, Vite, Tailwind CSS v3
- **GitHub Pages** deployment ready

## 📄 Pages

- **Homepage** - Hero section, featured products, and grove visit information
- **Shop** - Product listings with pricing and cart functionality
- **Accommodation** - Room listings and booking information
- **Harvest** - Harvest story, timeline, and tasting notes
- **About** - Brand story, values, and contact information

## 🎨 Design System

The design system is documented in `design/design-system.json` and serves as the single source of truth for all styling decisions.

### Color Palette
- **Olive Green** (#6B8E23) - Primary brand color
- **Warm Off-White** (#FAF8F3) - Main background
- **Soft Charcoal** (#2C2C2C) - Primary text
- **Deep Olive** (#3D4A2E) - Accent sections
- **Muted Gold** (#C9A961) - Logo and highlights

### Typography
- **Modern Sans-Serif** - Logo only
- **Sans-Serif** - All other text
- Editorial hierarchy with sentence case headings

### Design Principles
- **Restraint** - Minimal, intentional design choices
- **Provenance** - Rooted in the grove and tradition
- **Editorial** - Clear content hierarchy
- **Craft** - Quality and attention to detail

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/petermarkdavid/theolivegreen.git
cd theolivegreen

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# The site will be available at http://localhost:5173
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Build and deploy to GitHub Pages
- `npm run sync:design-system` - Validate design system sync
- `npm run generate:tailwind` - Generate Tailwind config from design system

## 🎯 Design System Management

The design system is the single source of truth. When making changes:

1. Update `design/design-system.json`
2. Run `npm run generate:tailwind` to sync Tailwind config
3. Update components to match new specifications
4. Run `npm run sync:design-system` to validate

## 📁 Project Structure

```
theolivegreen/
├── design/
│   ├── design-system.json    # Design system source of truth
│   ├── COLORS.md              # Color palette documentation
│   └── README.md              # Design system guide
├── src/
│   ├── components/            # Reusable React components
│   ├── pages/                 # Page components
│   ├── App.jsx                # Main app with routing
│   └── main.jsx               # Entry point
├── scripts/                   # Build and sync scripts
├── public/                    # Static assets
└── package.json
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS v3** - Utility-first CSS framework
- **PostCSS** - CSS processing

## 📝 Deployment

The site is deployed to GitHub Pages. See `DEPLOY.md` for detailed deployment instructions.

To deploy updates:
```bash
npm run deploy
```

## 🎨 Brand Voice

Olive Green Martinborough represents a premium, provenance-led olive oil brand. The design system emphasizes:

- **Craft-centric** language over design-centric
- **Confident restraint** in design choices
- **Editorial sophistication** in typography
- **Connection to the grove** in color and imagery

## 📄 License

This project is private and proprietary.

## 👤 Author

**Peter Mark David**
- GitHub: [@petermarkdavid](https://github.com/petermarkdavid)

---

*Quietly Crafted. Exceptionally Pure.*

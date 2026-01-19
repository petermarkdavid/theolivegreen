# Color Palette - LOCKED

**Status:** All colors are LOCKED and final. Do not change without design system review.

## Core Colors (90% usage)

### Olive Green
- **Value:** `#6B8E23`
- **Tailwind Class:** `olive-green`
- **Usage:** Primary brand anchor. Headers, navigation, key UI elements.
- **Text Contrast:** Use with warm-off-white or white text
- **Brand Connection:** The grove itself

### Warm Off-White
- **Value:** `#FAF8F3`
- **Tailwind Class:** `warm-off-white`
- **Usage:** Main background color. Replaces generic white. Creates warmth and premium feel.
- **Text Contrast:** Use with soft-charcoal or deep-olive text
- **Brand Connection:** Linen, natural fibers, paper

### Soft Charcoal
- **Value:** `#2C2C2C`
- **Tailwind Class:** `soft-charcoal`
- **Usage:** Primary text color on light backgrounds. Softer than pure black.
- **Text Contrast:** High contrast on warm-off-white
- **Brand Connection:** Rich earth, aged wood

### Deep Olive
- **Value:** `#3D4A2E`
- **Tailwind Class:** `deep-olive`
- **Usage:** Alternative text color, deeper sections. Darker than olive-green.
- **Text Contrast:** Use with warm-off-white text
- **Brand Connection:** Deep grove shadows

## Accent Color (≤10% usage)

### Muted Gold
- **Value:** `#C9A961`
- **Tailwind Class:** `muted-gold`
- **Usage:** Sparingly used accent. Logo, subtle highlights only.
- **Text Contrast:** Use on dark backgrounds
- **Brand Connection:** Harvest gold, olive oil color

## Utility Color

### White
- **Value:** `#FFFFFF`
- **Tailwind Class:** `white`
- **Usage:** Text on dark backgrounds (olive green, deep olive). NOT for backgrounds.
- **Text Contrast:** High contrast on olive green and deep olive
- **Note:** Use warm-off-white for backgrounds instead

## Usage Rules

1. **If it isn't found in an olive grove, it doesn't belong in the palette.**
2. **Core colors (olive-green, warm-off-white, soft-charcoal, deep-olive)** - 90% usage
3. **Accent color (muted-gold)** - ≤10% usage, sparingly
4. **Never use blue or purple** in customer-facing UI
5. **Always use warm-off-white** for backgrounds, not pure white

## Tailwind Usage Examples

```jsx
// Backgrounds
<div className="bg-olive-green">...</div>
<div className="bg-warm-off-white">...</div>
<div className="bg-deep-olive">...</div>

// Text
<p className="text-soft-charcoal">...</p>
<p className="text-white">...</p>
<p className="text-muted-gold">...</p>

// Borders
<div className="border-muted-gold">...</div>
<div className="border-olive-green">...</div>
```

## Color Combinations

### High Contrast (Recommended)
- Olive Green + White text
- Deep Olive + White text
- Warm Off-White + Soft Charcoal text
- Soft Charcoal + White text

### Accent Usage
- Muted Gold on Olive Green background
- Muted Gold on Deep Olive background
- Muted Gold for logo and cart badges

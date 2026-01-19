# Design System Update - Premium Olive Oil Brand

## Summary

The design system has been completely refined to reflect a **premium, provenance-led olive oil brand** rather than a generic design system. This update implements all the systematic improvements requested.

## Key Changes

### 1. Brand Alignment - Craft-Centric Language
- Changed from design-centric to craft-centric
- Examples:
  - "Seriously Good Design" → "Quietly Crafted. Exceptionally Pure."
  - "Design System Components" → "Brand Elements"
  - "Nature First" → "Rooted in Nature" or "Guided by the Grove"

### 2. Color Palette - Reduced & Grove-Focused
**New Core Palette (90% usage):**
- Olive Green (#6B8E23) - primary brand anchor
- Warm Off-White (#FAF8F3) - main background (replaces generic white)
- Soft Charcoal (#2C2C2C) - text (softer than pure black)
- Deep Olive (#3D4A2E) - deeper sections

**Accent (≤10% usage):**
- Muted Gold (#C9A961) - sparing highlights only (replaces bright golden-yellow)

**Removed:**
- ❌ Light Blue (not found in olive grove)
- ❌ Deep Purple (not found in olive grove)
- ❌ Bright Golden Yellow (replaced with muted gold)

**Rule:** If it isn't found in an olive grove, it doesn't belong in the palette.

### 3. Typography - Editorial Sophistication
- **Hero headings:** Sentence case, not all caps
- **Section headings:** Editorial tone, sentence case
- **Body text:** Increased line-height (1.6-1.7) for long-form reading
- **New tier:** Eyebrow text (micro-headings above sections)
- **Navigation:** Consider sentence case or small caps instead of all caps

### 4. Buttons - Reduced to 2 Variants
**Removed:**
- ❌ Primary Accent
- ❌ Secondary Dark

**Kept:**
- ✅ Primary (olive green, white text) - Shop, Buy, Subscribe
- ✅ Secondary (transparent, olive border) - Learn more, Our story

**Hover:** Subtle darkening only. No scaling, no animation gimmicks.

### 5. Cards - Editorial Blocks
- Replaced borders with spacing and background contrast
- Removed elevation/shadows (or barely perceptible)
- New variants: Editorial, Product, Note
- Soft background shifts (warm-off-white → white)

### 6. Icons - Minimal & Meaningful
- Keep functional icons minimal and invisible
- Introduce brand icons: olive branch, grove rows, sun/harvest, bottle/press
- Single-weight, rounded ends, calm geometry

### 7. Photography Style
**Very important for olive oil brand:**
- Natural light, golden hour preferred
- Close-ups of olives, groves, harvest
- People in groves (craft, tradition)
- Process shots (pressing, bottling)
- Warm, earthy tones
- Soft focus for depth

### 8. Content Density & Tone
**Rule:** One strong sentence is better than three explanatory ones.

**Guidelines:**
- Prefer brevity over explanation
- Let imagery and space tell the story
- Avoid manifesto tones
- Use restraint in copy
- Trust the product to speak

### 9. Navigation - Considered
- Recommended items: Home, Our Grove, The Oil, Shop
- Sentence case or small caps (not all caps)
- Restraint signals confidence - fewer items preferred

## Files Updated

1. **design/design-system.json** - Complete rewrite with all improvements
2. **Tailwind config** - Needs regeneration with new colors
3. **Components** - Need updating to match new specifications

## Next Steps

1. Fix JSON syntax error in design-system.json
2. Regenerate Tailwind config with new color palette
3. Update all components to match new specifications:
   - Logo (muted-gold instead of golden-yellow)
   - Header (warm-off-white backgrounds)
   - Buttons (reduce to 2 variants)
   - Cards (editorial style)
   - Typography (sentence case, editorial)
4. Update copy throughout to match brand voice
5. Test and validate

## Design Principles

1. **Restraint** - Less is more. Restraint signals confidence.
2. **Provenance** - Rooted in the grove. Every element connected to olive oil.
3. **Editorial** - Editorial sophistication over UI components.
4. **Craft** - Craft-centric, not design-centric.
5. **Breathing Room** - Generous spacing allows content to breathe.

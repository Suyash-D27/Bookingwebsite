# Design Overhaul Plan: "Warmth & Tradition"

## Goal Description
Transform the UI to a "Premium & Realistic" aesthetic using a **Peach/White** background and **Shades of Red** theme, inspired by Sikkim's monasteries and warm hospitality.

## User Review Required
> [!NOTE]
> This shifts the app from Dark Mode to **Light Mode**.

## Proposed Changes

### [MODIFY] [index.css](file:///c:/Users/yashd/Desktop/sih%20work/draft2/frontend/src/index.css)
- **Palette Update**: "Peachwhite & Reds"
    - `bg-primary`: **Peach White** (`#FFF9F5` or `#FFF5EE`).
    - `bg-secondary`: **Warm White** (`#FFFFFF`).
    - `bg-glass`: **White Glass** (`rgba(255, 255, 255, 0.7)`).
    - `text-primary`: **Dark Charcoal** (`#1C1917`) - adjusted for light background.
    - `text-secondary`: **Warm Gray** (`#78716C`).
    - `accent-primary`: **Crimson Red** (`#DC2626`).
    - `accent-secondary`: **Deep Burgundy** (`#991B1B`).
    - `accent-gradient`: Linear gradient from Crimson to Burgundy.
- **Typography** (Retained from previous plan):
    - Headers: 'Playfair Display' (Serif) - Adds elegance.
    - Body: 'Inter' (Sans) - Clean readability.
- **Components**:
    - `glass-panel`: Updated for light mode (white background, subtle dark shadow).
    - `btn-primary`: Red gradient, clean borders.

## Verification Plan
### Manual Verification
1.  **Visual Check**:
    - Verify the "Peachwhite" background isn't too yellow/orange.
    - Ensure text is legible against the light background.
    - Check Red accents for visual harmony.
2.  **Responsiveness**:
    - Standard check.

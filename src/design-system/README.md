# Design System

This folder contains the single source of truth for design tokens used throughout the application.

## What are design tokens?
Design tokens are the visual design atoms of the product — specifically, they are named variables for colors, spacing, typography, radii, and shadows. They ensure consistency and scalability across the UI.

## Usage
Import the tokens from `tokens.ts` in your components or styles:

```ts
import { colors, spacing, typography, radii, shadows } from '@/design-system/tokens';
```

## Tokens Defined
- **Colors**: Brand, background, text, error, etc.
- **Spacing**: Standardized spacing values (px)
- **Typography**: Font families, sizes, weights
- **Radii**: Border radius values
- **Shadows**: Shadow presets
- **Breakpoints**: Responsive design breakpoints (px)
- **Z-Index**: Layering values for stacking context

## Extending
Add or update tokens in `tokens.ts` as your design evolves. 
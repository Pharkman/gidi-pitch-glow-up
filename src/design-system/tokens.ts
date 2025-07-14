// design-system/tokens.ts

// Brand Colors
export const colors = {
  brand: '#FD621E', // Brand orange
  background: '#FFFFFF',
  surface: '#F8FAFC',
  text: '#0F172A',
  muted: '#64748B',
  border: '#E5E7EB',
  error: '#EF4444',
  warning: '#F59E42',
  success: '#22C55E',
};

// Spacing (in px)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
};

// Typography
export const typography = {
  fontFamily: 'Inter, sans-serif',
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    '2xl': 32,
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
};

// Border radius
export const radii = {
  sm: 4,
  md: 8,
  lg: 16,
  full: 9999,
};

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(16, 24, 40, 0.05)',
  md: '0 2px 4px 0 rgba(16, 24, 40, 0.10)',
  lg: '0 4px 8px 0 rgba(16, 24, 40, 0.15)',
};

// Breakpoints (in px)
export const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Z-Index
export const zIndex = {
  auto: 'auto',
  base: 0,
  dropdown: 10,
  sticky: 20,
  banner: 30,
  overlay: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  toast: 80,
  max: 9999,
}; 
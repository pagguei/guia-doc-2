export const theme = {
  colors: {
    fg: '#0f172a',
    muted: '#64748b',
    brand: '#0e2be9ff',
    bg: '#ffffff',
    surface: '#f8fafc',
    border: '#e2e8f0',
  },
  radius: {
    sm: '6px',
    md: '12px',
    lg: '16px',
  },
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,.05)',
    md: '0 6px 20px rgba(2, 6, 23, .06)',
  },
} as const;

export type AppTheme = typeof theme;

export const space = (n: number) => `${n * 4}px`;
export const radius = { xs:'8px', sm:'12px', md:'16px', lg:'20px', xl:'28px', pill:'9999px' };

export const shadow = {
  xs:'0 1px 2px rgba(0,0,0,.06)',
  sm:'0 6px 18px rgba(20,37,63,.08)',
  md:'0 12px 40px rgba(20,37,63,.12)',
  lg:'0 24px 68px rgba(20,37,63,.16)',
};

export const color = {
  bg: '#fcfdff',
  card: '#fff',
  text: '#0b0c0f',
  muted: 'rgba(0,0,0,.62)',
  border: 'rgba(0,0,0,.10)',
  borderStrong: 'rgba(0,0,0,.16)',
  brand: 'hsl(220 90% 56%)',
  brandDark: 'hsl(220 90% 44%)',
  brandSoft: 'hsl(220 95% 56% / .12)',
  grayBg: 'hsl(215 20% 96%)',
  success: 'hsl(120 60% 40%)',
  successSoft: 'hsl(120 60% 40% / .12)',
  error: 'hsl(0 70% 48%)',
  errorSoft: 'hsl(0 70% 48% / .12)',
};

export const mq = {
  lg: '@media (max-width: 1200px)',
  md: '@media (max-width: 960px)',
  sm: '@media (max-width: 720px)',
};

export const brand = {
  from:'#2563eb', to:'#1d4ed8', // azul 600→700
  ring:'hsl(220 90% 56% / .35)',
  glow:`0 0 0 6px hsl(220 95% 56% / .10), inset 0 1px 0 rgba(255,255,255,.18)`
};
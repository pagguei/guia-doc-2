'use client';

import styled, { css } from 'styled-components';

/* ===== Tokens (mantive equivalentes ao seu arquivo) ===== */
const space = (n: number) => `${n * 4}px`;
const radius = { xs:'8px', sm:'12px', md:'16px', lg:'20px', xl:'28px', pill:'9999px' };

const shadow = {
  xs:'0 1px 2px rgba(0,0,0,.06)',
  sm:'0 6px 18px rgba(20,37,63,.08)',
  md:'0 12px 40px rgba(20,37,63,.12)',
  lg:'0 24px 68px rgba(20,37,63,.16)',
};

const color = {
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
};

const mq = {
  lg: '@media (max-width: 1200px)',
  md: '@media (max-width: 960px)',
  sm: '@media (max-width: 720px)',
};

const brand = {
  from:'#2563eb', to:'#1d4ed8',
  ring:'hsl(220 90% 56% / .35)',
};

const ctaReset = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 48px;
  padding: 0 22px;
  border-radius: 14px;
  font-weight: 900;
  letter-spacing: .01em;
  user-select: none;
  cursor: pointer;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  transition: transform .08s ease, filter .15s ease, box-shadow .15s ease, background .2s ease, border-color .2s ease;
  &:active { transform: translateY(1px); }
  &:focus-visible { outline: none; box-shadow: 0 0 0 4px ${brand.ring}; }
`;

export const Page = styled.main`
  color: ${color.text};
  background: ${color.bg};
`;

export const Wrap = styled.div`
  max-width: 1120px; margin: 0 auto; padding: ${space(10)} ${space(4)} ${space(12)};
`;

export const Title = styled.h1`
  text-align:center; font-weight: 700; letter-spacing:-.02em;
  font-size: clamp(28px, 4.2vw, 46px);
  margin: 0 0 ${space(2)};
  color: ${color.brand};
`;

export const Lead = styled.p`
  text-align:center; color:${color.muted}; margin:0 auto ${space(8)};
  max-width: 72ch; line-height: 1.65;
`;

export const Grid = styled.div`
  display:grid; gap:${space(4)};
  grid-template-columns: 1fr 2fr;
  ${mq.md}{ grid-template-columns: 1fr; }
`;

/* ==== Coluna esquerda ==== */
export const ColLeft = styled.div` display:grid; gap:${space(4)}; `;

export const ChannelCard = styled.section`
  background:${color.card};
  border:1px solid ${color.border};
  border-radius:${radius.lg};
  padding:${space(5)};
  box-shadow:${shadow.sm};
`;

export const ChannelTitle = styled.h3`
  margin:0 0 ${space(4)};
  font-weight:900; letter-spacing:-.01em; font-size:18px;
`;

export const ChannelItem = styled.div`
  display:flex; gap:14px; align-items:flex-start;
  & + &{ margin-top:${space(3)}; padding-top:${space(3)}; border-top:1px dashed ${color.border}; }
  strong{ display:block; margin-bottom:4px; }
`;

export const ChannelIcon = styled.span`
  display:grid; place-items:center; width:30px; height:30px;
  border-radius:${radius.pill}; border:1px solid ${color.border};
  background:${color.grayBg};
  font-size:15px; flex:0 0 auto;
`;

export const ChannelText = styled.p`
  margin:0; color:${color.muted}; line-height:1.55;
  a{ color:${color.brandDark}; text-decoration:none; border-bottom:1px dashed transparent; }
  a:hover{ border-bottom-color:${color.borderStrong}; }
`;

export const TipCard = styled.aside`
  display:flex; gap:12px; align-items:flex-start;
  border:1px solid ${color.border}; background:#f7fbff;
  padding:${space(4)}; border-radius:${radius.lg}; box-shadow:${shadow.xs};
`;
export const TipIcon = styled.span`
  display:grid; place-items:center; width:28px; height:28px;
  border-radius:${radius.pill}; background:#fff; border:1px solid ${color.border};
`;
export const TipTitle = styled.strong` display:block; margin-bottom:4px; `;
export const TipText = styled.p` margin:0; color:${color.muted}; `;

/* ==== Coluna direita ==== */
export const ColRight = styled.div``;

export const FormCard = styled.section`
  background:${color.card}; border:1px solid ${color.border};
  border-radius:${radius.lg}; padding:${space(5)}; box-shadow:${shadow.sm};
`;

export const FormHead = styled.h3`
  margin:0; font-weight:900; letter-spacing:-.01em; font-size:18px;
`;

export const FormDesc = styled.p`
  margin:${space(1)} 0 ${space(5)}; color:${color.muted}; font-size:14px;
`;

export const Form = styled.form` display:grid; gap:${space(4)}; `;

export const FieldRow = styled.div`
  display:grid; gap:${space(4)}; grid-template-columns: 1fr 1fr;
  ${mq.sm}{ grid-template-columns:1fr; }
`;

export const Field = styled.div` display:grid; gap:8px; `;

export const Label = styled.label`
  font-weight:800; font-size:14px; letter-spacing:.01em;
`;

export const Required = styled.span` color:${color.brandDark}; margin-left:4px; `;

const inputBase = css`
  height:46px; padding:0 14px; border-radius:${radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border}; background:#fff; color:${color.text};
  box-shadow: inset 0 1px 0 rgba(255,255,255,.6);
  transition: box-shadow .15s ease, border-color .15s ease, background .15s ease;
  font-size: 15px;
  &:focus{ outline:none; border-color:${color.brand}; box-shadow: 0 0 0 4px hsl(220 95% 56% / .15); }
  &::placeholder{ color: rgba(0,0,0,.4); }
`;

export const Input = styled.input`${inputBase}`;

export const Select = styled.select`
  ${inputBase};
  appearance:none; background-image: linear-gradient(45deg, transparent 50%, rgba(0,0,0,.55) 50%),
                   linear-gradient(135deg, rgba(0,0,0,.55) 50%, transparent 50%);
  background-position: calc(100% - 18px) 18px, calc(100% - 12px) 18px;
  background-size: 6px 6px, 6px 6px; background-repeat: no-repeat;
`;

export const Textarea = styled.textarea`
  min-height:140px; padding:12px 14px; border-radius:${radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border}; background:#fff; color:${color.text};
  resize: vertical;
  &:focus{ outline:none; border-color:${color.brand}; box-shadow: 0 0 0 4px hsl(220 95% 56% / .15); }
`;

export const Helper = styled.p`
  margin:-6px 0 0; font-size:12.5px; color:${color.muted};
`;

export const Actions = styled.div`
  display:flex; align-items:center; gap:12px; flex-wrap:wrap;
`;

export const SubmitBtn = styled.button`
  ${ctaReset};
  color:#fff;
  border: 1px solid ${color.brand};
  background:
    linear-gradient(180deg, rgba(255,255,255,.12), rgba(0,0,0,.10)) padding-box,
    linear-gradient(90deg, ${brand.from}, ${brand.to}) border-box;
  box-shadow: 0 10px 24px rgba(29, 78, 216, .22), inset 0 1px 0 rgba(255,255,255,.18);
  &[aria-disabled='true'], &:disabled{ opacity:.7; cursor:not-allowed; box-shadow:none; }
`;

/* ==== FAQ ==== */
export const FAQWrap = styled.section`
  margin:${space(8)} 0 0;
`;

export const FAQGrid = styled.div`
  display:grid; gap:${space(4)};
  grid-template-columns: repeat(2, 1fr);
  ${mq.sm}{ grid-template-columns:1fr; }
`;

export const QA = styled.div`
  background:${color.card}; border:1px solid ${color.border};
  border-radius:${radius.lg}; padding:${space(5)}; box-shadow:${shadow.xs};
`;

export const QATitle = styled.h4`
  margin:0 0 6px; font-size:16px; font-weight:900; letter-spacing:-.01em;
`;

export const QAText = styled.p`
  margin:0; color:${color.muted}; line-height:1.6; font-size:14.5px;
`;

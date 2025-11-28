'use client';

import styled, { css } from 'styled-components';

/* ===== Tokens (iguais aos outros steps) ===== */
const radius = { md: '12px', lg: '16px', xl: '18px' };
const space = (n: number) => `${n * 4}px`;
const color = {
  card: '#fff',
  border: 'rgba(0,0,0,.10)',
  borderStrong: 'rgba(0,0,0,.16)',
  text: '#0b0c0f',
  textMuted: 'rgba(0,0,0,.65)',
  brand: 'hsl(220 90% 56%)',
  danger: 'hsl(0 72% 55%)',
  ok: 'hsl(142 72% 35%)',
};
const shadow = { sm: '0 1px 2px rgba(0,0,0,.06)' };
const mq = { sm: '@media (max-width: 640px)' };

/* ===== Layout base ===== */
export const Wrap = styled.div`
  max-width: 968px;
  margin: 0 auto;
  padding: ${space(8)} ${space(0)} ${space(10)};
  color: ${color.text};
  ${mq.sm} { padding: ${space(6)} ${space(3)} ${space(8)}; }

  h2 {
    margin: 0 0 ${space(2)} 0;
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.01em;
  }
`;

export const Group = styled.section`
  background: ${color.card};
  border: 1px solid ${color.border};
  border-radius: ${radius.xl};
  padding: ${space(5)};
  box-shadow: ${shadow.sm};
  margin: ${space(4)} 0;
  ${mq.sm} { padding: ${space(4)}; border-radius: ${radius.lg}; }
`;

/* ===== Grid ===== */
export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: ${space(4)};
  & + & { margin-top: ${space(3)}; }

  ${mq.sm} {
    grid-template-columns: 1fr;
    gap: ${space(3)};
  }
`;

type ColProps = { $span?: number };
const spanCss = (n = 12) =>
  css`grid-column: span ${Math.min(Math.max(n, 1), 12)} / span ${Math.min(Math.max(n, 1), 12)};`;
export const Col = styled.div<ColProps>` ${(p) => spanCss(p.$span ?? 12)} `;

/* ===== Tipografia ===== */
export const Label = styled.label`
  display: block;
  font-size: 13.5px;
  font-weight: 700;
  margin-bottom: ${space(1.5)};
`;

export const Help = styled.p`
  margin: ${space(1)} 0 ${space(3)};
  font-size: 13px;
  color: ${color.textMuted};
`;

/* ===== Inputs nativos estilizados ===== */
const fieldBase = css`
  width: 100%;
  height: 44px;
  border-radius: 10px;
  padding: 0 ${space(3.5)};
  border: 1px solid ${color.borderStrong};
  background: #fff;
  box-shadow: ${shadow.sm};
  transition: box-shadow .2s, border-color .2s, background .2s;
  font-size: 15px;

  &:hover { border-color: rgba(0,0,0,.22); }
  &:focus {
    outline: none;
    border-color: ${color.brand};
    box-shadow: 0 0 0 4px hsl(220 90% 56% / .18);
  }

  &::placeholder { color: rgba(0,0,0,.45); }
`;

export const Input = styled.input<{ $invalid?: boolean }>`
  ${fieldBase};
  ${(p) =>
    p.$invalid &&
    css`
      border-color: ${color.danger};
      box-shadow: 0 0 0 4px ${color.danger}22;
    `}
`;

/* ===== Estados / feedback ===== */
export const ErrorText = styled.div`
  margin-top: 6px;
  font-size: 12.5px;
  color: ${color.danger};
`;

export const HintText = styled.div`
  margin-top: 6px;
  font-size: 12.5px;
  color: ${color.textMuted};
`;

export const Badge = styled.span<{ $tone?: 'ok' | 'warn' | 'danger' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  line-height: 1;
  padding: 6px 8px;
  border-radius: 999px;
  border: 1px solid
    ${({ $tone }) =>
    $tone === 'danger' ? 'hsl(0 72% 55% / .35)'
      : $tone === 'warn' ? 'hsl(38 92% 50% / .35)'
        : 'hsl(142 72% 35% / .35)'};
  background:
    ${({ $tone }) =>
    $tone === 'danger' ? 'hsl(0 100% 97%)'
      : $tone === 'warn' ? 'hsl(48 96% 89%)'
        : 'hsl(143 85% 95%)'};
  color:
    ${({ $tone }) =>
    $tone === 'danger' ? 'hsl(0 72% 40%)'
      : $tone === 'warn' ? 'hsl(38 92% 40%)'
        : 'hsl(142 72% 25%)'};
`;

/* ===== Ações ===== */
export const Actions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  margin-top: ${space(5)};
`;

/* ===== Edit link ===== */
export const EditLink = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  color: ${color.brand};
  transition: background .15s ease, box-shadow .15s ease;

  &:hover {
    background: hsl(220 90% 56% / .06);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px hsl(220 90% 56% / .25);
  }
`;
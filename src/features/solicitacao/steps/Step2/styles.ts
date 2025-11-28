'use client';

import styled, { css } from 'styled-components';

/* ===== Tokens (ajuste ao seu tema, iguais ao Step1) ===== */
const radius = { md: '12px', lg: '16px', xl: '18px' };
const space = (n: number) => `${n * 4}px`;
const color = {
  card: '#fff',
  border: 'rgba(0,0,0,.10)',
  borderStrong: 'rgba(0,0,0,.16)',
  text: '#0b0c0f',
  textMuted: 'rgba(0,0,0,.65)',
  infoBg: 'hsl(210 100% 97%)',
  infoBorder: 'hsl(210 90% 70% / .45)',
  brand: 'hsl(220 90% 56%)',
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
const spanCss = (n = 12) => css`grid-column: span ${Math.min(Math.max(n, 1), 12)} / span ${Math.min(Math.max(n, 1), 12)};`;
export const Col = styled.div<ColProps>` ${(p) => spanCss(p.$span ?? 12)} `;

/* ===== Textos ===== */
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

/* ===== Seções internas ===== */
export const Section = styled.div`
  & + & { margin-top: ${space(4)}; }
`;

export const SectionTitle = styled.h3`
  margin: 0 0 ${space(2)} 0;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.01em;
`;

export const Divider = styled.hr`
  border: 0;
  height: 1px;
  margin: ${space(4)} 0;
  background: ${color.border};
`;

/* ===== Ações (botões) ===== */
export const Actions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  margin-top: ${space(5)};
`;

/* ===== Callouts (alerts) ===== */
export const Callout = styled.div<{
  $tone: 'info' | 'warning' | 'success';
}>`
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: ${space(2)};
  align-items: start;
  padding: ${space(3)};
  border-radius: ${radius.lg};
  border: 1px solid
    ${({ $tone }) =>
    $tone === 'warning'
      ? 'hsl(38 92% 50% / .35)'
      : $tone === 'success'
        ? 'hsl(142 72% 35% / .30)'
        : 'hsl(210 90% 70% / .45)'};
  background:
    ${({ $tone }) =>
    $tone === 'warning'
      ? 'hsl(48 96% 89% / .55)'
      : $tone === 'success'
        ? 'hsl(143 85% 95% / .65)'
        : 'hsl(210 100% 97%)'};
  font-size: 14px;
`;

export const CalloutTitle = styled.div`
  font-weight: 700;
  margin-bottom: 2px;
`;

export const CalloutIcon = styled.div`
  display: grid;
  place-items: center;
  margin-top: 2px;
  svg { width: 18px; height: 18px; }
`;

/* ===== Checkbox “linha” ===== */
export const CheckRow = styled.label`
  display: inline-flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;
  cursor: pointer;

  input[type='checkbox'] {
    width: 18px; height: 18px; border-radius: 4px;
    accent-color: hsl(220 90% 56%);
  }
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
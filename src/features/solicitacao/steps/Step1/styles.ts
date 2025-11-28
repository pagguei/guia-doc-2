'use client';

import styled, { css } from 'styled-components';

/* ===== Design tokens rápidos (ajuste ao seu tema) ===== */
const radius = {
  md: '12px',
  lg: '16px',
  xl: '18px',
};
const space = (n: number) => `${n * 4}px`;

const color = {
  bg: '#0b0c0f0a',                // page tint
  card: '#ffffff',
  border: 'rgba(0,0,0,.10)',
  borderStrong: 'rgba(0,0,0,.16)',
  text: '#0b0c0f',
  textMuted: 'rgba(0,0,0,.65)',
  infoBg: 'hsl(210 100% 97%)',
  infoBorder: 'hsl(210 90% 70% / .45)',
};

const shadow = {
  sm: '0 1px 2px rgba(0,0,0,.06)',
  md: '0 4px 12px rgba(0,0,0,.06)',
};

const mq = {
  sm: '@media (max-width: 640px)',
  md: '@media (max-width: 900px)',
  lg: '@media (max-width: 1200px)',
};

/* ===== Page wrapper ===== */
export const Wrap = styled.div`
  max-width: 968px;
  margin: 0 auto;
  padding: ${space(8)} ${space(0)} ${space(10)};
  color: ${color.text};

  h2 {
    margin: 0 0 ${space(2)} 0;
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.01em;
  }

  ${mq.sm} {
    padding: ${space(6)} ${space(3)} ${space(8)};
  }
`;

/* ===== Section card ===== */
export const Group = styled.section`
  background: ${color.card};
  border: 1px solid ${color.border};
  border-radius: ${radius.xl};
  padding: ${space(5)};
  box-shadow: ${shadow.sm};
  margin: ${space(4)} 0;

  /* sutil divider entre linhas (opcional, só aparece se usar GroupHeader) */
  & + & {
    margin-top: ${space(5)};
  }

  ${mq.sm} {
    padding: ${space(4)};
    border-radius: ${radius.lg};
  }
`;

/* ===== Section header (opcional) ===== */
export const GroupHeader = styled.header`
  margin-bottom: ${space(3)};
  padding-bottom: ${space(3)};
  border-bottom: 1px solid ${color.border};
`;

export const GroupTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.01em;
`;

export const GroupDescription = styled.p`
  margin: ${space(1)} 0 0;
  font-size: 13.5px;
  color: ${color.textMuted};
`;

/* ===== Grid (12 col) ===== */
export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: ${space(4)};

  & + & {
    margin-top: ${space(3)};
  }

  ${mq.sm} {
    grid-template-columns: 1fr;
    gap: ${space(3)};
  }
`;

type ColProps = { $span?: number };
const spanToCss = (n = 12) => css`grid-column: span ${Math.min(Math.max(n, 1), 12)} / span ${Math.min(Math.max(n, 1), 12)};`;

export const Col = styled.div<ColProps>`
  ${(p) => spanToCss(p.$span ?? 12)};
`;

/* ===== Label / Help ===== */
export const Label = styled.label`
  display: block;
  font-size: 13.5px;
  font-weight: 700;
  margin-bottom: ${space(1.5)};
  letter-spacing: 0;
`;

export const Help = styled.p`
  margin: ${space(1)} 0 ${space(3)};
  font-size: 13px;
  color: ${color.textMuted};
`;

/* ===== “Notice” inline (se quiser desligar o seu componente) ===== */
export const InlineNotice = styled.div<{ $tone?: 'info' | 'warning' }>`
  display: flex;
  align-items: center;
  gap: ${space(2)};
  padding: ${space(3)};
  border-radius: ${radius.lg};
  background: ${color.infoBg};
  border: 1px solid ${color.infoBorder};
  font-size: 13.5px;
  color: ${color.text};

  svg { flex: 0 0 auto; }
`;

/* ===== Inputs genéricos (opcional, caso seus componentes respeitem inherit) ===== */
/* Caso queira padronizar inputs nativos dentro do Group */
export const FieldBase = css`
  width: 100%;
  height: 44px;
  border-radius: 10px;
  padding: 0 ${space(3.5)};
  border: 1px solid ${color.borderStrong};
  background: #fff;
  box-shadow: ${shadow.sm};
  transition: box-shadow .2s, border-color .2s, background .2s;

  &:hover {
    border-color: rgba(0,0,0,.22);
  }
  &:focus {
    outline: none;
    border-color: hsl(220 90% 56%);
    box-shadow: 0 0 0 4px hsl(220 90% 56% / .18);
  }

  &::placeholder { color: rgba(0,0,0,.45); }
`;

/* para inputs nativos dentro do Group (se você usar algum) */
export const NativeInput = styled.input`${FieldBase}`;
export const NativeSelect = styled.select`${FieldBase}`;

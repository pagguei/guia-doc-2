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
};
const shadow = { sm: '0 1px 2px rgba(0,0,0,.06)' };
const mq = { sm: '@media (max-width: 640px)' };

/* ===== Container ===== */
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

export const Group = styled.section`
  display: grid;
  gap: ${space(4)};
  margin-top: ${space(4)};
`;

/* ===== Card ===== */
export const Card = styled.article`
  background: ${color.card};
  border: 1px solid ${color.border};
  border-radius: ${radius.xl};
  box-shadow: ${shadow.sm};
  overflow: hidden;
`;

export const CardHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${space(4)} ${space(5)} ${space(2.5)};
  border-bottom: 1px solid ${color.border};
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.01em;
`;

export const CardBody = styled.div`
  padding: ${space(6)} ${space(5)} ${space(6)};
`;

/* ===== Linha de revisão ===== */
export const Line = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  column-gap: ${space(4)};
  align-items: start;
  padding: ${space(2.5)} 0;
  border-top: 1px solid ${color.border};

  &:first-child { border-top: 0; padding-top: 0; }
  &:last-child { padding-bottom: 0; }

  ${mq.sm} {
    grid-template-columns: 1fr;
    row-gap: ${space(1)};
  }
`;

export const Label = styled.div`
  font-size: 13.5px;
  font-weight: 700;
  color: ${color.text};
`;

export const Value = styled.div<{ $muted?: boolean }>`
  font-size: 14px;
  ${(p) =>
    p.$muted &&
    css`
      color: ${color.textMuted};
    `}
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

/* ===== Área de termos ===== */
export const TermsBlock = styled.div`
  background: ${color.card};
  border: 1px solid ${color.border};
  border-radius: ${radius.xl};
  box-shadow: ${shadow.sm};
  padding: ${space(4)} ${space(5)};
  display: grid;
  gap: ${space(4)};
`;

/* (Compat: se ainda utilizar <label> inline para termos) */
export const TermsRow = styled.label`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  line-height: 1.5;

  input[type='checkbox'] { margin-top: 2px; }
  a {
    color: ${color.brand};
    font-weight: 700;
    text-underline-offset: 3px;
  }
`;

/* ===== Ações (botões) ===== */
export const Actions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  margin-top: ${space(5)};
`;

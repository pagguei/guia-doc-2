'use client';
import styled, { css } from 'styled-components';

/* === Tokens (iguais ao seu padrão) === */
const radius = { md: '12px', lg: '16px', xl: '18px' };
const space = (n: number) => `${n * 4}px`;
const color = {
    card: '#fff',
    border: 'rgba(0,0,0,.10)',
    borderStrong: 'rgba(0,0,0,.16)',
    text: '#0b0c0f',
    textMuted: 'rgba(0,0,0,.65)',
    brand: 'hsl(220 90% 56%)',
    brandSoft: 'hsl(220 90% 56% / .10)',
    danger: 'hsl(0 72% 55%)',
    ok: 'hsl(142 72% 35%)',
    warnBg: 'hsl(38 100% 96%)',
    infoBg: 'hsl(210 75% 96%)',
};
const shadow = { sm: '0 1px 2px rgba(0,0,0,.06)' };
const mq = { sm: '@media (max-width: 640px)' };

/* === Layout base / grid reaproveitado === */
export const Wrap = styled.div`
  max-width: 1100px;
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

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: ${space(4)};
  ${mq.sm} { grid-template-columns: 1fr; gap: ${space(3)}; }
`;

export const Col = styled.div<{ $span?: number }>`
  grid-column: span ${({ $span = 12 }) => Math.min(Math.max($span, 1), 12)} /
               span ${({ $span = 12 }) => Math.min(Math.max($span, 1), 12)};

  /* Mobile: sempre ocupar 100% (1ª até a última coluna) */
  ${mq.sm} {
    grid-column: 1 / -1;
  }
`;


export const Help = styled.p`
  margin: ${space(1)} 0 ${space(3)};
  font-size: 13px;
  color: ${color.textMuted};
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  margin-top: ${space(5)};
`;

export const EditLink = styled.button`
  all: unset;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  color: ${color.brand};
  transition: background .15s ease, box-shadow .15s ease;
  &:hover { background: ${color.brandSoft}; }
  &:focus-visible { outline: none; box-shadow: 0 0 0 3px hsl(220 90% 56% / .25); }
`;

/* === Resumo (esquerda) === */
export const ResumeTable = styled.div`
  display: grid;
  gap: 20px;
  margin-top: ${space(3)};

  > div { display: grid; grid-template-columns: 1fr 1fr; }

  .separator {
    border-top: 1px solid ${color.border};
    padding-top: ${space(3)};
    margin-top: ${space(2)};
  }
`;
export const K = styled.span` color: ${color.textMuted}; `;
export const V = styled.span` text-align: right; font-weight: 600; `;

export const TotalBox = styled.div`
  margin-top: ${space(4)};
  display: flex; align-items: center; justify-content: space-between;
  font-size: 16px;
  color: ${color.brand};
  font-weight: 800;
  border-top: 1px solid ${color.border};
  padding-top: ${space(3)};
`;

/* === Cards de opção (direita) === */
export const CardOption = styled.article<{ $active?: boolean }>`
  border: 1px solid ${color.borderStrong};
  border-radius: 14px;
  padding: ${space(4)};
  margin-top: ${space(3)};
  transition: border-color .15s ease, box-shadow .15s ease, background .15s ease;
  cursor: pointer;
  background: #fff;

  ${({ $active }) =>
        $active
            ? css`border-color: ${color.brand}; box-shadow: 0 0 0 4px hsl(220 90% 56% / .15);`
            : css`&:hover { border-color: ${color.brand}; }`};
`;

export const CardHeader = styled.header`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: ${space(3)};
`;

export const CardBody = styled.div`
  margin-top: ${space(3)};
`;

export const CardTitle = styled.div`
  font-weight: 800;
  letter-spacing: -0.01em;
`;
export const CardSubtitle = styled.div`
  font-size: 13px;
  color: ${color.textMuted};
`;

/* Radio fake (visual) */
export const Radio = styled.div`
  width: 18px; height: 18px; border-radius: 999px;
  border: 2px solid ${color.brand};
  display: grid; place-items: center;

  &[data-checked='true']::after {
    content: '';
    width: 8px; height: 8px; border-radius: 999px; background: ${color.brand};
  }
`;

export const PriceTag = styled.div`
  white-space: nowrap;
  font-weight: 800;
  color: ${color.brand};
`;

/* Caixas de requisitos */
export const Requirements = styled.div<{ $tone?: 'danger' | 'warn' }>`
  border: 1px solid ${({ $tone }) => ($tone === 'danger' ? 'hsl(0 72% 55% / .35)' : 'hsl(38 92% 50% / .35)')};
  background: ${({ $tone }) => ($tone === 'danger' ? 'hsl(0 100% 97%)' : 'hsl(38 100% 96%)')};
  color: ${({ $tone }) => ($tone === 'danger' ? 'hsl(0 72% 35%)' : 'hsl(38 92% 35%)')};
  border-radius: 12px;
  padding: ${space(3)};
  font-size: 13px;

  ul { margin: ${space(2)} 0 0; padding-left: ${space(4)}; }
`;

export const Bullet = styled.li`
  margin: 6px 0;
`;

export const VPositive = styled(V)`
  color: hsl(142 72% 35%); /* verdinho */
  font-weight: 800;
`;

export const V2 = styled.span`
  color: hsl(142 72% 35%); /* verdinho */
`;

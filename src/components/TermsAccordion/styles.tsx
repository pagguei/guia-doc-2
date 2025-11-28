'use client';

import styled, { keyframes } from 'styled-components';
import * as Accordion from '@radix-ui/react-accordion';

/* Container + meta */
export const Container = styled.div`
  margin-top: 12px;
`;

export const SmallMeta = styled.div`
  font-size: 12px;
  opacity: 0.8;
  margin: 0 0 8px 2px;
`;

/* Root */
export const Root = styled(Accordion.Root)`
  display: grid;
  gap: 10px;
`;

/* Item */
export const Item = styled(Accordion.Item)`
  border: 1px solid var(--border, rgba(0,0,0,.12));
  border-radius: 12px;
  overflow: hidden;
  background: var(--surface, #fff);

`;

/* Trigger — sem caret/setinha */
export const Trigger = styled(Accordion.Trigger)`
  all: unset;
  width: 100%;
  cursor: pointer;
  padding: 14px 16px;
  font-weight: 700;
  display: flex;
  align-items: center;

  /* remove qualquer caret default que algum reset/tema adicione */
  &::after { content: none !important; }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px hsl(220 90% 56% / .25) inset;
  }
  svg {
    margin-right: 8px;
  }
`;

/* Content — animação suave (opacidade) + rolagem interna */
const fadeIn = keyframes`
  from { opacity: .6; }
  to   { opacity: 1; }
`;

export const Content = styled(Accordion.Content)`
  animation: ${fadeIn} .16s ease;
  border-top: 1px solid var(--border, rgba(0,0,0,.06));
  /* não expandimos a página, o scroll fica no Inner */
`;

/* Wrapper com altura fixa e scroll */
export const ContentInner = styled.div`
  max-height: 320px;      /* << ajuste aqui a altura do "scrollview" */
  overflow: auto;
  padding: 12px 16px 16px;

  /* scroll discreto */
  scrollbar-width: thin;
  scrollbar-color: rgba(0,0,0,.3) transparent;
  &::-webkit-scrollbar { height: 8px; width: 8px; }
  &::-webkit-scrollbar-thumb { background: rgba(0,0,0,.3); border-radius: 8px; }
  &::-webkit-scrollbar-track { background: transparent; }
`;

/* Tipografia e blocos */
export const Section = styled.section`
  line-height: 1.65;
  & + & { margin-top: 10px; }
`;

export const H3 = styled.h3`
  font-size: 16px;
  margin: 6px 0 8px;
`;

export const P = styled.p`
  margin: 0 0 10px;
  font-size: 14px;
`;

export const UL = styled.ul`
  margin: 0 0 10px 18px;
  font-size: 14px;
  list-style: disc;
  li + li { margin-top: 6px; }
`;

export const OL = styled.ol`
  margin: 0 0 10px 18px;
  font-size: 14px;
  li + li { margin-top: 6px; }
`;

export const LI = styled.li``;

export const A = styled.a`
  color: hsl(220 90% 56%);
  text-underline-offset: 3px;
  font-weight: 600;
  &:hover { text-decoration: underline; }
  &:focus-visible { outline: none; box-shadow: 0 2px 0 hsl(220 90% 56%); }
`;

/* ===== Callout (alerts) ===== */
type Variant = 'info' | 'warning' | 'success';

export const CalloutWrap = styled.div<{ $variant: Variant }>`
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 10px;
  align-items: start;
  padding: 12px;
  border-radius: 12px;
  margin: 10px 0;
  border: 1px solid
    ${({ $variant }) =>
    $variant === 'warning'
      ? 'hsl(38 92% 50% / .35)'
      : $variant === 'success'
        ? 'hsl(142 72% 35% / .30)'
        : 'hsl(220 90% 56% / .30)'};
  background:
    ${({ $variant }) =>
    $variant === 'warning'
      ? 'hsl(48 96% 89% / .55)'
      : $variant === 'success'
        ? 'hsl(143 85% 95% / .65)'
        : 'hsl(220 95% 97% / .75)'};

`;

export const CalloutIcon = styled.div<{ $variant: Variant }>`
  display: grid;
  place-items: center;
  margin-top: 2px;
  svg {
    width: 18px;
    height: 18px;
    color:
      ${({ $variant }) =>
    $variant === 'warning'
      ? 'hsl(38 92% 45%)'
      : $variant === 'success'
        ? 'hsl(142 72% 35%)'
        : 'hsl(220 90% 56%)'};
  }
`;

export const CalloutBody = styled.div`
  font-size: 14px;
  color: inherit;
`;

export const CalloutTitle = styled.div`
  font-weight: 700;
  margin-bottom: 2px;
`;

// components/TermsConfirm.tsx
'use client';
import * as Checkbox from '@radix-ui/react-checkbox';
import styled, { keyframes } from 'styled-components';

export const Row = styled.div`
  display: flex;
  column-gap: 12px;
  row-gap: 6px;
  align-items: center;
  padding: 14px 16px;
  border: 1px solid var(--border, rgba(0,0,0,.12));
  border-radius: 14px;
  background: var(--surface, #fff);
  box-shadow: 0 1px 0 rgba(0,0,0,.03);

  &[data-error='true'] {
    border-color: hsl(0 72% 60%);
    box-shadow: 0 0 0 3px hsl(0 72% 60% / .15);
  }
`;


export const pop = keyframes`
  from { transform: scale(.9); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
`;


export const Box = styled(Checkbox.Root)`
  all: unset;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 1.5px solid var(--chk-border, hsl(220 14% 70%));
  background: var(--chk-bg, #fff);
  display: inline-grid;
  place-items: center;
  cursor: pointer;
  transition: border-color .2s ease, background .2s ease, box-shadow .2s ease;

  &[data-state='checked'] {
    background: linear-gradient(180deg, hsl(220 90% 56%), hsl(220 82% 48%));
    border-color: transparent;
  }

  &:hover { border-color: hsl(220 90% 56%); }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px hsl(220 90% 56% / .25);
  }

  &[data-disabled] { cursor: not-allowed; opacity: .6; }
`;


export const Indicator = styled(Checkbox.Indicator)`
  color: #fff;
  display: grid;
  place-items: center;
  animation: ${pop} .12s ease-out;
  svg { width: 16px; height: 16px; }
`;


export const Label = styled.label`
  line-height: 1.5;
  font-size: 15px;
  color: hsl(222 47% 11%);
  cursor: pointer;
  user-select: none;
`;


export const A = styled.a`
  color: hsl(220 90% 56%);
  text-underline-offset: 3px;
  font-weight: 600;
  &:hover { text-decoration: underline; }
  &:focus-visible {
    outline: none;
    box-shadow: 0 2px 0 hsl(220 90% 56%);
  }
`;


export const BtnLink = styled.button`
  background: none;
  border: 0;
  padding: 0;
  margin: 0;
  color: hsl(220 90% 56%);
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  text-decoration: none;
  text-underline-offset: 3px;
  &:hover { text-decoration: underline; }
  &:focus-visible { outline: none; box-shadow: 0 2px 0 hsl(220 90% 56%); }
`;

export const Linkish = ({
  children,
  asButton,
  href,
  onClick,
}: { children: React.ReactNode; asButton?: boolean; href?: string; onClick?: () => void }) =>
  asButton ? (
    <BtnLink type="button" onClick={onClick} > {children} </BtnLink>
  ) : (
    <A href={href} target="_blank" rel="noreferrer" > {children} </A>
  );


export const Required = styled.span`
  color: hsl(0 72% 50%);
  margin-left: 2px;
`;


export const Helper = styled.div`
  grid-column: 1 / -1;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: hsl(0 72% 45%);
`;

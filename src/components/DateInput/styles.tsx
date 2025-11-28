'use client';
import * as Popover from '@radix-ui/react-popover';
import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import styled, { css } from 'styled-components';

/* props públicas que realmente usamos no input com máscara */
export type MaskPublicProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> & {
  mask: any;
  value?: string;
  onAccept?: (value: string) => void;     // callback do imask
};

/* wrapper leve para evitar tipos profundos do IMaskInput */
const MaskBase = forwardRef<HTMLInputElement, MaskPublicProps>(function MaskBase(
  props,
  ref
) {
  // IMaskInput expõe o <input> via inputRef
  return <IMaskInput {...(props as any)} inputRef={ref as any} />;
});

/* estiliza o wrapper (não o IMaskInput direto) */
export const Mask = styled(MaskBase).attrs({ suppressHydrationWarning: true }) <{
  $invalid?: boolean;
}>`
  width: 100%;
  padding: 12px 42px 12px 14px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: #fff;
  color: ${({ theme }) => theme.colors.fg};
  outline: none;
  transition: border-color .15s ease, box-shadow .15s ease;

  &:focus{ outline:none; border-color:${({ theme }) => theme.colors.brand}; box-shadow: 0 0 0 4px hsl(220 95% 56% / .15); }

  ${({ $invalid }) =>
    $invalid &&
    css`
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.18);
    `}
`;

/* ...mantenha IconBtn, CalendarIcon, Content, CalendarWrap como já estavam... */

export const Wrap = styled.div`
  position: relative;
  width: 100%;
`;

/* botão para abrir o popover */
export const IconBtn = styled(Popover.Trigger)`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  cursor: pointer;

  &[data-state="open"] { box-shadow: 0 0 0 3px rgba(14,165,233,.18); border-color: #7dd3fc; }
`;

export const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
    <path d="M7 2v3M17 2v3M3 9h18M5 5h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

// ...imports

export const Content = styled(Popover.Content)`
  /* mesma largura do input; permite dropdowns saírem do container */
  min-width: var(--radix-popover-trigger-width);
  max-width: 360px;
  overflow: visible;                /* 👈 evita cortar os <select> nativos */
  background:#fff;
  border:1px solid ${({ theme }) => theme.colors.border};
  border-radius:${({ theme }) => theme.radius.md};
  box-shadow:${({ theme }) => theme.shadow.md};
  padding:10px;
  z-index: 1000;
`;

/* Aumenta especificidade para ganhar do CSS padrão do DayPicker */
export const CalendarWrap = styled.div`
  && .rdp {                          /* 👈 duplica o seletor */
    --rdp-cell-size: 36px;
    --rdp-accent-color: ${({ theme }) => theme.colors.brand};
    --rdp-background-color: #fff;
    margin: 0;
    font-size: 14px;
  }

  && .rdp-caption {
    display:flex; align-items:center; justify-content:space-between;
    gap:8px; padding:4px 4px 8px;
  }
  && .rdp-nav { display:flex; gap:6px; }
  && .rdp-nav_button {
    width: 28px; height: 28px;
    display:inline-flex; align-items:center; justify-content:center;
    border:1px solid ${({ theme }) => theme.colors.border};
    border-radius:8px; background:#fff;
  }

  /* dropdowns mês/ano */
  && .rdp-caption_dropdowns { display:flex; gap:8px; }
  && .rdp-dropdown,
  && .rdp-caption select {
    appearance:none; -webkit-appearance:none; -moz-appearance:none;
    padding:8px 28px 8px 10px;
    border:1px solid ${({ theme }) => theme.colors.border};
    border-radius:${({ theme }) => theme.radius.md};
    background:#fff; color:${({ theme }) => theme.colors.fg};
    line-height:1.2;
  }

  /* cabeçalhos dos dias */
  && .rdp-head_cell { color:${({ theme }) => theme.colors.muted}; font-weight:600; text-transform:lowercase; }

  /* dias */
  && .rdp-day { border-radius:10px; }
  && .rdp-day:hover { background:${({ theme }) => theme.colors.surface}; }
  && .rdp-day_selected { background:${({ theme }) => theme.colors.brand}; color:#fff; }
  && .rdp-day_today { outline:1px dashed ${({ theme }) => theme.colors.brand}; }
  && .rdp-day_outside { color:${({ theme }) => theme.colors.muted}; opacity:.6; }
`;

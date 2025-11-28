'use client';
import * as Select from '@radix-ui/react-select';
import styled from 'styled-components';

/* Trigger (botão do select) */
export const Trigger = styled(Select.Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding: 12px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: #fff;
  color: ${({ theme }) => theme.colors.fg};
  font-size: 16px;
  line-height: 1.2;
  outline: none;

  &:focus{ outline:none; border-color:${({ theme }) => theme.colors.brand}; box-shadow: 0 0 0 4px hsl(220 95% 56% / .15); }

  &[data-disabled] {
    opacity: .6;
    cursor: not-allowed;
  }
`;

export const Value = styled(Select.Value)`
  flex: 1;
  text-align: left;
`;

export const Icon = styled(Select.Icon)`
  display: inline-flex;
  align-items: center;
`;

export const Content = styled(Select.Content)`
  /* mesma largura do trigger */
  width: var(--radix-select-trigger-width);
  min-width: var(--radix-select-trigger-width);
  max-width: var(--radix-select-trigger-width);

  /* 👇 altura máxima baseada no espaço disponível calculado pelo Radix */
  max-height: var(--radix-select-content-available-height);
  box-sizing: border-box;
  overflow: hidden;

  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.md};
  z-index: 50; /* garante ficar sobre outros elementos */
`;

export const Viewport = styled(Select.Viewport)`
  width: 100%;
  max-height: inherit;   /* herda o max-height do Content */
  overflow-y: auto;      /* scrolla internamente ao invés de “sair” da tela */
  padding: 6px;
`;


/* Scroll buttons (quando a lista é longa) */
export const ScrollButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  background: #fff;
  color: ${({ theme }) => theme.colors.muted};
`;

/* Item da lista */
export const Item = styled(Select.Item)`
  font-size: 14px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.fg};
  border-radius: 8px;
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 10px 0 28px;
  position: relative;
  user-select: none;
  outline: none;
  cursor: pointer;

  &[data-highlighted] {
    background: ${({ theme }) => theme.colors.surface};
  }
  &[data-disabled] {
    color: ${({ theme }) => theme.colors.muted};
    pointer-events: none;
  }
`;

export const ItemText = styled(Select.ItemText)``;

export const ItemIndicator = styled(Select.ItemIndicator)`
  position: absolute;
  left: 8px;
  display: inline-flex;
  align-items: center;
`;

export const Separator = styled(Select.Separator)`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 4px 6px;
`;

/* Caret do trigger (SVG simples) */
export const CaretSvg = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M5 7l5 6 5-6" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const SearchWrap = styled.div`
  padding: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: #fff;
  color: ${({ theme }) => theme.colors.fg};
  outline: none;

  &:focus {
    box-shadow: 0 0 0 3px rgba(14,165,233,.18);
    border-color: #7dd3fc;
  }
`;

export const Empty = styled.div`
  padding: 8px 10px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
`;
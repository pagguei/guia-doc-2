'use client';
import styled, { css } from 'styled-components';

export const Wrap = styled.div<{ $full?: boolean }>`
  width: ${({ $full }) => ($full ? '100%' : 'auto')};
`;

export const Input = styled.input.attrs({ suppressHydrationWarning: true })<{ $invalid?: boolean }>`
  width:100%;
  padding:12px 14px;
  font-size:15px;
  border:1px solid ${({ theme }) => theme.colors.border};
  border-radius:${({ theme }) => theme.radius.md};
  background:#fff; color:${({ theme }) => theme.colors.fg};
  outline:none;
  transition: border-color .15s ease, box-shadow .15s ease;

  &:focus{ outline:none; border-color:${({ theme }) => theme.colors.brand}; box-shadow: 0 0 0 4px hsl(220 95% 56% / .15); }

  ${({ $invalid }) => $invalid && css`
    border-color:#ef4444; box-shadow:0 0 0 3px rgba(239,68,68,.18);
  `}
`;

export const Help = styled.span`
  display:block; margin-top:6px; font-size:12px; color:${({ theme }) => theme.colors.muted};
`;

export const Error = styled.span`
  display:block; margin-top:6px; font-size:12px; color:#ef4444;
`;

'use client';
import * as Popover from '@radix-ui/react-popover';
import styled from 'styled-components';

export const Wrap = styled.div` width:100%; position:relative; `;

export const InputButton = styled(Popover.Trigger)`
  width:100%; text-align:left;
  padding:12px 14px; font-size:16px;
  border:1px solid ${({ theme }) => theme.colors.border};
  border-radius:${({ theme }) => theme.radius.md};
  background:#fff; color:${({ theme }) => theme.colors.fg};
  outline:none;

  &[data-state="open"]{
    box-shadow: 0 0 0 4px hsl(220 95% 56% / .15); border-color:${({ theme }) => theme.colors.brand};
  }
`;

export const Content = styled(Popover.Content)`
  background:#fff;
  border:1px solid ${({ theme }) => theme.colors.border};
  border-radius:${({ theme }) => theme.radius.md};
  box-shadow:${({ theme }) => theme.shadow.md};
  padding:10px;
  z-index:60;
`;

export const CalendarWrap = styled.div`
  .rdp {
    --rdp-cell-size: 36px;
    --rdp-accent-color: ${({ theme }) => theme.colors.brand};
    margin: 0;
  }
`;

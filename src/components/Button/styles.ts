'use client';
import styled from 'styled-components';

export const Btn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border: 0;
  border-radius: ${({ theme }) => (theme as any).radius.sm};
  background: ${({ theme }) => (theme as any).colors.brand};
  color: #fff;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  box-shadow: ${({ theme }) => (theme as any).shadow.sm};
  transition: transform .03s ease-in-out, box-shadow .2s ease;

  &:active { transform: translateY(1px); }
  &:disabled { opacity: .6; cursor: not-allowed; }
`;

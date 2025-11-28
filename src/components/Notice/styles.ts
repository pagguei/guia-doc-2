'use client';
import styled from 'styled-components';

export const Box = styled.div<{ $tone: 'info' | 'warn' | 'success' | 'danger' }>`
  display: grid;
  grid-template-columns: 20px 1fr;
  align-items: start;
  gap: 10px;

  border: 1px solid
    ${({ $tone }) =>
    $tone === 'warn' ? '#f59e0b55' : $tone === 'success' ? '#10b98155' : $tone === 'danger' ? '#b9101055' : '#38bdf855'};
  background:
    ${({ $tone }) =>
    $tone === 'warn' ? '#fef3c7' : $tone === 'success' ? '#ecfdf5' : $tone === 'danger' ? '#fec7c7' :'#e0f2fe'};
  color: #111827;

  border-radius: ${({ theme }) => theme.radius.md};
  padding: 12px 14px;
  font-size: 14px;
`;

export const Icon = styled.span`
  line-height: 1;
`;

export const Title = styled.strong`
  display: block;
  margin-bottom: 4px;
`;

export const Text = styled.p`
  margin: 0;
`;


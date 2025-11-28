'use client';
import styled from 'styled-components';

export const Card = styled.section`
  background: #fff; border: 1px solid ${({ theme }) => (theme as any).colors.border};
  border-radius: ${({ theme }) => (theme as any).radius.lg};
  padding: 20px;
`;

export const Header = styled.div`
  display:flex; 
  justify-content:space-between; 
  align-items:center; 
  margin-bottom:12px;
`;

export const Title = styled.h2`
  font-size: 22px; 
  margin: 0;
`;

export const Actions = styled.div`
  display:flex; 
  gap: 10px; 
  justify-content:flex-end; 
  margin-top: 16px;
`;

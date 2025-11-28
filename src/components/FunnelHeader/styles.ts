'use client';

import styled, { keyframes } from 'styled-components';

const space = (n: number) => `${n * 4}px`;
const color = {
  brand: 'hsl(225 90% 48%)',
  brandSoft: 'hsl(225 90% 48% / .15)',
  text: '#0b0c0f',
  muted: 'hsl(215 16% 45%)',
  track: 'hsl(215 16% 90%)',
  card: '#fff',
  line: 'hsl(215 16% 92%)',
};
const shadow = { bar: '0 1px 0 rgba(0,0,0,.06)' };

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${space(4)};

  @media (max-width: 640px) {
    padding: 0 ${space(3)};
  }
`;

export const Shell = styled.header`
  background: ${color.card};
  border-bottom: 1px solid ${color.line};
`;

export const AppBar = styled.div`
  align-items: center;
  justify-content: center;
  background: ${color.card};
  box-shadow: ${shadow.bar};
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const BarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${space(2)};
`;

export const BackBtn = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 13px;

  &:hover { background: ${color.brandSoft}; }
  &:focus-visible { outline: none; box-shadow: 0 0 0 3px ${color.brandSoft}; }
`;

export const BackIcon = styled.span`
  width: 14px;
  height: 14px;
  display: inline-block;
  background: currentColor;
  mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="black"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>') center / contain no-repeat;
`;

export const Title = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: ${color.brand};
`;

export const Divider = styled.div`
  height: 1px;
  background: ${color.line};
`;

export const ProgressWrap = styled.div`
  margin: ${space(4)} 0 ${space(2)};
`;

export const ProgressHead = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  margin-bottom: ${space(2)};
`;

export const ProgressLabel = styled.div`
  font-size: 12px;
  color: ${color.muted};
`;

export const Percent = styled.div`
  font-size: 12px;
  color: ${color.muted};
`;

export const Track = styled.div`
  height: 6px;
  border-radius: 999px;
  background: ${color.track};
  position: relative;
  overflow: hidden;
`;

const grow = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

export const Fill = styled.div`
  position: absolute;
  inset: 0 0 0 0;
  background: ${color.brand};
  transform-origin: left center;
  animation: ${grow} .35s ease;
`;

export const StepperWrap = styled.div`
  padding-bottom: ${space(2)};
`;

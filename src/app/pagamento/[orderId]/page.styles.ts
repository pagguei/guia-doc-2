'use client';
import styled from 'styled-components';

const space = (n: number) => `${n * 4}px`;
const radius = { md: '12px', lg: '16px', xl: '18px' };
const color = {
  text: '#0b0c0f',
  textMuted: 'rgba(0,0,0,.62)',
  border: 'rgba(0,0,0,.10)',
  borderStrong: 'rgba(0,0,0,.16)',
  card: '#fff',
  brand: 'hsl(220 90% 56%)',
  ok: 'hsl(142 72% 35%)',
  okBg: 'hsl(142 70% 95%)',
  okSoft: 'hsl(142 72% 35% / .12)',
  grayBg: 'hsl(210 20% 96%)',
};
const mq = { sm: '@media (max-width: 640px)' };

export const Wrap = styled.div`
  max-width: 920px;
  margin: 0 auto;
  padding: ${space(8)} ${space(0)} ${space(10)};
  color: ${color.text};
  ${mq.sm} { padding: ${space(6)} ${space(3)} ${space(8)}; }

  h2 {
    margin: 0 0 ${space(1.5)};
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -0.01em;
  }
`;

export const Muted = styled.p`
  all: unset;
  color: ${color.textMuted};
  font-size: 13.5px;
`;


export const Card = styled.section`
  background: ${color.card};
  border: 1px solid ${color.border};
  border-radius: ${radius.xl};
  overflow: hidden;
  margin-top: ${space(4)};
`;

export const SuccessBar = styled.div`
  display: flex;
  gap: ${space(3)};
  align-items: center;
  justify-content: space-between;
  padding: ${space(4)} ${space(5)};
  background: ${color.okBg};
  border-bottom: 1px solid ${color.border};

  .info { display: block; }
  .successInfo { display: flex; align-items: center; gap: ${space(3)}; }
`;

export const SuccessBadge = styled.div`
  width: 44px;
  height: 44px;
  aspect-ratio: 1 / 1;               /* garante quadrado */
  border-radius: 9999px;
  display: inline-grid;
  place-items: center;
  background: ${color.ok};
  color: #fff;
  box-shadow: 0 0 0 8px ${color.okSoft};
  line-height: 0;                     /* evita interferência de line-height */

  /* trava o svg */
  & > svg {
    width: 22px;
    height: 22px;
    display: block;
    flex: none;                       /* não deixe o flex/grid esticar */
    aspect-ratio: 1 / 1;
  }
`;


export const SuccessTitle = styled.div`
  font-weight: 800;
`;

export const Row = styled.div`
  padding: ${space(5)};
  ${mq.sm} { padding: ${space(4)}; }
`;

export const Col = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

export const StepsWrap = styled.ol`
  margin: 0 0 ${space(3)}; padding: 0;
  list-style: none;
`;

export const StepItem = styled.li`
  display: grid;
  grid-template-columns: 22px 1fr;
  align-items: start;
  gap: ${space(2)};
  padding: 6px 0;
  color: ${color.text};
`;

export const StepNum = styled.span`
  width: 22px; height: 22px; border-radius: 999px;
  background: ${color.brand};
  color: #fff; display: grid; place-items: center;
  font-weight: 800; font-size: 12px;
`;


export const Small = styled.div`
  margin-top: 0;
  color: ${color.textMuted};
  font-size: 12.5px;
  text-align: center;
`;


export const CodeMono = styled.pre`
  margin: 0; padding: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 12.5px; line-height: 1.3;
  white-space: pre-wrap; word-break: break-all;
  color: #111;
`;

export const CopyBtn = styled.button`
  margin-top: ${space(2.5)};
  width: 100%;
  height: 46px;
  border-radius: 10px;
  border: 1px solid ${color.brand};
  background: ${color.brand};
  color: #fff;
  font-weight: 800;
  letter-spacing: .01em;
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  cursor: pointer;
  transition: filter .15s ease, transform .02s ease-in-out;
  &:hover { filter: brightness(.95); }
  &:active { transform: translateY(1px); }
`;

export const Divider = styled.div`
  height: 1px;
  background: ${color.border};
  margin: ${space(4)} 0;
`;

export const InfoChips = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px;
  margin: ${space(1)} 0 ${space(3)};
`;

export const Chip = styled.span`
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; color: ${color.textMuted};
  padding: 6px 10px; border-radius: 999px;
  background: hsl(215 20% 96%);
  border: 1px solid ${color.border};
  a { color: inherit; text-decoration: underline; }
`;

export const Actions = styled.div`
  margin-top: ${space(3)};
  display: flex; justify-content: center;
`;


export const StatusRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${space(2)};
  padding: ${space(2.5)} ${space(5)};
  border-bottom: 1px solid ${color.border};
  background: linear-gradient(180deg, hsl(215 20% 98%), hsl(215 20% 97%));
`;

export const StatusPill = styled.span`
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 10px; border-radius: 999px;
  font-size: 13px; font-weight: 800;
  color: ${color.brand};
  background: hsl(220 90% 56% / .10);
  border: 1px solid hsl(220 90% 56% / .18);
`;

export const Spinner = styled.span`
  width: 14px; height: 14px; border-radius: 999px;
  border: 2px solid currentColor; border-top-color: transparent;
  display: inline-block; animation: spin .8s linear infinite;
  @keyframes spin { to { transform: rotate(360deg); } }
`;

export const Amount = styled.span`
  font-weight: 900; color: ${color.ok};
`;

export const TimerText = styled.div`
  display: flex; flex-direction: column; gap: ${space(1)};
  color: ${color.textMuted}; font-size: 13.5px; text-align: right;
  strong { color: ${color.text}; }
  min-width: 110px;
`;

export const TimeBar = styled.div`
  width: 100%; height: 4px; border-radius: 999px; overflow: hidden;
  background: #d1dcfeff;
`;

export const TimeBarFill = styled.div<{ $pct: number }>`
  height: 100%; width: ${p => `${p.$pct}%`};
  background: ${color.brand}; transition: width .8s ease;
`;

export const QRWrap = styled.div`
  margin: ${space(4)} 0 ${space(2)};
  display: grid; place-items: center; gap: ${space(2)};

  #qr-container {
    border-radius: 16px;
    border: 1px solid ${color.borderStrong};
    background: #fff;
    box-shadow: 0 6px 20px hsl(220 8% 10% / .06);
  }

  svg, canvas { width: 320px; height: 320px; }
  ${mq.sm} { svg, canvas { width: 260px; height: 260px; } }
`;

export const InlineActions = styled.div`
  display: flex; gap: 16px; align-items: center;
  font-size: 13px; color: ${color.textMuted};
  button {
    all: unset; cursor: pointer; color: ${color.brand}; font-weight: 700;
    padding: 2px 4px; border-radius: 6px;
    &:hover { background: hsl(220 90% 56% / .08); }
    &:focus-visible { outline: none; box-shadow: 0 0 0 3px hsl(220 90% 56% / .25); }
  }
`;

export const PixCodeBox = styled.div`
  margin-top: ${space(3)};
  position: relative;
  padding: ${space(3)};
  border: 1px solid ${color.borderStrong};
  border-radius: 12px;
  background: ${color.grayBg};
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow .15s ease, border-color .15s ease;
  &:hover { border-color: ${color.brand}; box-shadow: 0 0 0 3px hsl(220 90% 56% / .15) inset; }

  &::after {
    content: 'Clique para copiar';
    position: absolute; right: 10px; bottom: 8px;
    font-size: 12px; color: ${color.textMuted};
    background: hsl(0 0% 100% / .90); 
    padding: 2px 6px;
    border-radius: 6px;
    pointer-events: none;
    box-shadow: 0 1px 2px 1px hsl(0 0% 56% / .10);
  }
`;

export const Callout = styled.div`
  display: grid; grid-template-columns: 36px 1fr; align-items: start;
  gap: ${space(2.5)}; padding: ${space(3.5)};
  border: 1px solid ${color.border}; border-radius: 12px;
  background: linear-gradient(180deg, #f7fbff, #f4f8ff);
  margin-bottom: ${space(3)};
`;

export const CalloutIcon = styled.div`
  width: 36px; height: 36px; border-radius: 999px;
  display: grid; place-items: center;
  background: hsl(220 90% 56% / .12); color: ${color.brand};
`;

export const CalloutTitle = styled.div` font-weight: 800; margin-bottom: 2px; `;
export const CalloutText = styled.div` font-size: 13.5px; color: ${color.textMuted}; line-height: 1.5; `;

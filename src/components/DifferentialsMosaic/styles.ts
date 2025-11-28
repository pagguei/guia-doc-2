import { color, mq, radius, space } from '@/styles/tokens'; // ajuste o path se necessário
import styled, { keyframes } from 'styled-components';

const floatGlow = keyframes`
  0% { transform: translateY(0); opacity: .9; }
  50% { transform: translateY(-2px); opacity: 1; }
  100% { transform: translateY(0); opacity: .9; }
`;

export const Wrap = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${space(12)} ${space(4)};
  text-align: center;
`;

export const Kicker = styled.span`
  display: inline-block;
  font-size: 12px;
  letter-spacing: .08em;
  text-transform: uppercase;
  background: ${color.brandSoft};
  color: ${color.brandDark};
  border: 1px solid ${color.border};
  padding: 6px 10px;
  border-radius: ${radius.pill};
  margin-bottom: ${space(2)};
`;

export const Title = styled.h2`
  margin: ${space(2)} 0 ${space(3)};
  font-size: clamp(28px, 5vw, 40px);
  line-height: 1.1;
  letter-spacing: -0.01em;
`;

export const Lead = styled.p`
  margin: 0 auto ${space(10)} auto;
  color: ${color.muted};
  max-width: 60ch;
`;

export const Mosaic = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 160px;
  gap: ${space(3)};
  text-align: left;

  /* layout desktop inspirado na imagem 1 */
  grid-template-areas:
    "a a a a a b b b b b b b"
    "a a a a a b b b b b b b"
    "c c c d d d d d f f f f"
    "c c c d d d d d f f f f"
    "c c c e e e e e f f f f"
    "c c c e e e e e f f f f"
    "g g g g g g h h h h h h"
    "g g g g g g h h h h h h";

  ${mq.lg} {
    grid-template-areas:
      "a a a a b b b b"
      "a a a a b b b b"
      "c c c d d d e e"
      "c c c d d d e e"
      "g g h h f f f f"
      "g g h h f f f f";
    grid-template-columns: repeat(8, 1fr);
  }

  ${mq.md} {
    grid-template-columns: repeat(6, 1fr);
    grid-template-areas:
      "a a a a a a"
      "b b b b b b"
      "e e e e e e"
      "c c c d d d"
      "g g g h h h"
      "f f f f f f";
  }

  ${mq.sm} {
    grid-template-columns: 1fr;
    grid-auto-rows: 200px;
    grid-template-areas:
      "a" "b" "e" "c" "d" "g" "h" "f";
  }
`;

type TileProps = { area: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'; visual?: 'dark' | 'highlight' };
export const Tile = styled.article<TileProps>`
  position: relative;
  overflow: hidden;
  border-radius: ${radius.lg};
  grid-area: ${({ area }) => area};
  background: #18181b;
  transition: box-shadow 0.3s ease;
  min-height: 320px;
  z-index: 0;
  &:hover {
    box-shadow: 0 10px 14px rgba(31, 111, 255, .35);
  }
  /* Overlay escurecido para tiles com imagem */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(24,24,27,0.55) 0%, rgba(24,24,27,0.65) 100%);
    z-index: 1;
    pointer-events: none;
  }
  /* Glow sutil na borda */
  &::after {
    content: '';
    position: absolute; inset: -2px;
    border-radius: inherit;
    background: radial-gradient(600px 200px at 20% 0%, ${color.brand}22, transparent);
    z-index: 2;
    animation: ${floatGlow} 5s ease-in-out infinite;
    pointer-events: none;
  }
  /* Garantir que imagens absolutas fiquem atrás do overlay */
  img, .bg {
    position: absolute !important;
    inset: 0;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    z-index: 0;
    pointer-events: none;
  }
`;

export const TileBody = styled.div`
  position: relative;
  z-index: 1;
  color: ${color.bg};
  padding: ${space(4)};
  max-width: 35ch;

  ${mq.md} { padding: ${space(5)}; }
`;

export const Eyebrow = styled.div`
  display: inline-grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
  color: ${color.bg};
  padding: 6px 10px;
  border-radius: ${radius.pill};
  background: ${color.brand};
  border: 1px solid ${color.border};
  backdrop-filter: blur(4px);
  svg { width: 16px; height: 16px; }
  margin-bottom: ${space(2)};
`;

export const Heading = styled.h3`
  margin: 0 0 ${space(1)};
  font-size: clamp(18px, 2.4vw, 22px);
  letter-spacing: -0.01em;
`;

export const Text = styled.p`
  margin: 0;
  color: ${color.bg};
  opacity: .92;
`;

export const Highlight = styled.div`
  position: absolute; inset: 0; display: grid; align-content: end;
  padding: ${space(5)};
  color: ${color.brand};

  .arrow {
    position: absolute;
    top: 14%;
    left: 16%;
    font-size: clamp(40px, 8vw, 72px);
    line-height: 1;
    transform: rotate(0.5deg);
  }

  h3 { color: ${color.brand}; }
  p { color: ${color.brand}; opacity: .95; }
`;

export const BadgeRow = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px; margin-top: ${space(2)};
`;

export const Badge = styled.span`
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; padding: 6px 10px;
  border-radius: ${radius.lg};
  border: 1px solid ${color.border};
  background: rgba(0,0,0,.35);
  color: ${color.bg};
  backdrop-filter: blur(4px);
`;

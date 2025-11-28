'use client';

import styled from 'styled-components';

const space = (n: number) => `${n * 4}px`;
const bp = { sm: '640px' }; // ~mobile

const color = {
  brand: 'hsl(225 96% 48%)',
  brandSoft: 'hsl(225 96% 48% / .15)',
  done: 'hsl(142 72% 40%)',
  track: 'hsl(215 16% 88%)',
  text: '#0b0c0f',
  muted: 'hsl(215 16% 45%)',
  white: '#fff',
};

export const Wrap = styled.section`
  display: grid;
  gap: ${space(2)};
  margin: ${space(4)} 0 ${space(4)};
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: ${color.text};

  @media (max-width: ${bp.sm}) {
    font-size: 18px;
  }
`;

export const Percent = styled.div`
  font-size: 14px;
  color: ${color.muted};
`;

export const StepsRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${space(3)};
  position: relative;

  @media (max-width: ${bp.sm}) {
    /* controlamos tudo por variáveis */
    --dot: 32px;
    --conn: 3px;

    gap: ${space(2)};
    justify-content: space-between;
    align-items: center;         /* centro da linha = centro da bolinha */
    min-height: var(--dot);      /* altura da linha = altura da bolinha */
    padding-bottom: 22px;        /* espaço para a label que fica ABSOLUTA */
  }
`;

export const StepItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${space(2)};
  user-select: none;

  &[data-clickable] { cursor: pointer; }
  &:focus-visible { outline: none; filter: drop-shadow(0 0 .6rem ${color.brandSoft}); }

  @media (max-width: ${bp.sm}) {
    /* volta a ser “linha” visualmente; a label vai absoluta */
    flex-direction: row;
    align-items: center;
    gap: ${space(1)};
    min-width: 0;
    position: relative;          /* referência para a label absoluta */
    height: var(--dot);          /* garante que o StepItem tenha só a altura da bolinha */
  }
`;

/* Bolinha */
export const Dot = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  font-size: 14px;
  font-weight: 800;
  color: ${color.white};
  background: ${color.track};
  border: 2px solid ${color.track};
  transition: background .15s ease, color .15s ease, border-color .15s ease, box-shadow .15s ease;

  &[data-state='active'] {
    background: ${color.brand};
    border-color: ${color.brand};
    box-shadow: 0 0 0 6px ${color.brandSoft};
  }

  &[data-state='done'] {
    background: ${color.done};
    border-color: ${color.done};
    color: ${color.white};
  }

  &[data-state='todo'] {
    background: ${color.white};
    color: ${color.brand};
    border-color: ${color.brand};
  }

  @media (max-width: ${bp.sm}) {
    width: var(--dot);
    height: var(--dot);
    font-size: 12px;
    box-shadow: none;
  }
`;

export const Label = styled.div`
  white-space: nowrap;
  font-size: 14px;
  color: ${color.text};

  @media (max-width: ${bp.sm}) {
    display: none;

    ${StepItem}[data-active] & {
      display: block;
    }

    position: absolute;
    top: calc(var(--dot) + 14px); /* 6px de respiro */
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 12px;
    line-height: 1.15;
    max-width: 88px;
    white-space: normal;
  }
`;


export const Connector = styled.div`
  flex: 1 1 0;
  height: 4px;
  border-radius: 999px;
  background: ${color.track};
  &[data-state='done']   { background: ${color.done}; }
  &[data-state='active'] { background: ${color.brand}; }

  @media (max-width: ${bp.sm}) {
    height: var(--conn);   /* fino no mobile */
    align-self: center;    /* centro exato da linha (e da bolinha) */
    margin: 0;             /* remove qualquer deslocamento */
  }
`;
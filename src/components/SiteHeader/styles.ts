'use client';

import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import * as Nav from '@radix-ui/react-navigation-menu';
import * as Dialog from '@radix-ui/react-dialog';
import * as Accordion from '@radix-ui/react-accordion';

/* tokens rápidos (troque pelos do seu theme se quiser) */
const color = {
  brand: '#1f6fff',
  brandSoft: '#eef3ff',
  text: '#0b1324',
  muted: '#6b7280',
  bg: '#ffffff',
  border: '#e7e9ee',
  shadow: '0 20px 40px rgba(18, 37, 92, .10)',
};
const radius = { xl: '22px', lg: '16px', md: '12px', sm: '10px' };
const mq = { lg: '@media (max-width: 1100px)', md: '@media (max-width: 900px)', sm: '@media (max-width: 720px)' };

const GAP = '14px';

/* Header */
export const HeaderWrap = styled.header`
  position: sticky; top: 0; z-index: 40;
  background: rgba(255,255,255,.88);
  backdrop-filter: saturate(1.1) blur(10px);
  border-top: 6px solid ${color.brand};
  box-shadow: 0 4px 12px rgba(18,37,92,.12);
`;
export const Bar = styled.div`
  max-width: 1128px; margin: 0 auto;
  padding: 14px 20px;
  display: flex; justify-content: space-between; align-items: center;
  ${mq.md} { grid-template-columns: auto auto; }
`;
export const Brand = styled(Link)`display:inline-flex; align-items:center; gap:12px;`;

export const Actions = styled.div`display:flex; align-items:center; gap:12px; justify-content: end;`;
export const StartBtn = styled(Link)`
  display: flex; 
  align-items: center; 
  gap: 8px;
  height: 42px; 
  padding: 0 18px; 
  border-radius:${radius.sm};
  background:${color.brand}; 
  color:#fff; 
  text-decoration:none; 
  font-weight:700;
  display:inline-flex; 
  align-items:center; 
  justify-content:center;
  box-shadow: 0 10px 24px rgba(31,111,255,.28);
  transition: transform .08s ease; 
  &:hover{ transform: translateY(-1px); }
  &:active {transform: translateY(1px);}
`;

export const DesktopOnly = styled.div`${mq.md}{ display:none; }`;
export const MobileOnly = styled.div`display:none; ${mq.md}{ display:block; }`;

/* NavigationMenu (desktop) */
export const NavRoot = styled(Nav.Root)`position: relative; display:flex; justify-content:end; align-items: center; gap: 24px;`;
export const NavList = styled(Nav.List)`display:inline-flex; gap:26px; align-items:center;`;
export const NavItem = styled(Nav.Item)`
  position: relative;
  overflow: visible;           /* garante que nada seja cortado */
  list-style: none;
  font-size: 14px;
  color: ${color.muted};
`;

export const Content = styled(Nav.Content)`
  /* o conteúdo em si; sem moldura aqui */
  padding: 0;
`;

export const Viewport = styled(Nav.Viewport)`
  position: absolute;
  top: calc(100%);         /* <- usa a mesma distância */
  left: 50%;
  transform: translateX(-50%);
  z-index: 70;

  background: ${color.bg};
  border: 1px solid ${color.border};
  border-radius: ${radius.xl};
  box-shadow: ${color.shadow};
  padding: 18px;
`;

export const Indicator = styled(Nav.Indicator)`
  position: absolute;
  top: calc(100% - 7px);   /* 7px = metade do losango de 14px */
  left: 44% !important;
  z-index: 71;

  display: flex;
  justify-content: center;
  pointer-events: none;
  transition: transform 200ms ease, width 200ms ease, opacity 120ms ease;

  &[data-state="hidden"] { opacity: 0; }
  &[data-state="visible"] { opacity: 1; }

  &::after {
    content: '';
    width: 14px;
    height: 14px;
    background: ${color.bg};
    border-left: 1px solid ${color.border};
    border-top: 1px solid ${color.border};
    transform: rotate(45deg);
  }
`;

export const NavLink = styled(Nav.Link)`
  all: unset; cursor: pointer; padding: 8px 2px; border-radius: 8px;
  color:${color.text}; font-weight: 700;
  &[href]{ text-decoration:none; }
  &:hover{ color:${color.brand}; }
`;

export const Trigger = styled(Nav.Trigger)`
  all: unset;
  display:inline-flex; align-items:center; gap:8px;
  padding:8px 2px; border-radius:8px; cursor:pointer;
  color:${color.text}; font-weight: 700;
  &:hover{ color:${color.brand}; }
  &[data-state="open"] > span { transform: rotate(180deg); }
`;

const caretIn = keyframes`from{opacity:.6; transform: translateY(-2px);} to{opacity:1; transform: translateY(0);} `;
export const Caret = styled.span`
  width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 6px solid currentColor;
  animation: ${caretIn} .18s ease both; transition: transform .18s ease;
`;

/* Mega menu */
export const MegaGrid = styled.div`
  display:flex; gap:18px; align-items:stretch; 
  flex-direction: column;
`;

export const MiniGrid = styled.div`
  display:flex; gap:12px; align-items:stretch;
`;

export const Divider = styled.div`
  height:1px; 
  background:${color.border}; 
  border-radius:1px;
  `;

export const Divider2 = styled.div`
  height:1px; 
  border-radius:1px; 
  margin: 6px 0;
  `;

export const Card = styled(Link)`
  min-width: 263px;
  display:flex; 
  gap:8px;
  padding:16px; border:1px solid ${color.border}; border-radius:${radius.lg};
  background: linear-gradient(180deg, #fff 0%, ${color.brandSoft} 100%);
  transition: transform .12s ease, box-shadow .12s ease;
  &:hover{ transform: translateY(-2px); box-shadow: 0 14px 28px rgba(31,111,255,.14); }
`;

export const CardIcon = styled.div`
  width:38px; 
  height:38px; 
  display:grid; 
  place-items:center; 
  border-radius:12px; 
  background:#f5f7ff; 
  font-size:20px;
`;

export const CardTitle = styled.h3`
  margin:0; 
  font-size:16px; 
  line-height:1.2;
`;

export const CardText = styled.p`
  margin:0; 
  color:${color.muted}; 
  font-size:14px;
`;

export const CardLink = styled.span`
  justify-self:start; 
  margin-top:8px; 
  font-size: 14px;
  font-weight:700; 
  color:${color.brand}; 
  text-decoration:none;
`;

export const HelpCard = styled.div`
  padding:16px; 
  border:1px dashed ${color.border};
  border-radius:${radius.lg}; 
  display:grid; 
  gap:8px; 
  background:#fff;
  
  h4{ 
    margin:0; font-size:16px; 
  } p{ 
    margin:0; color:${color.muted}; font-size:14px; 
  }
`;

export const CTA = styled(Link)`
  display:inline-flex; 
  align-items:center; 
  justify-content:center;
  height:38px; 
  padding:0 14px; 
  border-radius:12px; 
  background:${color.brand}; 
  color:#ffffff !important; 
  font-weight:800; 
  text-decoration:none;
`;

/* Mobile drawer */
export const MobileBtn = styled.button`
  -webkit-tap-highlight-color: transparent; 

  display:grid; 
  place-items:center; 
  border:1px solid ${color.border}; 
  background:#fff; 
  border-radius:12px; 
  cursor:pointer;
  padding:8px;

  svg {
    color:${color.brand}; 

    width:26px; height:26px;
  }
  
`;
export const DrawerOverlay = styled(Dialog.Overlay)`
  position: fixed; inset: 0; background: rgba(9,16,28,.40);
`;

export const DrawerContent = styled(Dialog.Content)`
  position: fixed; 
  inset: 0 0 0 auto; 
  width: 100%; 
  background:#fff;
  padding: 16px; 
  display:flex; 
  flex-direction: column;
  box-shadow:${color.shadow};
  overflow: hidden;
`;

export const DrawerHeader = styled.div`
  display:flex; 
  align-items:center; 
  justify-content:space-between;
`;

export const DrawerClose = styled(Dialog.Close)`
  appearance:none; 
  background:transparent; 
  border:0; 
  font-size:22px; 
  cursor:pointer;
`;

export const DrawerList = styled.nav`
  margin-top: 55px; 
  padding-bottom: 18px; 
  overflow:auto; 
  -webkit-overflow-scrolling: touch;
  display:grid; gap:14px;

  a{ text-decoration:none; color:${color.text}; font-weight:700; }
  a[data-primary]{ background:${color.brand}; color:#fff; text-align:center; padding:14px; border-radius:${radius.lg}; margin-top:6px; }
`;
export const DrawerItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px; 
  border:1px solid ${color.border}; 
  border-radius:${radius.md}; 
  background: #fcfcfc;
`;

export const DrawerGroup = styled.div`
  padding: 12px; 
  border:1px solid ${color.border}; 
  border-radius:${radius.md}; 
  background: #fcfcfc;

`;

/* Accordion para sublinks no mobile */
export const DrawerAccordion = styled(Accordion.Root)``;
export const DrawerAccTrigger = styled(Accordion.Trigger)`
display: flex;
  align-items: center;
  gap: 8px;
  width:100%; 
  text-align:left; 
  background:transparent; 
  cursor:pointer;
  font-weight:800; 
  font-size: 16px;
  color:${color.text}; 
  padding: 0;
  border: none;
`;
export const DrawerAccContent = styled(Accordion.Content)`
display: flex;
flex-direction: column;
gap: 8px;

a {
  margin-top: 12px;
}
`;

export const DrawerAccItem = styled(Accordion.Item)`
  border: 0;
`;

export const DrawerAccHeader = styled(Accordion.Header)`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DrawerTitle = styled(Dialog.Title)`
  font-size: 16px;
  font-weight: 800;
  margin: 0;
  /* se quiser “sumir” mas manter acessível, comente acima e use VisuallyHidden no index.tsx */
`;

export const SubLink = styled.div`
  display:flex; 
  flex-direction: column;
  gap: 4px;
`
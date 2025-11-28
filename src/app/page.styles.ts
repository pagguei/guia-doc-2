'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled, { css } from 'styled-components';

/* ===== Tokens ===== */
const space = (n: number) => `${n * 4}px`;
const radius = { xs: '8px', sm: '12px', md: '16px', lg: '20px', xl: '28px', pill: '9999px' };

const shadow = {
  xs: '0 1px 2px rgba(0,0,0,.06)',
  sm: '0 6px 18px rgba(20,37,63,.08)',
  md: '0 12px 40px rgba(20,37,63,.12)',
  lg: '0 24px 68px rgba(20,37,63,.16)',
};

const color = {
  bg: '#fcfdff',
  card: '#fff',
  text: '#0b0c0f',
  muted: 'rgba(0,0,0,.62)',
  border: 'rgba(0,0,0,.10)',
  borderStrong: 'rgba(0,0,0,.16)',
  brand: 'hsl(220 90% 56%)',
  brandDark: 'hsl(220 90% 44%)',
  brandSoft: 'hsl(220 95% 56% / .12)',
  grayBg: 'hsl(215 20% 96%)',
};

const mq = {
  lg: '@media (max-width: 1200px)',
  md: '@media (max-width: 960px)',
  sm: '@media (max-width: 720px)',
};

const brand = {
  from: '#2563eb', to: '#1d4ed8', // azul 600→700
  ring: 'hsl(220 90% 56% / .35)',
  glow: `0 0 0 6px hsl(220 95% 56% / .10), inset 0 1px 0 rgba(255,255,255,.18)`
};

const motion = {
  fast: '150ms cubic-bezier(.2,.8,.2,1)',
  normal: '240ms cubic-bezier(.2,.8,.2,1)',
};


export const Page = styled.main`
  color: ${color.text};
  background: ${color.bg};
`;


const ctaReset = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 48px;
  padding: 0 22px;
  border-radius: 14px;
  font-weight: 900;
  letter-spacing: .01em;
  user-select: none;
  cursor: pointer;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  transition:
    transform .08s ease,
    filter .15s ease,
    box-shadow .15s ease,
    background .2s ease,
    border-color .2s ease;
  &:active { transform: translateY(1px); }
  &:focus-visible { outline: none; box-shadow: 0 0 0 4px ${brand.ring}; }
  svg { width: 18px; height: 18px; flex: 0 0 auto; }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const PrimaryCTA = styled(Link)`
  ${ctaReset};
  color: #fff;
  border: 1px solid rgba(255,255,255,.08);
  background:
    linear-gradient(180deg, rgba(255,255,255,.14), rgba(0,0,0,.12)) padding-box,
    linear-gradient(90deg, ${brand.from}, ${brand.to}) border-box; /* borda colorida sutil */
  box-shadow:
    0 10px 24px rgba(29, 78, 216, .28),
    inset 0 1px 0 rgba(255,255,255,.18);

  /* shine */
  overflow: hidden;
  &::before{
    content:'';
    position:absolute; inset:0;
    background: linear-gradient(120deg,
      transparent 0%,
      rgba(255,255,255,.25) 35%,
      rgba(255,255,255,.55) 45%,
      rgba(255,255,255,.25) 55%,
      transparent 70%);
    transform: translateX(-120%);
    transition: transform .6s ease;
    mix-blend-mode: soft-light;
    pointer-events: none;
  }
  &:hover { filter: brightness(.98); }
  &:hover::before{ transform: translateX(120%); }

  /* estado disabled */
  &[aria-disabled='true'],
  &:disabled {
    cursor: not-allowed; filter: grayscale(.15) brightness(.9);
    box-shadow: none; opacity: .7;
  }
`;

export const SecondaryCTA = styled(Link)`
  ${ctaReset};
  color: #0b0c0f;
  background: rgba(255,255,255,.7);
  border: 1px solid rgba(0,0,0,.12);
  backdrop-filter: saturate(1.1) blur(6px);
  box-shadow:
    0 6px 16px rgba(0,0,0,.08),
    inset 0 1px 0 rgba(255,255,255,.65);
  &:hover { background: rgba(255,255,255,.9); border-color: rgba(0,0,0,.18); }
`;


const sizeMap = {
  sm: css`height: 40px; padding: 0 16px; border-radius: 12px; font-weight: 800;`,
  lg: css`height: 56px; padding: 0 26px; border-radius: 16px; font-size: 1.02rem;`,
};

const fullWidth = css`width: 100%; display: inline-flex;`;

[PrimaryCTA, SecondaryCTA].forEach((Cta: any) => {
  Cta.defaultProps = { 'data-size': undefined as any };
});

export const CTA = { Primary: PrimaryCTA, Secondary: SecondaryCTA }; // opcional agrupador

[PrimaryCTA, SecondaryCTA].forEach((Comp: any) => {
  Comp.withComponent && null; // só pra TS não encher o saco
});

(PrimaryCTA as any).styledComponentId; // forçar avaliação

// tamanho e full
const sizeRule = css<{ ['data-size']?: 'sm' | 'lg', ['data-full']?: boolean }>`
  ${({ ['data-size']: s }) => s === 'sm' && sizeMap.sm}
  ${({ ['data-size']: s }) => s === 'lg' && sizeMap.lg}
  ${({ ['data-full']: f }) => f && fullWidth}
`;
Object.assign(PrimaryCTA.componentStyle, { rules: [...PrimaryCTA.componentStyle.rules, sizeRule] });
Object.assign(SecondaryCTA.componentStyle, { rules: [...SecondaryCTA.componentStyle.rules, sizeRule] });

export const Header = styled.header`
  position: sticky; 
  top: 0; 
  z-index: 30;
  background: rgba(255,255,255,.8);
  backdrop-filter: saturate(1.2) blur(8px);
  border-bottom: 1px solid ${color.border};
  border-top: 6px solid ${color.brand};
`;

export const BrandRow = styled.div`
  max-width: 1120px; margin: 0 auto;
  padding: ${space(3)} ${space(4)};
  display: flex;
  justify-content: space-between;
  gap: ${space(4)}; align-items: center;

  ${mq.sm} {
    grid-template-columns: auto auto 1fr;
  }
`;

export const Brand = styled(Link)`
  display: inline-flex; align-items: center; gap: 10px;
  font-weight: 900; letter-spacing: -0.01em; font-size: 18px;
  color: ${color.text}; text-decoration: none;
`;

export const Nav = styled.nav`
display: flex; gap: 24px; align-items: center;
  ${mq.sm} { display: none; }
`;

export const NavList = styled.ul`
  display: flex; gap: 18px; list-style: none; margin: 0; padding: 0;
`;

export const NavItem = styled.li`
  a { color: ${color.text}; text-decoration: none; }
  a:hover { text-decoration: underline; text-decoration-thickness: 2px; }
`;

const ctaBase = css`
  display: inline-flex; align-items: center; justify-content: center;
  height: 40px; padding: 0 ${space(4)}; border-radius: ${radius.md};
  font-weight: 800; letter-spacing: .01em; text-decoration: none;
  cursor: pointer; transition: filter .15s, transform .02s, box-shadow .15s;
  &:active { transform: translateY(1px); }
  &:focus-visible { outline: none; box-shadow: 0 0 0 3px hsl(220 90% 56% / .3); }
`;

export const NavCTA = styled(Link)`
  ${ctaBase}; background: ${color.brand}; border: 1px solid ${color.brand}; color: #fff;
  ${mq.sm} { display: none; }
`;

export const MobileRow = styled.div`
  display: none;
  ${mq.sm} {
    display: inline-flex; gap: 10px; justify-self: end;
  }
`;

export const MenuBtn = styled.button`
  all: unset; cursor: pointer;
  height: 38px; padding: 0 ${space(3)};
  border-radius: ${radius.md}; border: 1px solid ${color.borderStrong};
  background: #fff; font-weight: 800;
  &:hover { background: ${color.grayBg}; }
`;

/* ===== Notices ===== */
export const TopNotice = styled.div`
  background: ${color.grayBg};
  border-bottom: 1px solid ${color.border};
`;

export const NoticeText = styled.p`
  max-width: 1120px; margin: 0 auto; padding: ${space(2.5)} ${space(4)};
  font-size: 13px; color: ${color.muted};
  strong { color: ${color.text}; }
`;

/* ===== Hero ===== */
export const Hero = styled.section`
background: radial-gradient(1200px 600px at 20% -10%, rgb(126, 185, 255), rgba(255, 255, 255, 0.38) 60.5%, rgba(81, 135, 231, 0.38)),linear-gradient(rgb(255, 255, 255), rgb(248, 251, 255) 70%, rgb(247, 250, 255));  
border-bottom: 1px solid ${color.border};
`;

export const HeroGrid = styled.div`
  max-width: 1120px; margin: 0 auto;
  padding: ${space(10)} ${space(4)} ${space(0)};
  display: grid; align-items: center; gap: ${space(8)};

  /* desktop: imagem à esquerda, texto à direita */
  grid-template-columns: 0.95fr 1.05fr;
  grid-template-areas: "art body";

  ${mq.md} {
    /* mobile: texto primeiro, imagem depois */
    grid-template-columns: 1fr;
    grid-template-areas:
      "body"
      "art";
    padding: ${space(8)} ${space(4)} ${space(0)};
  }
`;

export const HeroArt = styled.div`
  grid-area: art;
  display: grid; place-items: center;

  img, picture, svg {
    width: 80%;
    height: auto;
    max-width: min(520px, 100%);
    border-radius: ${radius.lg};\
  }

  ${mq.md} {
    margin-top: ${space(2)};
  }
`;

export const HeroBody = styled.div`
  grid-area: body;
   ${mq.md} {
    text-align: center;
  }
`;


export const Eyebrow = styled.div`
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 10px; border-radius: ${radius.pill};
  font-size: 12.5px; font-weight: 800;
  color: ${color.brandDark}; background: ${color.brandSoft};
  border: 1px solid ${color.border}; margin-bottom: ${space(2)};
`;

export const Title = styled.h1`
  margin: 0 0 ${space(2)}; font-size: clamp(28px, 4.2vw, 48px);
  font-weight: 900; letter-spacing: -0.02em;
`;

export const Subtitle = styled.p`
  margin: 0 0 ${space(4)}; font-size: clamp(15px, 2vw, 18px);
  color: ${color.muted}; line-height: 1.6; max-width: 56ch;
`;

export const Ctas = styled.div`
  display: flex; gap: 12px; flex-wrap: wrap; margin: ${space(3)} 0 ${space(1)};
`;

export const Primary = styled(Link)`
  ${ctaBase};
  height: 48px; padding: 0 22px; border-radius:${radius.lg};
  color:#fff; border:1px solid ${color.brand};
  background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(0,0,0,.10)) padding-box,
              linear-gradient(90deg, ${brand.from}, ${brand.to}) border-box;
  box-shadow:${shadow.sm}, inset 0 1px 0 rgba(255,255,255,.22);
  transform: translateZ(0);
  &:hover{ filter:brightness(.98); box-shadow:${shadow.md}, inset 0 1px 0 rgba(255,255,255,.25); }
  &:active{ transform: translateY(1px); }
`;
export const Secondary = styled(Link)`
  ${ctaBase};
  height:48px; padding:0 20px; border-radius:${radius.lg};
  color:${color.brandDark}; background: rgba(255,255,255,.75);
  border:1px solid ${color.borderStrong}; backdrop-filter: blur(8px) saturate(1.1);
  box-shadow:${shadow.xs}; &:hover{ background:#fff; box-shadow:${shadow.sm}; }
`;


export const HeroHelper = styled.p`
  margin: ${space(2)} 0 0; font-size: 12.5px; color: ${color.muted};
`;

/* ===== Trust bar ===== */
export const TrustBar = styled.div`
  border-top: 1px solid ${color.border}; background: #fff;
`;
export const TrustItem = styled.div`
  max-width: 1120px; margin: 0 auto; padding: ${space(5)} ${space(4)};
  text-align: center; color: ${color.muted}; font-size: 13.5px;
`;

export const Mesh = styled.div`
  position:absolute; inset:-20%; z-index:0; pointer-events:none; filter: blur(60px) saturate(1.3);
  background:
    radial-gradient(700px 420px at 20% 20%, rgba(37,99,235,.18), transparent 60%),
    radial-gradient(600px 420px at 80% 10%, rgba(14,165,233,.14), transparent 60%),
    radial-gradient(600px 420px at 50% 90%, rgba(99,102,241,.10), transparent 60%);
`;
export const Section = styled.section`
  position:relative; overflow:hidden;
  max-width: 1120px;
  margin: 0 auto;
  padding: 80px 16px;
  border-radius: 0;
  background: none;
  box-shadow: none;
  &::after{content:''; position:absolute; inset:0; pointer-events:none; background: none;}
`;


export const SectionTitle = styled.h2`
  margin:14px 0 16px; text-align:center; letter-spacing:-.02em;
  font-weight:900; font-size: clamp(26px,3.4vw,34px);
  background: linear-gradient(180deg,#0b0c0f,rgba(11,12,15,.75));
  -webkit-background-clip:text; color: transparent;
`;

/* ===== Cards (benefícios) ===== */
export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${space(4)};
  max-width: 920px;
  margin: 0 auto;
  ${mq.md} { grid-template-columns: 1fr; }
`;
export const Card = styled.div`
  background: #fff;
  border: 1px solid ${color.border};
  border-radius: ${radius.lg};
  padding: ${space(5)};
  box-shadow: ${shadow.sm};
  display: grid; gap: ${space(2)};
  transition: box-shadow .18s, transform .12s;
  &:hover {
    box-shadow: ${shadow.md};
    transform: translateY(-1px) scale(1.01);
  }
`;
export const CardIcon = styled.div` color: ${color.brand}; `;
export const CardTitle = styled.h3`
  margin: 0; font-size: 17px; font-weight: 900; letter-spacing: -0.01em;
  display: flex; align-items: center; gap: 10px;
  svg { color: ${color.brand}; }
`;
export const CardText = styled.p` margin: 0; color: ${color.muted}; font-size: 14.5px; line-height: 1.6; `;


/* ===== Steps ===== */
export const Steps = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: ${space(4)}; margin-bottom: ${space(4)};
  ${mq.md} { grid-template-columns: 1fr; }
`;
export const Step = styled.div`
  background: ${color.card}; border: 1px solid ${color.border};
  border-radius: ${radius.lg}; padding: ${space(5)}; box-shadow: ${shadow.sm};
`;
export const StepNum = styled.span`
  display: inline-grid; place-items: center; width: 28px; height: 28px;
  margin-bottom: ${space(2)}; border-radius: ${radius.pill};
  background: ${color.brand}; color: #fff; font-weight: 900; font-size: 14px;
  box-shadow: 0 0 0 6px ${color.brandSoft};
`;
export const StepTitle = styled.h3` margin: 0 0 ${space(1)}; font-size: 18px; font-weight: 900; `;
export const StepText = styled.p` margin: 0; color: ${color.muted}; line-height: 1.6; font-size: 14.5px; `;

/* ===== Plans ===== */
export const Plans = styled.section`
  max-width: 1120px; margin: 0 auto; padding: ${space(2)} ${space(4)} ${space(12)};
`;
export const PlanGrid = styled.div`
  display: grid; grid-template-columns: repeat(2, 1fr); gap: ${space(4)};
  ${mq.sm} { grid-template-columns: 1fr; }
`;
export const Plan = styled.div`
  position: relative; background: ${color.card}; border: 1px solid ${color.border};
  border-radius: ${radius.lg}; padding: ${space(6)} ${space(5)}; box-shadow: ${shadow.md};
`;
export const PlanBadge = styled.span`
  position: absolute; top: ${space(3)}; left: ${space(3)};
  padding: 6px 10px; border-radius: ${radius.pill};
  background: ${color.brandSoft}; border: 1px solid ${color.border};
  font-size: 12.5px; font-weight: 900; color: ${color.brandDark};
`;
export const PlanName = styled.h3` margin: 0 0 ${space(1)}; font-size: 20px; font-weight: 900; `;
export const PlanPrice = styled.div` margin: 0 0 ${space(3)}; font-size: 28px; font-weight: 900; `;
export const PlanList = styled.ul`
  margin: 0 0 ${space(4)}; padding-left: ${space(4)};
  li { margin: 6px 0; color: ${color.muted}; }
`;
export const PlanCTA = styled(Link)`
  ${ctaBase}; width: 100%; background: ${color.brand}; border: 1px solid ${color.brand}; color: #fff;
  height: 46px; &:hover { filter: brightness(.96); }
`;
export const PlanHelper = styled.p` margin: ${space(2)} 0 0; font-size: 12.5px; color: ${color.muted}; text-align: center; `;


/* ===== Bottom CTA ===== */
export const BottomCTA = styled.section`
  background:
    radial-gradient(900px 400px at 80% -10%, hsl(220 100% 95%), transparent 60%),
    linear-gradient(180deg, #f5f9ff, #eef5ff);
  border-top: 1px solid ${color.border};
  padding: ${space(12)} ${space(4)}; text-align: center;
`;
export const BottomTitle = styled.h3` margin: 0 0 ${space(2)}; font-size: clamp(22px, 3.4vw, 32px); font-weight: 900; letter-spacing: -0.01em; `;
export const BottomSubtitle = styled.p` margin: 0 auto ${space(5)}; max-width: 60ch; color: ${color.muted}; font-size: 15.5px; `;

/* ===== Footer ===== */
export const Footer = styled.footer` background: ${color.brand}; border-top: 1px solid ${color.border}; `;
export const FootGrid = styled.div`
  max-width: 1120px; margin: 0 auto; padding: ${space(6)} ${space(4)};
  display: flex; justify-content: space-between; gap: ${space(6)}; align-items: center;
  ${mq.sm} { grid-template-columns: 1fr; }
`;
export const FootCol = styled.div``;

export const FootBrand = styled.div` 
  font-weight: 900; 
  letter-spacing: -0.01em; 
  font-size: 18px; 
  margin-bottom: 6px; 

  img {
    filter: brightness(0) invert(1);
  }
`;

export const FootSmall = styled.p` margin: 0; color: ${color.bg}; font-size: 13px; `;
export const FootLinks = styled.ul`
  list-style: none; margin: 0; padding: 0; display: flex; gap: 16px; flex-wrap: wrap;
  a { color: ${color.bg}; text-decoration: none; border-bottom: 1px dashed transparent; }
  a:hover { border-bottom-color: ${color.borderStrong}; }
`;
export const LegalFoot = styled.div`
  border-top: 1px solid ${color.border}; color: ${color.bg}; font-size: 12.5px;
  padding: ${space(3)} ${space(4)}; display: grid; gap: 6px; max-width: 1120px; margin: 0 auto;
`;

/* Listas dentro de CardText */
export const ULReset = `
  ul{ margin: 0; padding-left: 1.1rem; }
  li{ margin: 6px 0; color: ${color.muted}; line-height: 1.55; }
`;
(CardText as any).componentStyle.rules.push(ULReset);

/* Acessibilidade: links no tema escuro do footer */
export const A11yLink = `
  a:focus-visible{ outline: 2px solid ${brand.ring}; outline-offset: 2px; border-radius: 6px; }
`;
(Page as any).componentStyle.rules.push(A11yLink);


export const Compare = styled.div`
  border:1px solid ${color.border}; border-radius:${radius.xl}; overflow:hidden; box-shadow:${shadow.sm};
  background:#fff;
  display:grid; grid-template-columns: 1fr 1fr;
  ${mq.sm}{ grid-template-columns:1fr; }
  > div{ padding:28px 24px; }
  h4{ margin:0 0 8px; font-size:18px; font-weight:900; }
  ul{ margin:0; padding-left:18px; color:${color.muted}; }
  .side--alt{ background:linear-gradient(180deg,#fff, #f7f9ff); }
`;

/* —— Polish UI/UX —— */
export const SectionKicker = styled.span`
  display:inline-flex; align-items:center; gap:8px;
  padding:6px 10px; border-radius:${radius.pill};
  font-size:12.5px; font-weight:800;
  color:${color.brandDark}; background:${color.brandSoft};
  border:1px solid ${color.border}; box-shadow: ${shadow.xs};
`;
export const SectionLead = styled.p`
  margin:0 auto ${space(6)}; max-width:62ch; text-align:center;
  color:${color.muted}; line-height:1.7; font-size:15.5px;
`;
export const AutoGrid = styled.div`
  display:grid; gap:${space(4)};
  grid-template-columns: repeat(3, 1fr);
  ${mq.md}{ grid-template-columns: repeat(2, 1fr); }
  ${mq.sm}{ grid-template-columns: 1fr; }
`;
export const GlowCard = styled(Card)`
  position:relative; overflow:hidden;
  border-radius: ${radius.xl};
  background: #fff;
  border: 1px solid ${color.brandSoft};
  box-shadow: ${shadow.sm};
  transition: box-shadow .18s, transform .12s;
  padding: ${space(5)};
  display: grid; gap: ${space(2)};
  &:hover {
    box-shadow: ${shadow.md};
    transform: translateY(-1px) scale(1.01);
  }
`;
export const IconRing = styled.span`
  display:inline-grid; place-items:center; width:40px; height:40px;
  border-radius:${radius.pill}; border:1px solid ${color.border};
  background: radial-gradient(120% 120% at 50% 0%, rgba(37,99,235,.15), rgba(37,99,235,.05));
  box-shadow: inset 0 1px 0 rgba(255,255,255,.6);
  img,svg{ width:18px; height:18px; }
`;
export const CardHead = styled.div`
  display:flex; align-items:center; justify-content:space-between; margin-bottom:${space(2)};
`;
export const Small = styled.span`
  font-size:12px; color:${color.muted};
  border:1px solid ${color.border}; padding:2px 8px; border-radius:${radius.pill};
`;
export const ArrowCTA = styled(Link)`
  position:absolute; right:14px; bottom:14px;
  width:36px; height:36px; display:grid; place-items:center;
  border-radius:${radius.pill}; border:1px solid ${color.border};
  background:#fff; color:${color.brandDark};
  box-shadow:${shadow.xs}; text-decoration:none; font-weight:900;
  transition: transform .15s ease, box-shadow .2s ease;
  &:hover{ transform: translateY(-1px); box-shadow:${shadow.md}; }
`;

export const Mosaic = styled.div`
  display:grid; gap:${space(5)};
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 200px;
  ${mq.md}{ grid-template-columns: repeat(4,1fr); grid-auto-rows:170px; gap:${space(4)}; }
  ${mq.sm}{ grid-template-columns: 1fr; grid-auto-rows: auto; gap:${space(3)}; }
  .card{
    position:relative; border-radius:32px;
    background:#0b0c0f; color:#eaf1ff; overflow:hidden;
    border:1.5px solid ${color.brandSoft};
    box-shadow: 0 8px 32px rgba(37,99,235,0.10);
    background:
      radial-gradient(140% 120% at 20% 0%, rgba(37,99,235,.22), transparent 55%),
      radial-gradient(140% 120% at 80% 100%, rgba(29,78,216,.18), transparent 55%),
      #0b0c0f;
    transition: box-shadow .22s, transform .18s;
    &:hover {
      box-shadow: 0 24px 64px rgba(37,99,235,0.18);
      transform: translateY(-2px) scale(1.02);
    }
  }
`;
export const MosaicTitle = styled.h4`
  position:absolute; left:20px; bottom:42px; right:20px;
  margin:0; font-size:18px; font-weight:900; letter-spacing:-.01em;
`;
export const MosaicText = styled.p`
  position:absolute; left:20px; bottom:16px; right:20px;
  margin:0; color:#c8d6ff; font-size:14px;
`;
export const MosaicBig = styled.div` grid-column: span 3; grid-row: span 2; ${mq.sm}{ grid-column:auto; grid-row:auto; height:220px; } `;
export const MosaicMid = styled.div` grid-column: span 3; ${mq.md}{ grid-column: span 2; } ${mq.sm}{ grid-column:auto; height:160px; } `;
export const MosaicTall = styled.div` grid-column: span 2; grid-row: span 2; ${mq.sm}{ grid-column:auto; grid-row:auto; height:220px; } `;
export const MosaicWide = styled.div` grid-column: span 4; ${mq.sm}{ grid-column:auto; height:160px; } `;

export const Testimonials = styled.div`
  display:grid; gap:${space(5)};
  grid-template-columns: 2fr 1fr 1fr;
  ${mq.md}{ grid-template-columns:1fr; gap:${space(3)}; }`;

export const FAQ = styled.section`
max-width: 920px; margin: 0 auto; padding: ${space(10)} ${space(4)};
border-radius: 0;
background: none;
box-shadow: none;
`;


export const TestiBase = styled.div`
  background:#111827; color:#e5edff; border-radius:${radius.xl};
  border:1px solid ${color.border}; box-shadow:${shadow.sm}; position:relative;
  padding:${space(6)}; min-height:200px;
  &::after{ content:''; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
    background: radial-gradient(120% 100% at 10% 0%, rgba(37,99,235,.18), transparent 40%);
  }
`;
export const TestiLarge = styled(TestiBase)` grid-row: span 2; `;
export const TestiSmall = styled(TestiBase)` `;
export const Quote = styled.blockquote`
  margin:0 0 ${space(4)}; font-size: clamp(18px,2.6vw,22px); line-height:1.5; quotes:"“" "”";
  &::before{ content:open-quote; margin-right:6px; opacity:.7; }
  &::after{ content:close-quote; margin-left:2px; opacity:.7; }
`;
export const Author = styled.div`
  display:flex; align-items:center; gap:10px; color:#c8d6ff; font-size:13.5px;
  strong{ color:#fff; font-weight:900; }
  span{ opacity:.8; margin-left:6px; }
`;
export const Avatar = styled(Image)` border-radius:50%; border:1px solid rgba(255,255,255,.2); `;

export const Item = styled.div`
  border:2px solid ${color.borderStrong}; border-radius:${radius.xl};
  background:${color.card}; box-shadow:${shadow.sm}; overflow:hidden;
  transition: box-shadow .18s, border-color .12s;
  margin-bottom: ${space(5)};
  &[data-state='open']{ box-shadow:${shadow.md}; border-color:${color.brand}; }
`;
export const Trigger = styled.button`
  width:100%; text-align:left; padding:${space(6)} ${space(6)};
  font-weight:800; font-size:20px; display:grid; grid-template-columns:auto 1fr auto; align-items:center; gap:18px;
  cursor:pointer; background:transparent; border:0;
  color: ${color.text};
  .faq-icon {
    width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center;
    background: ${color.brandSoft}; border-radius: 50%; margin-right: 2px;
    color: ${color.brand}; font-size: 22px;
  }
  .icon{ transition: transform .2s ease; font-size: 24px; color: ${color.brand}; }
  &[data-state='open'] .icon{ transform:rotate(180deg); }
  &:hover, &:focus-visible{
    outline:none;
    box-shadow: 0 8px 32px rgba(37,99,235,0.18);
    background: transparent;
    border-color: inherit;
  }
`;
export const Content = styled.div`
  padding:0 ${space(6)} ${space(5)}; color:${color.muted}; font-size:16px; line-height:1.7;
  &[data-state='open']{ animation: open .24s ease forwards; }
  &[data-state='closed']{ animation: close .24s ease forwards; }
  @keyframes open{ from{ opacity:.6; transform: translateY(-4px);} to{ opacity:1; transform:none; } }
  @keyframes close{ from{ opacity:1;} to{ opacity:.5; } }
`;

export const StickyBar = styled.div`
  position:sticky; bottom:0; z-index:25;
  padding:10px 14px; background: rgba(255,255,255,.8);
  border-top:1px solid ${color.border}; backdrop-filter: blur(8px);
  display:none; gap:10px; ${mq.sm}{ display:flex; }
`;

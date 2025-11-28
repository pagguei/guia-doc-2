'use client';

import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';
import Link from 'next/link';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(8, 15, 28, .38);
  z-index: 50;
  backdrop-filter: blur(2px);
`;

/* ====== Banner ====== */
export const BannerWrap = styled.div`
  max-width: 720px;
  position: fixed;
  margin: 0 auto;
  inset-inline: 16px;
  bottom: 16px;
  z-index: 60;
  background: #fff;
  border: 1px solid rgba(0,0,0,.08);
  box-shadow: 0 10px 40px rgba(0,0,0,.12);
  border-radius: 16px;
  overflow: hidden;

  @media (min-width: 960px) {
    inset-inline: 24px;
    bottom: 24px;
  }
`;

export const WrapIcon = styled.div`
  background: #e0e7ff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
`;

export const BannerInner = styled.div`
  padding: 20px;
  @media (min-width: 960px) { padding: 24px 28px; }
`;

export const BannerHeader = styled.header`
  margin-bottom: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const BannerTitle = styled.h2`
  font-size: 18px;
  font-weight: 800;
  margin: 0;
`;

export const BannerDescription = styled.p`
  color: #4b5563;
  font-size: 14px;
  margin: 0;
`;

export const BannerText = styled.p`
  color: #2a2a2a;
  line-height: 1.6;
  margin: 0 0 18px;
  font-size: 14px;

  strong { font-weight: 700; }
`;

export const BannerActions = styled.div`
  display: flex;
  gap: 10px;

  @media (min-width: 720px) {
    justify-content: start;
  }
`;

export const BaseBtn = styled.button`
  appearance: none;
  border: 0;
  border-radius: 12px;
  padding: 12px 18px;
  font-weight: 700;
  cursor: pointer;
  transition: transform .02s ease, box-shadow .2s ease;
  &:active { transform: translateY(1px); }
`;

export const PrimaryBtn = styled(BaseBtn)`
  background: #0b5ed7;
  color: #fff;
  &:hover { box-shadow: 0 6px 18px rgba(11,94,215,.3); }
`;

export const SecondaryBtn = styled(BaseBtn)`
  background: #f2f4f7;
  color: #0b5ed7;
  &:hover { box-shadow: 0 6px 18px rgba(0,0,0,.08); }
`;

export const GhostBtn = styled.button`
  background: transparent;
  border: 0;
  color: #0b5ed7;
  font-weight: 700;
  cursor: pointer;
  padding: 8px 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const InlineLink = styled(Link)`
  color: #0b5ed7;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const ManageRow = styled.div`
  margin-top: 14px;
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const IconDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  background: #0b5ed7;
`;

export const FooterNote = styled.p`
  margin-top: 16px;
  font-size: 12px;
  color: #6b7280;
  text-align: center;
`;

/* ====== Dialog (Radix) ====== */
export const DialogOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background: rgba(8, 15, 28, .38);
  z-index: 70;
`;

export const DialogContent = styled(Dialog.Content)`
  position: fixed;
  z-index: 80;
  inset: 0;
  margin: auto;
  width: min(720px, 92vw);
  max-height: min(82vh, 820px);
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 30px 80px rgba(0,0,0,.25);
  padding: 20px;
  overflow: auto;

  @media (min-width: 960px) { padding: 26px; }
`;

export const DialogHeader = styled.header`
  position: sticky;
  top: -30px;
  padding-top: 20px;
  background: #fff;
  padding-bottom: 8px;
  z-index: 1;
`;

export const DialogTitle = styled(Dialog.Title)`
  font-size: 20px;
  font-weight: 800;
  margin: 0 0 2px;
`;

export const DialogDesc = styled(Dialog.Description)`
  color: #4b5563;
  margin: 0 0 12px;
`;

export const CloseX = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 20px;
  right: 0;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: #f2f4f7;
  border: 0;
  cursor: pointer;
  font-size: 16px;
  line-height: 32px;
  text-align: center;
`;

export const DialogSection = styled.section`
  padding: 14px 0;
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 6px;
`;

export const SectionText = styled.p`
  color: #374151;
  margin: 0 0 12px;
  line-height: 1.6;
  em { color: #6b7280; font-style: normal; }
`;

export const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: #eceff3;
  margin: 10px 0;
`;

export const StyledSwitchRoot = styled(Switch.Root)`
  width: 46px;
  height: 26px;
  background: #e5e7eb;
  border-radius: 999px;
  position: relative;
  outline: none;
  border: none;
  &[data-state='checked'] { background: #0b5ed7; }
`;

export const StyledSwitchThumb = styled(Switch.Thumb)`
  display: block;
  width: 22px;
  height: 22px;
  background: #fff;
  border-radius: 999px;
  transition: transform 120ms ease;
  transform: translateX(2px);
  will-change: transform;
  &[data-state='checked'] { transform: translateX(22px); }
`;


export const SwitchRow = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: ${p => (p.disabled ? 0.6 : 1)};
  pointer-events: ${p => (p.disabled ? 'none' : 'auto')};
`;

export const SwitchLabel = styled.span`
  font-weight: 700;
`;

// === use seus próprios componentes estilizados (sem reatribuir o módulo) ===
export const SwitchRoot = styled(Switch.Root)`
  width: 46px;
  height: 26px;
  background: #e5e7eb;
  border-radius: 999px;
  position: relative;
  outline: none;
  border: none;
  &[data-state='checked'] { background: #0b5ed7; }
`;

export const SwitchThumb = styled(Switch.Thumb)`
  display: block;
  width: 22px;
  height: 22px;
  background: #fff;
  border-radius: 999px;
  transition: transform 120ms ease;
  transform: translateX(-3px);
  will-change: transform;
  &[data-state='checked'] { transform: translateX(16px); }
`;


export const DialogFooter = styled.footer`
  display: flex;
  gap: 12px;
  margin-top: 10px;
`;

export const SaveBtn = styled(PrimaryBtn)`
display: flex;
align-items: center;
justify-content: center;
gap: 8px;
  width: 100%;
`;

export const AcceptAllBtn = styled(SecondaryBtn)`
display: flex;
align-items: center;
justify-content: center;
gap: 8px;
  width: 100%;
`;
